export const ROOM_STATUSES = [
  { value: "Available", color: "#16a34a", description: "Phòng trống, sẵn sàng sử dụng" },
  { value: "Occupied", color: "#f59e0b", description: "Phòng đang được sử dụng" },
  { value: "Maintenance", color: "#dc2626", description: "Phòng đang bảo trì, không sử dụng" },
];

function StatusLegend() {
  return (
    <ul className="space-y-2 text-[14px]">
      {ROOM_STATUSES.map((status) => (
        <li key={status.value} className="flex items-center gap-2.5">
          <span
            className="w-2 h-2 rounded-full inline-block shrink-0"
            style={{ backgroundColor: status.color }}
          ></span>
          <strong className="font-semibold" style={{ color: status.color }}>
            {status.value}:
          </strong>
          <span className="text-[#4b5563]">{status.description}</span>
        </li>
      ))}
    </ul>
  );
}

export default StatusLegend;
