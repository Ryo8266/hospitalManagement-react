import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);

  const fetchPatientDetail = async () => {
    try {
      const res = await api.get(`/patients/${id}`);
      setPatient(res.data);
    } catch {
      console.log("Lỗi khi lấy dữ liệu");
    }
  };

  const deletePatient = async () => {
    try {
      await api.delete(`/patients/${id}`);
      alert("Xóa bệnh nhân thành công");
      navigate("/patients");
    } catch {
      alert("Xóa thất bại");
    }
  };

  const updatePatient = () => {
    navigate(`/patients/${id}/edit`);
  };

  useEffect(() => {
    fetchPatientDetail();
  }, [id]);

  const statusBadge = (status) => {
    switch (status) {
      case "Completed":
        return "bg-[#dcfce7] text-[#15803d]";
      case "Scheduled":
        return "bg-[#fef3c7] text-[#b45309]";
      case "Cancelled":
        return "bg-[#fee2e2] text-[#dc2626]";
      default:
        return "bg-[#dbeafe] text-[#2563eb]";
    }
  };

  const statusLabel = (status) => {
    switch (status) {
      case "Completed":
        return "Đã khám";
      case "Scheduled":
        return "Đã đặt";
      case "Cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  if (!patient) {
    return (
      <section className="p-8 flex-1 flex items-center justify-center">
        <p className="text-lg text-[#666]">Đang tải...</p>
      </section>
    );
  }

  return (
    <section className="p-[30px] flex-1">
      <div className="flex items-center gap-3 mb-[28px] text-[15px] text-[#666]">
        <span>Quản lý bệnh nhân</span>
        <i className="fa-solid fa-angle-right text-[12px] text-[#bbb]"></i>
        <span>Danh sách bệnh nhân</span>
        <i className="fa-solid fa-angle-right text-[12px] text-[#bbb]"></i>
        <strong className="text-[#111]">Chi tiết bệnh nhân</strong>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Link to="/patients">
          <button className="flex items-center gap-2.5 px-5.5 py-3 rounded-lg text-[15px] font-semibold border border-[#ddd] text-[#666] bg-white transition-all duration-300 hover:bg-[#f3f3f3]">
            <i className="fa-solid fa-arrow-left"></i>
            Quay lại danh sách
          </button>
        </Link>
        <div className="flex gap-[15px]">
          <button
            onClick={updatePatient}
            className="flex items-center gap-2.5 px-5.5 py-3 rounded-lg text-[15px] font-semibold bg-[#1b66ff] text-white transition-all duration-300 hover:bg-[#0056e7]"
          >
            <i className="fa-solid fa-pen"></i>
            Cập nhật
          </button>
          <button
            onClick={deletePatient}
            className="flex items-center gap-2.5 px-5.5 py-3 rounded-lg text-[15px] font-semibold bg-[#ef4444] text-white transition-all duration-300 hover:bg-[#d62828]"
          >
            <i className="fa-regular fa-trash-can"></i>
            Xóa
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[360px_1fr] gap-6">
        <div className="bg-white rounded-xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-[#e8edf5] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-3 pb-[22px] mb-0 border-b border-[#edf2f7]">
            <i className="fa-solid fa-user text-[#2563eb] text-[22px]"></i>
            <h3 className="text-[24px] font-bold text-[#222]">Thông tin bệnh nhân</h3>
          </div>
          <div className="px-[25px] pt-0 pb-6">
            <div className="grid grid-cols-[150px_1fr] items-center py-[18px] border-b border-[#f3f4f6]">
              <label className="font-semibold text-[#444]">Mã bệnh nhân</label>
              <span className="text-[#222] text-[15px]">{patient.id}</span>
            </div>
            <div className="grid grid-cols-[150px_1fr] items-center py-[18px] border-b border-[#f3f4f6]">
              <label className="font-semibold text-[#444]">Họ và tên</label>
              <span className="text-[#222] text-[15px]">{patient.fullName}</span>
            </div>
            <div className="grid grid-cols-[150px_1fr] items-center py-[18px] border-b border-[#f3f4f6]">
              <label className="font-semibold text-[#444]">Ngày sinh</label>
              <span className="text-[#222] text-[15px]">{patient.dateOfBirth}</span>
            </div>
            <div className="grid grid-cols-[150px_1fr] items-center py-[18px] border-b border-[#f3f4f6]">
              <label className="font-semibold text-[#444]">Giới tính</label>
              <span className="text-[#222] text-[15px]">{patient.gender}</span>
            </div>
            <div className="grid grid-cols-[150px_1fr] items-center py-[18px] border-b border-[#f3f4f6]">
              <label className="font-semibold text-[#444]">Số điện thoại</label>
              <span className="text-[#222] text-[15px]">{patient.phoneNumber || "-"}</span>
            </div>
            <div className="grid grid-cols-[150px_1fr] items-center py-[18px] border-b border-[#f3f4f6]">
              <label className="font-semibold text-[#444]">Email</label>
              <span className="text-[#222] text-[15px]">{patient.email || "-"}</span>
            </div>
            <div className="grid grid-cols-[150px_1fr] items-center py-[18px] border-b border-[#f3f4f6]">
              <label className="font-semibold text-[#444]">Địa chỉ</label>
              <span className="text-[#222] text-[15px]">{patient.address || "-"}</span>
            </div>
            <div className="grid grid-cols-[150px_1fr] items-center py-[18px]">
              <label className="font-semibold text-[#444]">Ngày đăng ký</label>
              <span className="text-[#222] text-[15px]">{patient.createdAt || "-"}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-[#e8edf5] transition-all duration-300 hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-between pb-[22px] border-b border-[#edf2f7]">
            <div className="flex items-center gap-3">
              <i className="fa-regular fa-calendar text-[#2563eb] text-[22px]"></i>
              <h3 className="text-[24px] font-bold text-[#222]">Lịch khám</h3>
            </div>
            <div className="bg-[#f3f4f6] px-4.5 py-2.5 rounded-lg font-semibold">
              Tổng số: <strong>{patient.appointments?.length || 0}</strong>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-[#f8fafc]">
                <tr>
                  <th className="py-4 px-4.5 text-left text-[14px] font-bold text-[#374151] border-b border-[#e5e7eb] w-[70px] text-center">
                    STT
                  </th>
                  <th className="py-4 px-4.5 text-left text-[14px] font-bold text-[#374151] border-b border-[#e5e7eb] w-[150px]">
                    Ngày khám
                  </th>
                  <th className="py-4 px-4.5 text-left text-[14px] font-bold text-[#374151] border-b border-[#e5e7eb] w-[120px]">
                    Giờ khám
                  </th>
                  <th className="py-4 px-4.5 text-left text-[14px] font-bold text-[#374151] border-b border-[#e5e7eb] w-[160px]">
                    Bác sĩ
                  </th>
                  <th className="py-4 px-4.5 text-left text-[14px] font-bold text-[#374151] border-b border-[#e5e7eb] w-[130px]">
                    Phòng khám
                  </th>
                  <th className="py-4 px-4.5 text-left text-[14px] font-bold text-[#374151] border-b border-[#e5e7eb]">
                    Lý do khám
                  </th>
                  <th className="py-4 px-4.5 text-left text-[14px] font-bold text-[#374151] border-b border-[#e5e7eb]">
                    Chẩn đoán
                  </th>
                  <th className="py-4 px-4.5 text-left text-[14px] font-bold text-[#374151] border-b border-[#e5e7eb] w-[130px]">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody>
                {patient.appointments?.map((apt, index) => (
                  <tr
                    key={index}
                    className="transition-all duration-250 hover:bg-[#f8fbff]"
                  >
                    <td className="py-4.5 px-4.5 border-b border-[#edf2f7] text-[15px] text-[#444] text-center">
                      {index + 1}
                    </td>
                    <td className="py-4.5 px-4.5 border-b border-[#edf2f7] text-[15px] text-[#444]">
                      {apt.appointmentDate}
                    </td>
                    <td className="py-4.5 px-4.5 border-b border-[#edf2f7] text-[15px] text-[#444]">
                      {apt.appointmentTime}
                    </td>
                    <td className="py-4.5 px-4.5 border-b border-[#edf2f7] text-[15px] text-[#444]">
                      {apt.doctor || "-"}
                    </td>
                    <td className="py-4.5 px-4.5 border-b border-[#edf2f7] text-[15px] text-[#444]">
                      {apt.room || "-"}
                    </td>
                    <td className="py-4.5 px-4.5 border-b border-[#edf2f7] text-[15px] text-[#444]">
                      {apt.reason || "-"}
                    </td>
                    <td className="py-4.5 px-4.5 border-b border-[#edf2f7] text-[15px] text-[#444]">
                      {apt.diagnosis || "-"}
                    </td>
                    <td className="py-4.5 px-4.5 border-b border-[#edf2f7]">
                      <span
                        className={`inline-flex items-center justify-center min-w-[90px] px-3.5 py-1.5 rounded-[6px] text-[13px] font-semibold ${statusBadge(apt.status)}`}
                      >
                        {statusLabel(apt.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PatientDetail;