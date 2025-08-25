export type ApiError = { message?: string; code?: string; issues?: unknown; status?: number };

async function handle<T>(res: Response): Promise<T> {
  const ct = res.headers.get('content-type') || '';
  const isJson = ct.includes('application/json');

  const data = isJson ? await res.json().catch(() => ({})) : await res.text().catch(() => '');
  if (!res.ok) {
    const errBody = (typeof data === 'string' ? { message: data } : data) as ApiError;
    const err = Object.assign(new Error(errBody.message || res.statusText || 'Error'), {
      ...errBody,
      status: res.status,
    });
    throw err;
  }
  return (isJson ? data : ({} as any)) as T;
}

export const api = {
  post: async <T>(url: string, body: any, init?: RequestInit) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
      body: JSON.stringify(body),
      ...init,
    });
    return handle<T>(res);
  },
};
