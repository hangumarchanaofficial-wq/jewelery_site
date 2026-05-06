import {
  Clock3,
  MoonStar,
  Sparkles,
  Check,
} from "lucide-react";

import type { BookingStep, ServiceOption } from "./types";

export const bookingSteps: { id: BookingStep; label: string; shortLabel: string }[] = [
  { id: "service", label: "Service", shortLabel: "Service" },
  { id: "schedule", label: "Date & Time", shortLabel: "Date" },
  { id: "details", label: "Your Details", shortLabel: "Details" },
  { id: "confirm", label: "Confirm", shortLabel: "Confirm" },
];

export const serviceOptions: ServiceOption[] = [
  {
    bestFor: "Life path, strengths, timing, personal clarity",
    description:
      "A focused 30 minute reading that centers your strengths, recurring patterns, and timing windows.",
    duration: "30 minutes",
    durationMinutes: 30,
    icon: MoonStar,
    id: "birth-chart",
    included: ["Natal chart interpretation", "Timing highlights", "Practical session notes"],
    name: "Birth Chart Reading",
    price: "USD 10",
  },
  {
    bestFor: "Deeper chart insight and practical guidance",
    description:
      "A detailed 1 hour consultation for deeper interpretation, recurring patterns, and practical guidance.",
    duration: "1 hour",
    durationMinutes: 60,
    icon: Check,
    id: "detailed-chart",
    included: ["Deep chart interpretation", "Timing highlights", "Practical session notes"],
    name: "Detailed Chart Reading",
    price: "USD 20",
  },
];

export const timezones = [
  "Asia/Colombo",
  "Asia/Dubai",
  "Europe/London",
  "America/New_York",
  "Australia/Sydney",
];

export const timeSlots = [
  "09:00 AM",
  "10:30 AM",
  "12:00 PM",
  "02:30 PM",
  "04:00 PM",
  "06:00 PM",
  "08:00 PM",
];

export const summaryHighlights = [
  { icon: Clock3, label: "Private online consultation" },
  { icon: Sparkles, label: "Prepared with your birth details" },
  { icon: MoonStar, label: "Calm, confidential guidance" },
];
