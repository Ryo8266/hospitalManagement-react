import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import FormField from "../../components/ui/FormField";
import StatusBadge from "../../components/ui/StatusBadge";
import {
  btnPrimary,
  btnSecondary,
  inputClass,
  selectClass,
  textareaClass,
} from "../../components/ui/styles";
import { calcAge, formatDate, TIME_SLOTS } from "../../utils/format";

const REASON_LIMIT = 500;

function PreviewRow({ label, children }) {
  return (
    <div className="grid grid-cols-[130px_1fr] items-start py-2.5">
      <span className="text-[14px] text-[#6b7280]">{label}</span>
      <span className="text-[15px] text-[#1f2937]">{children}</span>
    </div>
  );
}

function CreateAppointment() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [patient, setPatient] = useState(null);
  const [searched, setSearched] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    doctorId: "",
    roomId: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  });

  const fetchOptions = async () => {
    try {
      const [doctorRes, roomRes] = await Promise.all([
        api.get("/doctors"),
        api.get("/rooms/available"),
      ]);
      setDoctors(doctorRes.data.filter((doctor) => doctor.status === "Active"));
      setRooms(roomRes.data);
    } catch {
      console.log("Lỗi khi lấy danh sách bác sĩ / phòng khám");
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  const searchPatient = async () => {
    if (!phone.trim()) {
      alert("Vui lòng nhập số điện thoại bệnh nhân");
      return;
    }
    try {
      const res = await api.get("/patients/search", { params: { keyword: phone.trim() } });
      setSearched(true);
      setPatient(res.data.length > 0 ? res.data[0] : null);
    } catch {
      alert("Không tìm được bệnh nhân");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!patient) {
      alert("Vui lòng tìm và chọn bệnh nhân trước");
      return;
    }
    if (
      !formData.doctorId ||
      !formData.roomId ||
      !formData.appointmentDate ||
      !formData.appointmentTime
    ) {
      alert("Chưa đầy đủ thông tin");
      return;
    }

    try {
      await api.post("/appointments", {
        patientId: patient.id,
        doctorId: Number(formData.doctorId),
        roomId: Number(formData.roomId),
        appointmentDate: formData.appointmentDate,
        appointmentTime: `${formData.appointmentTime}:00`,
        reason: formData.reason,
      });
      alert("Đặt lịch khám thành công");
      navigate("/appointments");
    } catch (err) {
      const status = err.response?.status;
      if (status === 409) {
        alert("Bác sĩ hoặc phòng khám đã có lịch vào khung giờ này");
      } else if (status === 400) {
        alert("Bác sĩ đang Inactive hoặc phòng khám không ở trạng thái Available");
      } else if (status === 422) {
        alert("Bệnh nhân, bác sĩ hoặc phòng khám không tồn tại");
      } else {
        alert("Đặt lịch khám thất bại");
      }
    }
  };

  const selectedDoctor = doctors.find((d) => String(d.doctorId) === formData.doctorId);
  const selectedRoom = rooms.find((r) => String(r.id) === formData.roomId);

  return (
    <section className="p-8 flex-1">
      <PageHeader title="Đặt lịch khám" backTo="/appointments" />

      <div className="grid grid-cols-[1fr_380px] gap-6 items-start">
        <Card
          title="Thông tin đặt lịch khám"
          footer={
            <>
              <button
                type="button"
                onClick={() => navigate("/appointments")}
                className={btnSecondary}
              >
                <i className="fa-solid fa-xmark"></i>
                Hủy
              </button>
              <button type="button" onClick={handleSubmit} className={btnPrimary}>
                <i className="fa-regular fa-calendar-plus"></i>
                Tạo lịch khám
              </button>
            </>
          }
        >
          <FormField label="Số điện thoại bệnh nhân" required className="mb-5">
            <div className="flex gap-3">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchPatient()}
                placeholder="Nhập số điện thoại"
                className={inputClass}
              />
              <button type="button" onClick={searchPatient} className={`${btnPrimary} shrink-0`}>
                <i className="fa-solid fa-magnifying-glass"></i>
                Tìm bệnh nhân
              </button>
            </div>
          </FormField>

          {searched && !patient && (
            <div className="mb-5 p-4 rounded-lg bg-[#fef2f2] border border-[#fecaca] text-[14px] text-[#dc2626]">
              Không tìm thấy bệnh nhân với số điện thoại này.
            </div>
          )}

          {patient && (
            <div className="mb-5 p-5 rounded-lg bg-[#f8fafc] border border-[#e5e7eb]">
              <h3 className="text-[14px] font-semibold text-[#1f2937] mb-3">
                Thông tin bệnh nhân
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 text-[14px]">
                <div className="flex gap-3">
                  <span className="w-[110px] text-[#6b7280]">Họ và tên:</span>
                  <span className="font-medium text-[#1f2937]">{patient.fullName}</span>
                </div>
                <div className="flex gap-3">
                  <span className="w-[110px] text-[#6b7280]">Số điện thoại:</span>
                  <span className="text-[#1f2937]">{patient.phone || "-"}</span>
                </div>
                <div className="flex gap-3">
                  <span className="w-[110px] text-[#6b7280]">Ngày sinh:</span>
                  <span className="text-[#1f2937]">
                    {formatDate(patient.dateOfBirth)}
                    {calcAge(patient.dateOfBirth) !== null && ` (${calcAge(patient.dateOfBirth)} tuổi)`}
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="w-[110px] text-[#6b7280]">Email:</span>
                  <span className="text-[#1f2937]">{patient.email || "-"}</span>
                </div>
                <div className="flex gap-3">
                  <span className="w-[110px] text-[#6b7280]">Giới tính:</span>
                  <span className="font-medium text-[#1f2937]">{patient.gender || "-"}</span>
                </div>
                <div className="flex gap-3">
                  <span className="w-[110px] text-[#6b7280]">Địa chỉ:</span>
                  <span className="text-[#1f2937]">{patient.address || "-"}</span>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            <FormField label="Bác sĩ khám" required>
              <select
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="">-- Chọn bác sĩ --</option>
                {doctors.map((doctor) => (
                  <option key={doctor.doctorId} value={doctor.doctorId}>
                    {doctor.fullName} – {doctor.departmentName}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Phòng khám" required hint="Chỉ hiển thị phòng đang Available.">
              <select
                name="roomId"
                value={formData.roomId}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="">-- Chọn phòng khám --</option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.roomNumber} – {room.roomType}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Ngày khám" required>
              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                className={inputClass}
              />
            </FormField>

            <FormField label="Giờ khám" required>
              <select
                name="appointmentTime"
                value={formData.appointmentTime}
                onChange={handleChange}
                className={selectClass}
              >
                <option value="">-- Chọn giờ khám --</option>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Lý do khám" className="col-span-2">
              <textarea
                name="reason"
                value={formData.reason}
                maxLength={REASON_LIMIT}
                onChange={handleChange}
                placeholder="Nhập lý do khám..."
                className={`${textareaClass} h-[100px]`}
              ></textarea>
              <div className="text-right text-[12px] text-[#9ca3af] mt-1">
                {formData.reason.length}/{REASON_LIMIT}
              </div>
            </FormField>
          </div>

          <div className="mt-2 p-4 rounded-lg bg-[#f0f7ff] border border-[#cce0ff] text-[14px] text-[#1a6cf0] flex items-center gap-2">
            <i className="fa-solid fa-circle-info"></i>
            Vui lòng kiểm tra thông tin trước khi tạo lịch khám.
          </div>
        </Card>

        <div className="flex flex-col gap-6">
          <Card title="Thông tin lịch khám (dự kiến)">
            <PreviewRow label="Bệnh nhân">{patient?.fullName || "--"}</PreviewRow>
            <PreviewRow label="Bác sĩ khám">{selectedDoctor?.fullName || "--"}</PreviewRow>
            <PreviewRow label="Phòng khám">
              {selectedRoom ? `${selectedRoom.roomNumber} – ${selectedRoom.roomType}` : "--"}
            </PreviewRow>
            <PreviewRow label="Ngày khám">
              {formData.appointmentDate ? formatDate(formData.appointmentDate) : "--"}
            </PreviewRow>
            <PreviewRow label="Giờ khám">{formData.appointmentTime || "--"}</PreviewRow>
            <PreviewRow label="Lý do khám">{formData.reason || "--"}</PreviewRow>
            <PreviewRow label="Trạng thái">
              <StatusBadge status="Scheduled" />
            </PreviewRow>
          </Card>

          <div className="p-5 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0]">
            <h3 className="text-[14px] font-semibold text-[#15803d] mb-3 flex items-center gap-2">
              <i className="fa-solid fa-circle-info"></i>
              Lưu ý
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-[14px] text-[#4b5563]">
              <li>Vui lòng đến trước giờ hẹn 15 phút để làm thủ tục.</li>
              <li>Nếu không thể đến đúng hẹn, vui lòng hủy hoặc đổi lịch trước ít nhất 2 giờ.</li>
              <li>Mỗi bệnh nhân chỉ đặt 1 lịch khám tại cùng một thời điểm.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateAppointment;
