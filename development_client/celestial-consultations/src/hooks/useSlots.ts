import { useState, useEffect } from "react";
import { TimeSlot } from "@/types";

const DEFAULT_SLOTS: TimeSlot[] = [
  { time: "9:00 AM",  taken: false },
  { time: "10:00 AM", taken: true  },
  { time: "11:00 AM", taken: false },
  { time: "1:00 PM",  taken: true  },
  { time: "2:00 PM",  taken: false },
  { time: "3:00 PM",  taken: false },
  { time: "4:00 PM",  taken: true  },
  { time: "5:00 PM",  taken: false },
];

export function useSlots(date: string) {
  const [slots, setSlots] = useState<TimeSlot[]>(DEFAULT_SLOTS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!date) return;
    setLoading(true);
    setTimeout(() => { setSlots(DEFAULT_SLOTS); setLoading(false); }, 300);
  }, [date]);

  return { slots, loading };
}
