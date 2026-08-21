import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import StatusBadge from "../../components/ui/StatusBadge";
import { btnPrimary, btnSecondary, textareaClass } from "../../components/ui/styles";
import { appointmentCode, calcAge, formatDate, formatTime } from "../../utils/format";

const DIAGNOSIS_LIMIT = 1000;

function Row({ label, children }) {
  return (
    <div className="grid grid-cols-[140px_1fr] items-start py-2.5">
      <span className="text-[14px] text-[#6b7280]">{label}</span>
      <span className="text-[15px] text-[#1f2937]">{children}</span>
    </div>
  );
}

function UpdateDiagnosis() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [diagnosis, setDiagnosis] = useState("");

  const fetchAppointment = async () => {
    try {
      const res = await api.get(`/appointments/${id}`);
      setAppointment(res.data);
      setDiagnosis(res.data.diagnosis || "");
    } catch {
      console.log("Lỗi khi lấy dữ liệu lịch khám");
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, [id]);

  const handleSubmit = async () => {
    if (!diagnosis.trim()) {
      alert("Vui lòng nhập kết quả chẩn đoán");
      return;
    }

    try {
      await api.put(`/appointments/${id}/diagnosis`, { diagnosis });
      alert("Lưu chẩn đoán thành công, lịch khám chuyển sang Completed");
      navigate(`/appointments/${id}`);
    } catch (err) {
      if (err.response?.status === 400) {
        alert("Chỉ cập nhật chẩn đoán cho lịch khám đang ở trạng thái Scheduled");
      } else {
        alert("Lưu chẩn đoán thất bại");
      }
    }
  };

  if (!appointment) {
    return (
      <section className="p-8 flex-1 flex items-center justify-center">
        <p className="text-[15px] text-[#6b7280]">Đang tải...</p>
      </section>
    );
  }

  const isScheduled = appointment.status === "Scheduled";

  return (
    <section className="p-8 flex-1">
      <PageHeader title="Cập nhật chẩn đoán" backTo={`/appointments/${id}`} backLabel="Quay lại chi tiết" />

      {!isScheduled && (
        <div className="mb-6 p-4 rounded-xl bg-[#fef2f2] border border-[#fecaca] text-[14px] text-[#dc2626] flex items-center gap-2">
          <i className="fa-solid fa-triangle-exclamation"></i>
          Lịch khám đang ở trạng thái {appointment.status} — không thể cập nhật chẩn đoán.
        </div>
      )}

      <div className="grid grid-cols-2 gap-6 mb-6 items-start">
        <Card title="Thông tin bệnh nhân">
          <Row label="Họ và tên">{appointment.patientName || "-"}</Row>
          <Row label="Ngày sinh">
            {formatDate(appointment.patientDateOfBirth)}
            {calcAge(appointment.patientDateOfBirth) !== null &&
              ` (${calcAge(appointment.patientDateOfBirth)} tuổi)`}
          </Row>
          <Row label="Giới tính">{appointment.patientGender || "-"}</Row>
          <Row label="Số điện thoại">{appointment.patientPhone || "-"}</Row>
          <Row label="Email">{appointment.patientEmail || "-"}</Row>
        </Card>

        <Card title="Thông tin lịch khám">
          <div className="grid grid-cols-2 gap-x-8">
            <Row label="Mã lịch khám">{appointmentCode(appointment.id)}</Row>
            <Row label="Giờ khám">{formatTime(appointment.appointmentTime)}</Row>
            <Row label="Bác sĩ">{appointment.doctorName || "-"}</Row>
            <Row label="Lý do khám">{appointment.reason || "-"}</Row>
            <Row label="Phòng khám">
              {appointment.roomNumber} – {appointment.roomType}
            </Row>
            <Row label="Trạng thái">
              <StatusBadge status={appointment.status} />
            </Row>
            <Row label="Ngày khám">{formatDate(appointment.appointmentDate)}</Row>
          </div>
        </Card>
      </div>

      <Card
        title="Kết quả chẩn đoán"
        footer={
          <>
            <button
              type="button"
              onClick={() => navigate(`/appointments/${id}`)}
              className={btnSecondary}
            >
              <i className="fa-solid fa-xmark"></i>
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isScheduled}
              className={`${btnPrimary} disabled:bg-[#e5e7eb] disabled:text-[#9ca3af] disabled:cursor-not-allowed`}
            >
              <i className="fa-regular fa-floppy-disk"></i>
              Lưu chẩn đoán
            </button>
            <button
              type="button"
              disabled
              title="Chức năng hóa đơn chưa có API (BRD 37–40)"
              className="h-11 px-5 inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#e5e7eb] text-[#9ca3af] text-[14px] font-semibold cursor-not-allowed"
            >
              <i className="fa-solid fa-file-invoice"></i>
              Kê đơn thuốc
            </button>
          </>
        }
      >
        <label className="block mb-2 text-[14px] font-medium text-[#374151]">
          Kết quả chẩn đoán<span className="text-[#ef4444] ml-1">*</span>
        </label>
        <textarea
          value={diagnosis}
          maxLength={DIAGNOSIS_LIMIT}
          disabled={!isScheduled}
          onChange={(e) => setDiagnosis(e.target.value)}
          placeholder="Nhập kết quả chẩn đoán..."
          className={`${textareaClass} h-[240px] disabled:bg-[#f3f4f6] disabled:cursor-not-allowed`}
        ></textarea>
        <div className="text-right text-[12px] text-[#9ca3af] mt-1">
          {diagnosis.length}/{DIAGNOSIS_LIMIT}
        </div>
      </Card>
    </section>
  );
}

export default UpdateDiagnosis;
