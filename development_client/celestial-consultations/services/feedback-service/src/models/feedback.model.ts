import { pool } from "../config/db";

export const FeedbackModel = {
  async create(data: {
    name: string; sessionDate: string; overallRating: number;
    accuracy: number; clarity: number; insights: number; warmth: number;
    resonated?: string; improve?: string; testimonialOk: string;
  }) {
    const { rows } = await pool.query(
      `INSERT INTO feedback (user_name,session_date,overall_rating,accuracy,clarity,insights,warmth,resonated_text,improve_text,testimonial_ok)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [data.name,data.sessionDate,data.overallRating,data.accuracy,data.clarity,data.insights,data.warmth,data.resonated||null,data.improve||null,data.testimonialOk]
    );
    return rows[0];
  },

  async getAggregate() {
    const { rows } = await pool.query(
      `SELECT
        ROUND(AVG(overall_rating),2) AS avg_overall,
        ROUND(AVG(accuracy),2)       AS avg_accuracy,
        ROUND(AVG(clarity),2)        AS avg_clarity,
        ROUND(AVG(insights),2)       AS avg_insights,
        ROUND(AVG(warmth),2)         AS avg_warmth,
        COUNT(*)                     AS total_reviews
       FROM feedback`
    );
    return rows[0];
  },

  async getTestimonials() {
    const { rows } = await pool.query(
      `SELECT user_name, overall_rating, resonated_text, testimonial_ok, session_date
       FROM feedback WHERE testimonial_ok IN ('yes','named') ORDER BY created_at DESC LIMIT 20`
    );
    return rows;
  },
};
