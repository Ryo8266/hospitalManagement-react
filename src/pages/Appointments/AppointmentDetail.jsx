import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import StatusBadge from "../../components/ui/StatusBadge";
import { btnPrimary, btnDanger } from "../../components/ui/styles";
import { appointmentCode, formatDate, formatDateTime, formatTime } from "../../utils/format";

function Row({ label, children }) {
  return (
    <div className="grid grid-cols-[130px_1fr] items-start py-2.5">
      <span className="text-[14px] text-[#6b7280]">{label}</span>
      <span className="text-[15px] text-[#1f2937]">{children}</span>
    </div>
  );
}

function SummaryRow({ label, children, last }) {
  return (
    <div
      className={`grid grid-cols-[200px_1fr] items-start px-5 py-3 ${
        last ? "" : "border-b border-[#f0f2f5]"
      }`}
    >
      <span className="text-[14px] text-[#6b7280]">{label}</span>
      <span className="text-[15px] text-[#1f2937]">{children}</span>
    </div>
  );
}

function AppointmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);

  const fetchAppointment = async () => {
    try {
      const res = await api.get(`/appointments/${id}`);
      setAppointment(res.data);
    } catch {
      console.log("Lỗi khi lấy dữ liệu lịch khám");
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, [id]);

  const cancelAppointment = async () => {
    if (!confirm("Bạn có chắc muốn hủy lịch khám này?")) return;
    try {
      await api.put(`/appointments/${id}/cancel`);
      fetchAppointment();
    } catch (err) {
      if (err.response?.status === 400) {
        alert("Chỉ hủy được lịch khám đang ở trạng thái Scheduled");
      } else {
        alert("Hủy lịch khám thất bại");
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
      <PageHeader title="Chi tiết lịch khám" backTo="/appointments">
        <button
          type="button"
          disabled={!isScheduled}
          onClick={() => navigate(`/appointments/${id}/diagnosis`)}
          className={`${btnPrimary} disabled:bg-[#e5e7eb] disabled:text-[#9ca3af] disabled:cursor-not-allowed`}
        >
          <i className="fa-solid fa-pen"></i>
          Cập nhật chẩn đoán
        </button>
        <button
          type="button"
          disabled={!isScheduled}
          onClick={cancelAppointment}
          className={`${btnDanger} disabled:bg-[#e5e7eb] disabled:text-[#9ca3af] disabled:cursor-not-allowed`}
        >
          <i className="fa-regular fa-trash-can"></i>
          Hủy lịch khám
        </button>
      </PageHeader>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card title="Thông tin lịch khám">
          <Row label="Mã lịch khám">{appointmentCode(appointment.id)}</Row>
          <Row label="Ngày khám">{formatDate(appointment.appointmentDate)}</Row>
          <Row label="Giờ khám">{formatTime(appointment.appointmentTime)}</Row>
          <Row label="Lý do khám">{appointment.reason || "-"}</Row>
          <Row label="Trạng thái">
            <StatusBadge status={appointment.status} />
          </Row>
          <Row label="Ngày tạo">{formatDateTime(appointment.createdAt)}</Row>
        </Card>

        <Card title="Thông tin bác sĩ">
          <Row label="Mã bác sĩ">BS{String(appointment.doctorId).padStart(4, "0")}</Row>
          <Row label="Họ và tên">{appointment.doctorName || "-"}</Row>
          <Row label="Chuyên khoa">{appointment.doctorSpecialization || "-"}</Row>
          <Row label="Khoa">{appointment.departmentName || "-"}</Row>
          <Row label="Phòng khám">
            {appointment.roomNumber} – {appointment.roomType}
          </Row>
        </Card>

        <Card title="Thông tin bệnh nhân">
          <Row label="Mã bệnh nhân">BN{String(appointment.patientId).padStart(6, "0")}</Row>
          <Row label="Họ và tên">{appointment.patientName || "-"}</Row>
          <Row label="Ngày sinh">{formatDate(appointment.patientDateOfBirth)}</Row>
          <Row label="Giới tính">{appointment.patientGender || "-"}</Row>
          <Row label="Số điện thoại">{appointment.patientPhone || "-"}</Row>
        </Card>
      </div>

      <Card title="Chi tiết lịch khám" bodyClassName="p-0">
        <SummaryRow label="Mã lịch khám">{appointmentCode(appointment.id)}</SummaryRow>
        <SummaryRow label="Bệnh nhân">
          {appointment.patientName} (BN{String(appointment.patientId).padStart(6, "0")})
        </SummaryRow>
        <SummaryRow label="Bác sĩ">
          {appointment.doctorName} (BS{String(appointment.doctorId).padStart(4, "0")})
        </SummaryRow>
        <SummaryRow label="Phòng khám">
          {appointment.roomNumber} – {appointment.roomType}
        </SummaryRow>
        <SummaryRow label="Ngày khám">{formatDate(appointment.appointmentDate)}</SummaryRow>
        <SummaryRow label="Giờ khám">{formatTime(appointment.appointmentTime)}</SummaryRow>
        <SummaryRow label="Lý do khám">{appointment.reason || "-"}</SummaryRow>
        <SummaryRow label="Kết quả chẩn đoán">
          {appointment.diagnosis || <span className="text-[#ef4444]">Chưa cập nhật</span>}
        </SummaryRow>
        <SummaryRow label="Trạng thái">
          <StatusBadge status={appointment.status} />
        </SummaryRow>
        <SummaryRow label="Ngày tạo" last>
          {formatDateTime(appointment.createdAt)}
        </SummaryRow>
      </Card>

      <div className="mt-6 p-5 rounded-xl bg-[#f0f7ff] border border-[#cce0ff]">
        <h3 className="text-[14px] font-semibold text-[#1a6cf0] mb-2 flex items-center gap-2">
          <i className="fa-solid fa-circle-info"></i>
          Lưu ý
        </h3>
        <p className="text-[14px] text-[#4b5563]">
          Kết quả chẩn đoán sẽ được bác sĩ cập nhật sau khi khám. Bạn có thể cập nhật chẩn đoán
          hoặc hủy lịch khám khi lịch còn ở trạng thái Scheduled.
        </p>
      </div>
    </section>
  );
}

export default AppointmentDetail;
