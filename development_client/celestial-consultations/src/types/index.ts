export interface TimeSlot {
  time: string;
  taken: boolean;
}

export interface BookingForm {
  firstName: string;
  lastName: string;
  email: string;
  sessionDate: string;
  sessionTime: string;
  dob: string;
  tob: string;
  pob: string;
  focusNotes: string;
}

export interface FeedbackForm {
  name: string;
  sessionDate: string;
  overallRating: number;
  aspects: {
    accuracy: number;
    clarity: number;
    insights: number;
    warmth: number;
  };
  resonated: string;
  improve: string;
  testimonialOk: "yes" | "named" | "no";
}

export type TabType = "booking" | "feedback";
