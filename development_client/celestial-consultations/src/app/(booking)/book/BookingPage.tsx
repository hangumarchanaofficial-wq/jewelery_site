"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CalendarDays, ChevronLeft, ShieldCheck, Sparkles, Star } from "lucide-react";

import { bookingSteps, serviceOptions, timeSlots } from "./booking-data";
import { BookingStepper } from "./BookingStepper";
import { BookingSuccess } from "./BookingSuccess";
import { ClientDetailsForm } from "./ClientDetailsForm";
import { DateTimeSelection } from "./DateTimeSelection";
import { ReviewConfirm } from "./ReviewConfirm";
import { ServiceSelection } from "./ServiceSelection";
import type { BookingDetails, BookingErrors, BookingStep, ServiceOption } from "./types";
import { createBooking, getAvailability } from "@/lib/api";

const initialDetails: BookingDetails = {
  birthPlace: "",
  city: "",
  consent: false,
  country: "",
  dateOfBirth: "",
  email: "",
  fullName: "",
  mainQuestion: "",
  notes: "",
  phone: "",
  timeOfBirth: "",
};

function addDays(baseDate: Date, offset: number) {
  const nextDate = new Date(baseDate);
  nextDate.setDate(baseDate.getDate() + offset);
  return nextDate;
}

function getStartOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function formatLocalIso(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;
}

function formatDateLabel(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    weekday: "long",
    year: "numeric",
  });
}

function buildCalendarDays(month: Date, selectableDates: Set<string>) {
  const monthStart = getStartOfMonth(month);
  const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  const gridStart = addDays(monthStart, -monthStart.getDay());
  const days: {
    dayNumber: number;
    disabled: boolean;
    iso: string;
    inMonth: boolean;
    isToday: boolean;
  }[] = [];

  for (let index = 0; index < 42; index += 1) {
    const date = addDays(gridStart, index);
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    days.push({
      dayNumber: date.getDate(),
      disabled: !selectableDates.has(formatLocalIso(date)),
      inMonth: date.getMonth() === month.getMonth(),
      isToday: dateOnly.getTime() === today.getTime(),
      iso: formatLocalIso(date),
    });
  }

  if (monthEnd.getDay() === 6) {
    return days.slice(0, 35);
  }

  return days;
}

function formatTimeForCalendar(slot: string) {
  const [time, meridiem] = slot.split(" ");
  const [hourText, minuteText] = time.split(":");
  let hour = Number(hourText);
  const minute = Number(minuteText);

  if (meridiem === "PM" && hour !== 12) hour += 12;
  if (meridiem === "AM" && hour === 12) hour = 0;

  return { hour, minute };
}

function buildIcsFile({
  details,
  selectedDate,
  selectedService,
  selectedTime,
  timezone,
}: {
  details: BookingDetails;
  selectedDate: string;
  selectedService: ServiceOption;
  selectedTime: string;
  timezone: string;
}) {
  const [year, month, day] = selectedDate.split("-").map(Number);
  const { hour, minute } = formatTimeForCalendar(selectedTime);
  const start = new Date(year, month - 1, day, hour, minute, 0);
  const end = new Date(start.getTime() + selectedService.durationMinutes * 60000);

  const formatUtc = (date: Date) =>
    `${date.getUTCFullYear()}${String(date.getUTCMonth() + 1).padStart(2, "0")}${String(
      date.getUTCDate(),
    ).padStart(2, "0")}T${String(date.getUTCHours()).padStart(2, "0")}${String(
      date.getUTCMinutes(),
    ).padStart(2, "0")}00Z`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Star Insight Astrology//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@starinsightastrology.com`,
    `DTSTAMP:${formatUtc(new Date())}`,
    `DTSTART:${formatUtc(start)}`,
    `DTEND:${formatUtc(end)}`,
    `SUMMARY:${selectedService.name} - Star Insight Astrology`,
    `DESCRIPTION:Private online astrology consultation for ${details.fullName}.`,
    `LOCATION:Online (${timezone})`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function validateDetails(details: BookingDetails) {
  const errors: BookingErrors = {};

  if (!details.fullName.trim()) errors.fullName = "Please enter your full name.";
  if (!details.email.trim()) errors.email = "Please enter your email address.";
  else if (!/^\S+@\S+\.\S+$/.test(details.email)) errors.email = "Please enter a valid email address.";
  if (!details.phone.trim()) errors.phone = "Please share a phone or WhatsApp number.";
  if (!details.country.trim()) errors.country = "Please enter your country.";
  if (!details.city.trim()) errors.city = "Please enter your current city.";
  if (!details.dateOfBirth) errors.dateOfBirth = "Please share your date of birth.";
  if (!details.timeOfBirth) errors.timeOfBirth = "Please share your time of birth.";
  if (!details.birthPlace.trim()) errors.birthPlace = "Please enter your birth place.";
  if (!details.mainQuestion.trim()) errors.mainQuestion = "Please describe your main focus area.";
  if (!details.consent) errors.consent = "Please confirm consent to continue.";

  return errors;
}

export function BookingPage() {
  const [currentStep, setCurrentStep] = useState<BookingStep>("service");
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [timezone, setTimezone] = useState("Asia/Colombo");
  const [details, setDetails] = useState<BookingDetails>(initialDetails);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [reviewConfirmed, setReviewConfirmed] = useState(false);
  const [bookingReference, setBookingReference] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [schedule, setSchedule] = useState<Record<string, string[]>>({});
  const [loadingSchedule, setLoadingSchedule] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [displayMonth, setDisplayMonth] = useState(() => getStartOfMonth(new Date()));

  const selectedService = serviceOptions.find((service) => service.id === selectedServiceId) ?? null;
  const availableDateKeys = useMemo(
    () => Object.keys(schedule).filter((dateKey) => (schedule[dateKey] ?? []).length > 0),
    [schedule],
  );
  const selectableDates = useMemo(() => new Set(availableDateKeys), [availableDateKeys]);
  const calendarDays = buildCalendarDays(displayMonth, selectableDates);
  const slotAvailability = selectedDate
    ? timeSlots.map((slot) => ({
        disabled: !(schedule[selectedDate] ?? []).includes(slot),
        label: slot,
      }))
    : [];
  const selectedDateLabel = selectedDate ? formatDateLabel(selectedDate) : "";

  useEffect(() => {
    const load = async () => {
      setLoadingSchedule(true);
      try {
        const today = new Date();
        const from = formatLocalIso(today);
        const toDate = addDays(today, 27);
        const to = formatLocalIso(toDate);
        const nextSchedule = await getAvailability(from, to);
        setSchedule(nextSchedule);
      } finally {
        setLoadingSchedule(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (loadingSchedule) return;
    if (availableDateKeys.length === 0) {
      setSelectedDate("");
      setSelectedTime("");
      return;
    }

    if (selectedDate && !selectableDates.has(selectedDate)) {
      setSelectedDate("");
      setSelectedTime("");
    }
  }, [availableDateKeys, loadingSchedule, selectableDates, selectedDate]);

  useEffect(() => {
    if (loadingSchedule || availableDateKeys.length === 0) return;

    const [firstAvailable] = availableDateKeys;
    const [year, month] = firstAvailable.split("-").map(Number);
    setDisplayMonth(new Date(year, month - 1, 1));
  }, [availableDateKeys, loadingSchedule]);

  function moveToStep(nextStep: BookingStep) {
    setCurrentStep(nextStep);
    if (typeof window !== "undefined") {
      window.scrollTo({ behavior: "smooth", top: 0 });
    }
  }

  function handleDetailChange<K extends keyof BookingDetails>(field: K, value: BookingDetails[K]) {
    setDetails((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleContinueFromService() {
    if (!selectedService) return;
    moveToStep("schedule");
  }

  function handleContinueFromSchedule() {
    if (!selectedService || !selectedDate || !selectedTime || !timezone) return;
    moveToStep("details");
  }

  function handleContinueFromDetails() {
    const nextErrors = validateDetails(details);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    moveToStep("confirm");
  }

  function resetBooking() {
    setCurrentStep("service");
    setSelectedServiceId("");
    setSelectedDate("");
    setSelectedTime("");
    setTimezone("Asia/Colombo");
    setDetails(initialDetails);
    setErrors({});
    setReviewConfirmed(false);
    setBookingReference("");
    setIsComplete(false);
    setSubmitError("");
    setDisplayMonth(getStartOfMonth(new Date()));
  }

  async function handleConfirmBooking() {
    if (!selectedService) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const pricePaidUsd = Number((selectedService.price.match(/\d+(\.\d+)?/)?.[0] ?? "0"));
      const payload = {
        birthPlace: details.birthPlace,
        city: details.city,
        country: details.country,
        dateOfBirth: details.dateOfBirth,
        email: details.email,
        fullName: details.fullName,
        mainQuestion: details.mainQuestion,
        notes: details.notes,
        phone: details.phone,
        pricePaidUsd,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        sessionDate: selectedDate,
        sessionTime: selectedTime,
        timeOfBirth: details.timeOfBirth,
        timezone,
      };
      const response = await createBooking(payload);
      setBookingReference(response?.booking?.reference ?? `SIA-${new Date().getFullYear()}`);
      setIsComplete(true);
      if (typeof window !== "undefined") {
        window.scrollTo({ behavior: "smooth", top: 0 });
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to complete booking.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleAddToCalendar() {
    if (!selectedService || !selectedDate || !selectedTime) return;

    const calendarFile = buildIcsFile({
      details,
      selectedDate,
      selectedService,
      selectedTime,
      timezone,
    });
    const blob = new Blob([calendarFile], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${bookingReference || "star-insight-session"}.ics`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function renderStep() {
    if (isComplete) {
      return (
        <BookingSuccess
          bookingReference={bookingReference}
          onAddToCalendar={handleAddToCalendar}
          onBookAnother={resetBooking}
        />
      );
    }

    switch (currentStep) {
      case "service":
        return (
          <ServiceSelection
            onContinue={handleContinueFromService}
            onSelect={setSelectedServiceId}
            selectedService={selectedService}
            services={serviceOptions}
          />
        );
      case "schedule":
        return (
          <DateTimeSelection
            availableSlots={slotAvailability}
            calendarDays={calendarDays}
            hasAvailableDates={availableDateKeys.length > 0}
            currentMonth={displayMonth}
            onContinue={handleContinueFromSchedule}
            onMonthChange={(direction) =>
              setDisplayMonth((current) => new Date(current.getFullYear(), current.getMonth() + direction, 1))
            }
            onSelectDate={(iso) => {
              setSelectedDate(iso);
              setSelectedTime("");
            }}
            onSelectSlot={setSelectedTime}
            onTimezoneChange={setTimezone}
            selectedDate={selectedDate}
            selectedDateLabel={selectedDateLabel}
            selectedService={selectedService}
            selectedTime={selectedTime}
            timezone={timezone}
          />
        );
      case "details":
        return (
          <ClientDetailsForm
            details={details}
            errors={errors}
            onChange={handleDetailChange}
            onContinue={handleContinueFromDetails}
            selectedDateLabel={selectedDateLabel}
            selectedService={selectedService}
            selectedTime={selectedTime}
            timezone={timezone}
          />
        );
      case "confirm":
        return (
          <ReviewConfirm
            details={details}
            onBack={() => moveToStep("details")}
            onConfirm={handleConfirmBooking}
            onEditStep={moveToStep}
            reviewConfirmed={reviewConfirmed}
            submitting={submitting}
            selectedDateLabel={selectedDateLabel}
            selectedService={selectedService}
            selectedTime={selectedTime}
            setReviewConfirmed={setReviewConfirmed}
            timezone={timezone}
          />
        );
      default:
        return null;
    }
  }

  return (
    <main className="lux-shell booking-shell">
      <div className="lux-noise" />
      <div className="hero-aurora booking-aurora" />

      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[rgba(4,4,6,0.84)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link className="flex items-center gap-3" href="/">
            <div className="brand-emblem">
              <Star className="h-4 w-4" strokeWidth={1.7} />
            </div>
            <div>
              <p className="font-display text-2xl tracking-[0.08em] text-[var(--gold-bright)]">
                Star Insight
              </p>
              <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[var(--muted-strong)]">
                Astrology
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link className="booking-secondary-button hidden sm:inline-flex" href="/">
              <ChevronLeft className="h-4 w-4" strokeWidth={1.8} />
              Return Home
            </Link>
            <div className="hidden items-center gap-2 rounded-full border border-[rgba(202,167,107,0.18)] bg-[rgba(255,255,255,0.02)] px-4 py-2 text-xs uppercase tracking-[0.22em] text-[var(--gold-soft)] md:flex">
              <ShieldCheck className="h-4 w-4 text-[var(--gold-bright)]" strokeWidth={1.8} />
              Private Booking Flow
            </div>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden px-5 pb-8 pt-10 sm:px-8 sm:pb-10 sm:pt-14">
        <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)] xl:items-center">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-6 inline-flex items-center gap-3 text-[0.75rem] uppercase tracking-[0.38em] text-[var(--gold-soft)]">
              <span className="h-px w-10 bg-[var(--gold-line)]" />
              Private Online Consultations
            </p>
            <h1 className="max-w-4xl font-display text-5xl leading-[0.95] text-[var(--ivory)] sm:text-6xl lg:text-7xl">
              Book your private astrology session
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-9 text-[var(--muted)]">
              Choose your consultation, share your birth details, and reserve a time that aligns
              with the availability currently opened by the admin for the coming week.
            </p>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-[var(--muted)]">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-4 w-4 text-[var(--gold-bright)]" strokeWidth={1.8} />
                Quiet, guided online sessions
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-[var(--gold-bright)]" strokeWidth={1.8} />
                Prepared with care before your call
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="booking-hero-visual"
            initial={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="booking-orbit-card">
              <div className="booking-orbit-grid" />
              <div className="booking-orbit-track booking-orbit-track-1" />
              <div className="booking-orbit-track booking-orbit-track-2" />
              <div className="booking-orbit-track booking-orbit-track-3" />
              <div className="booking-orbit-moon" />
              <div className="booking-orbit-star booking-orbit-star-1" />
              <div className="booking-orbit-star booking-orbit-star-2" />
              <div className="booking-orbit-star booking-orbit-star-3" />
              <div className="booking-orbit-panel booking-orbit-panel-left">
                <p className="booking-eyebrow">Prepared Session</p>
                <h2 className="mt-3 font-display text-[2rem] text-[var(--ivory)]">Guided with precision</h2>
              </div>
              <div className="booking-orbit-panel booking-orbit-panel-right">
                <p className="text-sm leading-7 text-[var(--muted)]">
                  A refined booking flow designed for private readings, thoughtful timing, and calm
                  confirmation.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {!isComplete ? (
        <section className="relative px-5 pb-18 pt-2 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <BookingStepper currentStep={currentStep} steps={bookingSteps} />
          </div>
        </section>
      ) : null}

      <section className="section-block pt-0">
        <div className="mx-auto max-w-7xl">
          {submitError ? (
            <div className="mb-4 rounded-[1rem] border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {submitError}
            </div>
          ) : null}
          <AnimatePresence mode="wait">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              initial={{ opacity: 0, y: 18 }}
              key={isComplete ? "success" : currentStep}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <footer className="footer-shell mt-18">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>Private astrology consultations for clients in Sri Lanka and abroad.</p>
          <Link className="inline-flex items-center gap-2 text-[var(--gold-soft)]" href="/">
            Return to homepage
            <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
          </Link>
        </div>
      </footer>
    </main>
  );
}
