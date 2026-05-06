import { pool } from "../config/db";

export interface User {
  id:         string;
  first_name: string;
  last_name:  string;
  email:      string;
  password:   string;
  created_at: Date;
}

export const UserModel = {
  async create(firstName: string, lastName: string, email: string, hashedPassword: string): Promise<User> {
    const { rows } = await pool.query(
      `INSERT INTO users (first_name, last_name, email, password)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [firstName, lastName, email, hashedPassword]
    );
    return rows[0];
  },

  async findByEmail(email: string): Promise<User | null> {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return rows[0] || null;
  },

  async findById(id: string): Promise<User | null> {
    const { rows } = await pool.query("SELECT id, first_name, last_name, email, created_at FROM users WHERE id = $1", [id]);
    return rows[0] || null;
  },
};
