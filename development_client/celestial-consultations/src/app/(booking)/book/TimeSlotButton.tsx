export function TimeSlotButton({
  active,
  disabled,
  label,
  onSelect,
}: {
  active: boolean;
  disabled?: boolean;
  label: string;
  onSelect: () => void;
}) {
  return (
    <button
      className={`booking-slot ${active ? "booking-slot-active" : ""}`}
      disabled={disabled}
      onClick={onSelect}
      type="button"
    >
      <span>{label}</span>
      <span className="text-[0.65rem] uppercase tracking-[0.2em]">
        {disabled ? "Booked" : active ? "Selected" : "Available"}
      </span>
    </button>
  );
}
