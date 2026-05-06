import { pool } from "../config/db";
import { redis } from "../config/redis";

const DEFAULT_SLOTS = [
  { time: "09:00 AM", taken: false },
  { time: "10:30 AM", taken: false },
  { time: "12:00 PM", taken: false },
  { time: "02:30 PM", taken: false },
  { time: "04:00 PM", taken: false },
  { time: "06:00 PM", taken: false },
  { time: "08:00 PM", taken: false },
];

export const AvailabilityService = {
  async getSlots(date: string) {
    const cacheKey = `slots:${date}`;
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const { rows } = await pool.query(
      "SELECT session_time FROM bookings WHERE session_date = $1 AND status = 'confirmed'",
      [date]
    );
    const takenTimes = rows.map((r: { session_time: string }) => r.session_time);
    const slots = DEFAULT_SLOTS.map((s) => ({ ...s, taken: takenTimes.includes(s.time) }));

    await redis.setEx(cacheKey, 60, JSON.stringify(slots));
    return slots;
  },

  async holdSlot(date: string, time: string): Promise<boolean> {
    const lockKey = `lock:${date}:${time}`;
    const result = await redis.set(lockKey, "held", { NX: true, EX: 300 });
    return result === "OK";
  },

  async releaseSlot(date: string, time: string) {
    await redis.del(`lock:${date}:${time}`);
    await redis.del(`slots:${date}`);
  },

  async invalidateCache(date: string) {
    await redis.del(`slots:${date}`);
  },
};
