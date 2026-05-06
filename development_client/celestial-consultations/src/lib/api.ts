import axios from "axios";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export const api = axios.create({
  baseURL: BASE,
  headers: { "Content-Type": "application/json" },
});

export const getAvailability = async (from?: string, to?: string) => {
  const params = new URLSearchParams();
  if (from) params.set("from", from);
  if (to)   params.set("to",   to);
  const { data } = await api.get(`/api/availability?${params}`);
  return data.schedule as Record<string, string[]>;
};

export const createBooking = async (payload: object) => {
  const { data } = await api.post("/api/bookings", payload);
  return data;
};

export const submitFeedbackApi = async (payload: object) => {
  const { data } = await api.post("/api/feedback", payload);
  return data;
};

export const getAdminBookings = async (params?: object) => {
  const { data } = await api.get("/api/admin/bookings", { params });
  return data;
};

export const patchBooking = async (id: string, payload: object) => {
  const { data } = await api.patch(`/api/admin/bookings/${id}`, payload);
  return data;
};

export const getAdminAvailability = async (from?: string, to?: string) => {
  const params = new URLSearchParams();
  if (from) params.set("from", from);
  if (to)   params.set("to",   to);
  const { data } = await api.get(`/api/admin/availability?${params}`);
  return data.schedule as Record<string, string[]>;
};

export const saveAdminAvailability = async (schedule: Record<string, string[]>) => {
  const { data } = await api.post("/api/admin/availability", { schedule });
  return data;
};

export const getAdminStats = async () => {
  const { data } = await api.get("/api/admin/stats");
  return data;
};

export const getAdminSettings = async () => {
  const { data } = await api.get("/api/admin/settings");
  return data as { workingHoursStart: string; workingHoursEnd: string };
};

export const saveAdminSettings = async (payload: {
  workingHoursStart: string;
  workingHoursEnd: string;
}) => {
  const { data } = await api.post("/api/admin/settings", payload);
  return data;
};
