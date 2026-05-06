import { useState } from "react";
import { createBooking } from "@/lib/api";
import { useBookingStore } from "@/store/bookingStore";

export function useBooking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setBookingSuccess, setBookingData } = useBookingStore();

  const submitBooking = async (form: object) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createBooking(form);
      setBookingData(form as Parameters<typeof setBookingData>[0]);
      setBookingSuccess(true);
      return result;
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { error?: string } } })?.response?.data?.error ??
        "Something went wrong. Please try again.";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submitBooking, loading, error };
}
