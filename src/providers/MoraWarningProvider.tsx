"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import axiosInstance from "../../../config/axionsInstance";

interface MoraStatus {
  has_mora: boolean;
  credit_used: number;
  warning_level: "weekly" | "daily" | "blocked" | null;
  is_purchase_blocked: boolean;
  show_warning: boolean;
  message: string | null;
}

interface MoraWarningContextProps {
  moraStatus: MoraStatus | null;
  showModal: boolean;
  dismissModal: () => void;
  refreshMora: () => Promise<void>;
}

const MoraWarningContext = createContext<MoraWarningContextProps | undefined>(
  undefined
);

export const useMoraWarning = () => {
  const ctx = useContext(MoraWarningContext);
  if (!ctx) throw new Error("useMoraWarning must be inside MoraWarningProvider");
  return ctx;
};

const STORAGE_KEY_WEEKLY = "enc_mora_weekly_dismissed";
const STORAGE_KEY_DAILY = "enc_mora_daily_dismissed";

function shouldShowModal(level: string | null): boolean {
  if (!level) return false;
  if (typeof window === "undefined") return false;

  const now = Date.now();

  if (level === "blocked") {
    // Siempre mostrar cuando está bloqueado (una vez por sesión)
    const dismissed = sessionStorage.getItem("enc_mora_blocked_dismissed");
    return !dismissed;
  }

  if (level === "weekly") {
    // Mostrar cada viernes (día 5 = viernes), o si han pasado 7 días
    const lastDismissed = localStorage.getItem(STORAGE_KEY_WEEKLY);
    if (!lastDismissed) return true;
    const diff = now - parseInt(lastDismissed, 10);
    return diff > 7 * 24 * 60 * 60 * 1000; // 7 días
  }

  if (level === "daily") {
    // Mostrar una vez al día
    const lastDismissed = localStorage.getItem(STORAGE_KEY_DAILY);
    if (!lastDismissed) return true;
    const lastDate = new Date(parseInt(lastDismissed, 10)).toDateString();
    const todayDate = new Date().toDateString();
    return lastDate !== todayDate;
  }

  return false;
}

function markDismissed(level: string | null): void {
  if (!level || typeof window === "undefined") return;
  const now = Date.now().toString();

  if (level === "blocked") {
    sessionStorage.setItem("enc_mora_blocked_dismissed", now);
  } else if (level === "weekly") {
    localStorage.setItem(STORAGE_KEY_WEEKLY, now);
  } else if (level === "daily") {
    localStorage.setItem(STORAGE_KEY_DAILY, now);
  }
}

export const MoraWarningProvider = ({ children }: { children: ReactNode }) => {
  const [moraStatus, setMoraStatus] = useState<MoraStatus | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchMora = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axiosInstance.get("/encriptados/v3/auth/mora-status");
      const data = res.data;

      if (data.success && data.has_mora) {
        setMoraStatus(data);
        if (shouldShowModal(data.warning_level)) {
          setShowModal(true);
        }
      } else {
        setMoraStatus(null);
        setShowModal(false);
      }
    } catch {
      // silently fail — non-resellers or unauthenticated
    }
  }, []);

  const dismissModal = useCallback(() => {
    if (moraStatus) {
      markDismissed(moraStatus.warning_level);
    }
    setShowModal(false);
  }, [moraStatus]);

  useEffect(() => {
    // Check mora status on mount (after auth token is available)
    const timer = setTimeout(fetchMora, 1500);
    return () => clearTimeout(timer);
  }, [fetchMora]);

  return (
    <MoraWarningContext.Provider
      value={{ moraStatus, showModal, dismissModal, refreshMora: fetchMora }}
    >
      {children}
    </MoraWarningContext.Provider>
  );
};
