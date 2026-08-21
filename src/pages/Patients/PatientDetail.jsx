import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import TableCard from "../../components/ui/TableCard";
import Pagination from "../../components/ui/Pagination";
import StatusBadge from "../../components/ui/StatusBadge";
import { thClass, tdClass } from "../../components/ui/styles";
import { formatDate, formatDateTime, formatTime } from "../../utils/format";

const PAGE_SIZE = 5;

function InfoRow({ label, children, last }) {
  return (
    <div
      className={`grid grid-cols-[140px_1fr] items-start py-3.5 ${
        last ? "" : "border-b border-[#f3f4f6]"
      }`}
    >
      <span className="text-[14px] text-[#6b7280]">{label}</span>
      <span className="text-[15px] text-[#1f2937]">{children}</span>
    </div>
  );
}

function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [page, setPage] = useState(1);

  const fetchPatientDetail = async () => {
    try {
      const res = await api.get(`/patients/${id}`);
      setPatient(res.data);
    } catch {
      console.log("Lỗi khi lấy dữ liệu");
    }
  };

  const deletePatient = async () => {
    if (!confirm("Bạn có chắc muốn xóa bệnh nhân này?")) return;
    try {
      await api.delete(`/patients/${id}`);
      navigate("/patients");
    } catch {
      alert("Xóa thất bại");
    }
  };

  useEffect(() => {
    fetchPatientDetail();
  }, [id]);

  if (!patient) {
    return (
      <section className="p-8 flex-1 flex items-center justify-center">
        <p className="text-[15px] text-[#6b7280]">Đang tải...</p>
      </section>
    );
  }

  const appointments = patient.appointments || [];
  const pageAppointments = appointments.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="p-8 flex-1">
      <PageHeader title="Chi tiết bệnh nhân" backTo="/patients" />

      <div className="grid grid-cols-[360px_1fr] gap-6 items-start">
        <Card
          title="Thông tin bệnh nhân"
          footer={
            <div className="flex gap-3 w-full">
              <button
                type="button"
                onClick={() => navigate(`/patients/${id}/edit`)}
                className="flex-1 h-11 inline-flex items-center justify-center gap-2.5 rounded-lg border border-[#1a6cf0] text-[#1a6cf0] text-[14px] font-semibold transition-colors hover:bg-[#1a6cf0] hover:text-white"
              >
                <i className="fa-solid fa-pen"></i>
                Cập nhật
              </button>
              <button
                type="button"
                onClick={deletePatient}
                className="flex-1 h-11 inline-flex items-center justify-center gap-2.5 rounded-lg border border-[#ef4444] text-[#ef4444] text-[14px] font-semibold transition-colors hover:bg-[#ef4444] hover:text-white"
              >
                <i className="fa-regular fa-trash-can"></i>
                Xóa bệnh nhân
              </button>
            </div>
          }
        >
          <InfoRow label="Mã bệnh nhân">{patient.id}</InfoRow>
          <InfoRow label="Họ và tên">{patient.fullName}</InfoRow>
          <InfoRow label="Ngày sinh">{formatDate(patient.dateOfBirth)}</InfoRow>
          <InfoRow label="Giới tính">{patient.gender}</InfoRow>
          <InfoRow label="Số điện thoại">{patient.phone || "-"}</InfoRow>
          <InfoRow label="Email">{patient.email || "-"}</InfoRow>
          <InfoRow label="Địa chỉ">{patient.address || "-"}</InfoRow>
          <InfoRow label="Ngày đăng ký" last>
            {formatDateTime(patient.createdAt)}
          </InfoRow>
        </Card>

        <Card
          title="Lịch khám của bệnh nhân"
          bodyClassName="p-0"
          extra={
            <div className="bg-[#f3f4f6] px-4 py-2 rounded-lg text-[14px] font-semibold text-[#374151]">
              Tổng số: {appointments.length}
            </div>
          }
        >
          <TableCard
            minWidth="1000px"
            bordered={false}
            pagination={
              <Pagination
                page={page}
                pageSize={PAGE_SIZE}
                total={appointments.length}
                unit="lịch khám"
                onChange={setPage}
              />
            }
          >
            <thead className="bg-[#f8fafc]">
              <tr>
                <th className={thClass}>STT</th>
                <th className={thClass}>Ngày khám</th>
                <th className={thClass}>Giờ khám</th>
                <th className={thClass}>Bác sĩ</th>
                <th className={thClass}>Phòng khám</th>
                <th className={thClass}>Lý do khám</th>
                <th className={thClass}>Kết quả chẩn đoán</th>
                <th className={thClass}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {pageAppointments.map((apt, index) => (
                <tr key={apt.id ?? index} className="transition-colors hover:bg-[#f9fbff]">
                  <td className={tdClass}>{(page - 1) * PAGE_SIZE + index + 1}</td>
                  <td className={tdClass}>{formatDate(apt.appointmentDate)}</td>
                  <td className={tdClass}>{formatTime(apt.appointmentTime)}</td>
                  <td className={tdClass}>{apt.doctor || "-"}</td>
                  <td className={tdClass}>{apt.room || "-"}</td>
                  <td className={tdClass}>{apt.reason || "-"}</td>
                  <td className={tdClass}>{apt.diagnosis || "-"}</td>
                  <td className={tdClass}>
                    <StatusBadge status={apt.status} />
                  </td>
                </tr>
              ))}
              {pageAppointments.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-[14px] text-[#6b7280]">
                    Bệnh nhân chưa có lịch khám nào
                  </td>
                </tr>
              )}
            </tbody>
          </TableCard>
        </Card>
      </div>
    </section>
  );
}

export default PatientDetail;
