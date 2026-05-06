import { useState } from "react";
import { submitFeedbackApi } from "@/lib/api";
import { useBookingStore } from "@/store/bookingStore";

export function useFeedback() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setFeedbackSuccess } = useBookingStore();

  const submit = async (form: object) => {
    setLoading(true);
    setError(null);
    try {
      await submitFeedbackApi(form);
      setFeedbackSuccess(true);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { error?: string } } })?.response?.data?.error ??
        "Failed to submit feedback. Please try again.";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
}
