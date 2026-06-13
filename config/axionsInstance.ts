import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import { WP_API_BASE } from "@/shared/constants/backend";

const MAX_429_RETRIES = 2;
const MAX_RETRY_WAIT_MS = 10_000; // never wait more than 10s per retry

const axiosInstance: AxiosInstance = axios.create({
  baseURL: WP_API_BASE,
  timeout: 15_000, // 15 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getToken();
    if (token) {
      (config.headers as Record<string, string>)[
        "Authorization"
      ] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ── 429 Rate-Limit Retry Interceptor ──────────────────────────────────────
// If WordPress returns 429 "Too Many Requests", wait `retry_after` seconds
// (capped at MAX_RETRY_WAIT_MS) and retry up to MAX_429_RETRIES times.
axiosInstance.interceptors.response.use(undefined, async (error: AxiosError) => {
  const config = error.config as InternalAxiosRequestConfig & { _retryCount?: number } | undefined;
  if (!config || error.response?.status !== 429) return Promise.reject(error);

  const retryCount = config._retryCount ?? 0;
  if (retryCount >= MAX_429_RETRIES) return Promise.reject(error);

  // Parse wait time from response body or Retry-After header
  let waitMs = 2_000; // default 2s
  const retryHeader = error.response.headers?.["retry-after"];
  if (retryHeader) {
    waitMs = Math.min(Number(retryHeader) * 1_000, MAX_RETRY_WAIT_MS);
  } else {
    const body = error.response.data as Record<string, unknown> | undefined;
    if (body?.retry_after) {
      waitMs = Math.min(Number(body.retry_after) * 1_000, MAX_RETRY_WAIT_MS);
    }
  }

  config._retryCount = retryCount + 1;
  await new Promise((r) => setTimeout(r, waitMs));
  return axiosInstance(config);
});

export default axiosInstance;
