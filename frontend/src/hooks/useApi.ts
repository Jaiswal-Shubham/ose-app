import { useState, useCallback } from 'react';

const API_TIMEOUT = 2000;

interface ApiError {
  message: string;
  code: number | string;
}

function isApiError(e: unknown): e is ApiError {
  return typeof e === 'object' && e !== null && 'message' in e;
}

function isAbortError(e: unknown): e is Error {
  return typeof e === 'object' && e !== null && 'name' in e && e.name === 'AbortError';
}

export const useApi = <TData, TBody>(endpoint: string) => {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const execute = useCallback(async (body: TBody) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    setLoading(true);
    setData(null);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorResult = await response.json().catch(() => ({}));
        throw { 
          message: errorResult.error || `A server error occurred.`, 
          code: response.status 
        };
      }

      const result = await response.json();
      setData(result);
      
    } catch (err: unknown) {
      if (isAbortError(err)) {
        setError({ message: 'The request timed out.', code: 503 });
      } else if (isApiError(err)) {
        setError({ 
          message: err.message, 
          code: err.code || '500' 
        });
      } else {
        setError({ message: 'An unexpected error occurred.', code: '500' });
      }
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  return { data, loading, error, execute };
};