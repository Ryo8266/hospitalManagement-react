const pad = (value) => String(value).padStart(2, "0");

// "1998-05-15" -> "15/05/1998"
export function formatDate(value) {
  if (!value) return "-";
  const [date] = String(value).split("T");
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return value;
  return `${day}/${month}/${year}`;
}

// "2025-05-20T08:30:00" -> "20/05/2025 08:30"
export function formatDateTime(value) {
  if (!value) return "-";
  const [date, time] = String(value).split("T");
  if (!time) return formatDate(date);
  const [hour, minute] = time.split(":");
  return `${formatDate(date)} ${pad(hour)}:${pad(minute)}`;
}

// "08:30:00" -> "08:30"
export function formatTime(value) {
  if (!value) return "-";
  const [hour, minute] = String(value).split(":");
  return `${pad(hour)}:${pad(minute)}`;
}

// 1 -> "LK0001"
export function appointmentCode(id) {
  if (id === undefined || id === null) return "-";
  return `LK${String(id).padStart(4, "0")}`;
}

// "1998-05-15" -> 26 (tính theo hôm nay)
export function calcAge(dateOfBirth) {
  if (!dateOfBirth) return null;
  const dob = new Date(dateOfBirth);
  if (Number.isNaN(dob.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) age -= 1;
  return age;
}

// Khung giờ khám 08:00 -> 16:30, mỗi 30 phút
export const TIME_SLOTS = Array.from({ length: 18 }, (_, i) => {
  const minutes = 8 * 60 + i * 30;
  return `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;
});
