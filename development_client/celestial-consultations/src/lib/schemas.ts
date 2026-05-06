import { z } from "zod";

export const BookingSchema = z.object({
  serviceId:    z.string().min(1),
  serviceName:  z.string().min(1),
  sessionDate:  z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  sessionTime:  z.string().min(1),
  timezone:     z.string().min(1),
  fullName:     z.string().min(2),
  email:        z.string().email(),
  phone:        z.string().min(5),
  country:      z.string().min(1),
  city:         z.string().min(1),
  dateOfBirth:  z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeOfBirth:  z.string().optional(),
  birthPlace:   z.string().min(1),
  mainQuestion: z.string().min(5),
  notes:        z.string().optional(),
  pricePaidUsd: z.number().positive(),
});

export const FeedbackSchema = z.object({
  bookingId:     z.string().uuid().optional(),
  clientName:    z.string().min(2),
  sessionDate:   z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  overallRating: z.number().int().min(1).max(5),
  accuracy:      z.number().int().min(1).max(5).optional(),
  clarity:       z.number().int().min(1).max(5).optional(),
  insights:      z.number().int().min(1).max(5).optional(),
  warmth:        z.number().int().min(1).max(5).optional(),
  resonated:     z.string().optional(),
  improve:       z.string().optional(),
  testimonialOk: z.enum(["yes", "named", "no"]),
});

export const AvailabilityWriteSchema = z.object({
  schedule: z.record(
    z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    z.array(z.string())
  ),
});
