import { pool } from "../config/db";

export interface Booking {
  id: string; user_id?: string; session_date: string; session_time: string;
  dob: string; tob?: string; pob: string; focus_notes?: string;
  first_name: string; last_name: string; email: string;
  status: string; created_at: Date;
}

export const BookingModel = {
  async create(data: Omit<Booking, "id" | "status" | "created_at">): Promise<Booking> {
    const { rows } = await pool.query(
      `INSERT INTO bookings (user_id,session_date,session_time,dob,tob,pob,focus_notes,first_name,last_name,email)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
      [data.user_id||null,data.session_date,data.session_time,data.dob,data.tob||null,data.pob,data.focus_notes||null,data.first_name,data.last_name,data.email]
    );
    return rows[0];
  },

  async findById(id: string): Promise<Booking | null> {
    const { rows } = await pool.query("SELECT * FROM bookings WHERE id = $1", [id]);
    return rows[0] || null;
  },

  async findByEmail(email: string): Promise<Booking[]> {
    const { rows } = await pool.query("SELECT * FROM bookings WHERE email = $1 ORDER BY session_date DESC", [email]);
    return rows;
  },

  async cancel(id: string): Promise<Booking | null> {
    const { rows } = await pool.query("UPDATE bookings SET status='cancelled' WHERE id=$1 RETURNING *", [id]);
    return rows[0] || null;
  },
};
