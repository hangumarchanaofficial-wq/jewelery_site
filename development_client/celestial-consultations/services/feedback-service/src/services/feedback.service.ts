import { FeedbackModel } from "../models/feedback.model";

export const FeedbackService = {
  async submit(data: {
    name: string; sessionDate: string; overallRating: number;
    aspects: { accuracy: number; clarity: number; insights: number; warmth: number };
    resonated?: string; improve?: string; testimonialOk: string;
  }) {
    return FeedbackModel.create({
      name: data.name, sessionDate: data.sessionDate,
      overallRating: data.overallRating, ...data.aspects,
      resonated: data.resonated, improve: data.improve,
      testimonialOk: data.testimonialOk,
    });
  },
  async getAggregate() { return FeedbackModel.getAggregate(); },
  async getTestimonials() { return FeedbackModel.getTestimonials(); },
};
