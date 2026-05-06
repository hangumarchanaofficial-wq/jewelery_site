import type { LucideIcon } from "lucide-react";

export type BookingStep = "service" | "schedule" | "details" | "confirm";

export interface ServiceOption {
  id: string;
  name: string;
  description: string;
  duration: string;
  durationMinutes: number;
  price: string;
  bestFor: string;
  included: string[];
  icon: LucideIcon;
}

export interface BookingDetails {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  dateOfBirth: string;
  timeOfBirth: string;
  birthPlace: string;
  mainQuestion: string;
  notes: string;
  consent: boolean;
}

export type BookingErrors = Partial<Record<keyof BookingDetails, string>>;
