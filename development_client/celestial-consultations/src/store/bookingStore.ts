import { create } from "zustand";
import { BookingForm, FeedbackForm, TabType } from "@/types";

interface BookingState {
  activeTab: TabType;
  selectedSlot: string | null;
  bookingSuccess: boolean;
  bookingData: Partial<BookingForm>;
  feedbackSuccess: boolean;
  feedbackData: Partial<FeedbackForm>;
  setActiveTab: (tab: TabType) => void;
  setSelectedSlot: (slot: string | null) => void;
  setBookingSuccess: (val: boolean) => void;
  setBookingData: (data: Partial<BookingForm>) => void;
  setFeedbackSuccess: (val: boolean) => void;
  setFeedbackData: (data: Partial<FeedbackForm>) => void;
  resetBooking: () => void;
  resetFeedback: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  activeTab: "booking",
  selectedSlot: null,
  bookingSuccess: false,
  bookingData: {},
  feedbackSuccess: false,
  feedbackData: {},
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedSlot: (slot) => set({ selectedSlot: slot }),
  setBookingSuccess: (val) => set({ bookingSuccess: val }),
  setBookingData: (data) => set((s) => ({ bookingData: { ...s.bookingData, ...data } })),
  setFeedbackSuccess: (val) => set({ feedbackSuccess: val }),
  setFeedbackData: (data) => set((s) => ({ feedbackData: { ...s.feedbackData, ...data } })),
  resetBooking: () => set({ selectedSlot: null, bookingSuccess: false, bookingData: {} }),
  resetFeedback: () => set({ feedbackSuccess: false, feedbackData: {} }),
}));
