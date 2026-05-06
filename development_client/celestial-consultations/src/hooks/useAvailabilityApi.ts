import { useEffect, useState } from "react";
import { getAvailability } from "@/lib/api";

export function useAvailabilityApi() {
  const [schedule, setSchedule] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const today = new Date();
    const from = today.toISOString().split("T")[0];
    const to = new Date(today.getTime() + 6 * 86400000).toISOString().split("T")[0];
    setLoading(true);
    getAvailability(from, to)
      .then(setSchedule)
      .catch((err) => setError(String(err?.message ?? err)))
      .finally(() => setLoading(false));
  }, []);

  return { schedule, loading, error };
}
