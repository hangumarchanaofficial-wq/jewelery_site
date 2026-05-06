import {
  AlertTriangle,
  CalendarClock,
  CalendarRange,
  CreditCard,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

export const adminNavigation = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin" },
  { icon: CalendarClock, label: "Bookings", href: "/admin/bookings" },
  { icon: CalendarRange, label: "Calendar", href: "/admin/calendar" },
  { icon: Users, label: "Clients", href: "/admin/clients" },
  { icon: CreditCard, label: "Payments", href: "/admin/payments" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export const overviewMetrics = [
  { label: "Today bookings", value: "12", delta: "+3 vs yesterday", tone: "gold" },
  { label: "Pending confirmations", value: "5", delta: "2 need response within 2h", tone: "amber" },
  { label: "Monthly revenue", value: "USD 2,480", delta: "+18.4% month over month", tone: "green" },
  { label: "Repeat clients", value: "41%", delta: "8 returning this week", tone: "slate" },
];

export const bookings = [
  { client: "Anjali Fernando", service: "Detailed Chart Reading", time: "09:30", status: "Confirmed", payment: "Paid" },
  { client: "Ravin Perera", service: "Birth Chart Reading", time: "11:00", status: "Pending", payment: "Awaiting" },
  { client: "Mila Jayasekara", service: "Detailed Chart Reading", time: "14:30", status: "Rescheduled", payment: "Paid" },
  { client: "Nethmi Silva", service: "Birth Chart Reading", time: "18:00", status: "Completed", payment: "Paid" },
];

export const schedule = [
  { time: "09:30", title: "Detailed Chart Reading", client: "Anjali Fernando", state: "live" },
  { time: "11:00", title: "Birth Chart Reading", client: "Ravin Perera", state: "pending" },
  { time: "13:00", title: "Buffer / Notes", client: "Preparation window", state: "neutral" },
  { time: "14:30", title: "Detailed Chart Reading", client: "Mila Jayasekara", state: "confirmed" },
  { time: "18:00", title: "Birth Chart Reading", client: "Nethmi Silva", state: "confirmed" },
];

export const services = [
  { name: "Birth Chart Reading", duration: "30 min", price: "USD 10", load: "8 bookings this week" },
  { name: "Detailed Chart Reading", duration: "1 hour", price: "USD 20", load: "13 bookings this week" },
];

export const clients = [
  { name: "Anjali Fernando", city: "Colombo", note: "Follow-up requested on career timing for July.", tag: "VIP" },
  { name: "Ravin Perera", city: "Kandy", note: "Awaiting birth time confirmation before final slot lock.", tag: "Pending info" },
  { name: "Nimali Pathirana", city: "Dubai", note: "Repeat client. Relationship reading likely next cycle.", tag: "Returning" },
];

export const activity = [
  "Booking confirmed for Anjali Fernando at 09:30.",
  "Reminder email sent for Ravin Perera.",
  "Availability blocked for Sunday evening.",
  "Payment received for Mila Jayasekara.",
];

export const paymentSummary = [
  { label: "Collected this week", value: "USD 620", icon: CreditCard, tone: "gold" },
  { label: "Awaiting payment", value: "USD 70", icon: AlertTriangle, tone: "amber" },
];

export const bookingPipeline = [
  { label: "Pending", value: 5 },
  { label: "Confirmed", value: 9 },
  { label: "Completed", value: 18 },
  { label: "Rescheduled", value: 2 },
];

export const availabilityDays = [
  { day: "Mon", slots: "6 open", tone: "good" },
  { day: "Tue", slots: "4 open", tone: "good" },
  { day: "Wed", slots: "Full", tone: "busy" },
  { day: "Thu", slots: "3 open", tone: "good" },
  { day: "Fri", slots: "2 open", tone: "warn" },
  { day: "Sat", slots: "5 open", tone: "good" },
  { day: "Sun", slots: "Blocked", tone: "off" },
];

export const clientRows = [
  { name: "Anjali Fernando", location: "Colombo", bookings: 4, lastSession: "Apr 28", status: "VIP" },
  { name: "Ravin Perera", location: "Kandy", bookings: 1, lastSession: "New", status: "Awaiting details" },
  { name: "Nimali Pathirana", location: "Dubai", bookings: 6, lastSession: "May 02", status: "Returning" },
  { name: "Shenali Fonseka", location: "Melbourne", bookings: 3, lastSession: "Apr 17", status: "Follow-up due" },
];

export const paymentRows = [
  { client: "Anjali Fernando", service: "Detailed Chart Reading", amount: "USD 20", method: "Card", status: "Paid" },
  { client: "Ravin Perera", service: "Birth Chart Reading", amount: "USD 10", method: "Bank transfer", status: "Awaiting" },
  { client: "Mila Jayasekara", service: "Detailed Chart Reading", amount: "USD 20", method: "Card", status: "Paid" },
  { client: "Nethmi Silva", service: "Birth Chart Reading", amount: "USD 10", method: "Cash", status: "Paid" },
];

export const settingsGroups = [
  {
    title: "Availability rules",
    items: ["Default working hours: 09:00 to 20:00", "15 minute buffer between sessions", "Sunday evening blocked"],
  },
  {
    title: "Notifications",
    items: ["Booking confirmation emails enabled", "2 hour reminder emails enabled", "Admin new-booking alerts enabled"],
  },
  {
    title: "Privacy controls",
    items: ["Birth details visible to admin only", "Internal notes hidden from client view", "Session history export restricted"],
  },
];
