import { useEffect, useState } from "react";

export function useWaitlistCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const url = import.meta.env.VITE_SUPABASE_URL as string;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

    if (!url || !key) return;

    fetch(`${url}/rest/v1/waitlist_count?select=count`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    })
      .then((res) => res.json())
      .then((data: { count: number }[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setCount(data[0].count + 860);
        }
      })
      .catch(() => {});
  }, []);

  return count;
}
