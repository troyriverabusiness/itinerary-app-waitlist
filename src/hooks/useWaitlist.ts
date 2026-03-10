import { useState } from "react";

interface WaitlistState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

export function useWaitlist() {
  const [state, setState] = useState<WaitlistState>({
    loading: false,
    success: false,
    error: null,
  });

  const subscribe = async (email: string) => {
    setState({ loading: true, success: false, error: null });

    try {
      const url = import.meta.env.VITE_SUPABASE_FUNCTION_URL as string;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong");
      }

      setState({ loading: false, success: true, error: null });
    } catch (err) {
      setState({
        loading: false,
        success: false,
        error: err instanceof Error ? err.message : "Something went wrong",
      });
    }
  };

  return { ...state, subscribe };
}
