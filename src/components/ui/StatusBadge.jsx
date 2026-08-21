const TONES = {
  green: "bg-[#dcfce7] text-[#15803d]",
  amber: "bg-[#fef3c7] text-[#b45309]",
  red: "bg-[#fee2e2] text-[#dc2626]",
  blue: "bg-[#dbeafe] text-[#2563eb]",
};

const STATUS_TONE = {
  Available: "green",
  Active: "green",
  Completed: "green",
  Occupied: "amber",
  Scheduled: "blue",
  Maintenance: "red",
  Inactive: "red",
  Cancelled: "red",
};

function StatusBadge({ status }) {
  if (!status) return <span className="text-[#9ca3af]">--</span>;

  const tone = TONES[STATUS_TONE[status]] || TONES.blue;

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-[13px] font-semibold whitespace-nowrap ${tone}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
