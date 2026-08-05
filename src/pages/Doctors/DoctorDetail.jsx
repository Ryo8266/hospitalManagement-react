import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

function DoctorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const fetchDoctorDetail = async () => {
    try {
      const res = await api.get(`/doctors/${id}`);
      setDoctor(res.data);
    } catch {
      console.log("Lỗi khi lấy dữ liệu");
    }
  };

  const deleteDoctor = async () => {
    try {
      await api.delete(`/doctors/${id}`);
      alert("Xóa thành công");
      navigate("/doctors");
    } catch {
      console.log("Lỗi khi xóa");
    }
  };

  const updateDoctor = () => {
    navigate(`/doctors/${id}/edit`);
  };

  useEffect(() => {
    fetchDoctorDetail();
  }, [id]);

  const filteredAppointments = () => {
    if (!doctor?.appointments) return [];
    let list = doctor.appointments;
    if (filterDateFrom) {
      list = list.filter((a) => a.appointmentDate >= filterDateFrom);
    }
    if (filterDateTo) {
      list = list.filter((a) => a.appointmentDate <= filterDateTo);
    }
    if (filterStatus) {
      list = list.filter((a) => a.status === filterStatus);
    }
    return list;
  };

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

  if (!doctor) {
    return (
      <section className="p-8 flex-1 flex items-center justify-center">
        <p className="text-lg text-[#666]">Đang tải...</p>
      </section>
    );
  }

  return (
    <section className="p-8 flex-1">
      <div className="flex items-center gap-2.5 mb-6 text-[15px]">
        <Link to="/doctors" className="text-[#2563eb] font-medium">
          Quản lý bác sĩ
        </Link>
        <span className="text-[#6b7280]">{">"}</span>
        <Link to="/doctors" className="text-[#2563eb] font-medium">
          Danh sách bác sĩ
        </Link>
        <span className="text-[#6b7280]">{">"}</span>
        <span>Chi tiết bác sĩ</span>
      </div>

      <div className="flex gap-4 mb-6">
        <Link to="/doctors">
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl text-[15px] font-semibold border border-[#ccc] text-[#666] bg-white transition-all duration-300 hover:bg-[#f5f5f5]">
            <i className="fa-solid fa-arrow-left"></i>
            Quay lại danh sách
          </button>
        </Link>
        <button
          onClick={updateDoctor}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-[15px] font-semibold bg-[#1b66ff] text-white transition-all duration-300 hover:bg-[#1558d4]"
        >
          <i className="fa-solid fa-pen"></i>
          Cập nhật
        </button>
        <button
          onClick={deleteDoctor}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-[15px] font-semibold bg-[#ef4444] text-white transition-all duration-300 hover:bg-[#dc2626]"
        >
          <i className="fa-regular fa-trash-can"></i>
          Xóa
        </button>
      </div>

      <div className="grid grid-cols-[360px_1fr] gap-6">
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
            <h3 className="text-xl font-bold mb-5 flex items-center gap-2.5">
              <i className="fa-solid fa-user-doctor text-[#2563eb]"></i>
              Thông tin bác sĩ
            </h3>
            <div className="flex flex-col gap-0">
              <div className="flex gap-3.5 py-4.5 border-b border-[#f0f2f5]">
                <label className="w-[150px] font-semibold text-[#374151]">
                  Mã bác sĩ:
                </label>
                <span className="text-[#4b5563]">BS000{doctor.doctorId}</span>
              </div>
              <div className="flex gap-3.5 py-4.5 border-b border-[#f0f2f5]">
                <label className="w-[150px] font-semibold text-[#374151]">
                  Họ và tên:
                </label>
                <span className="text-[#4b5563]">{doctor.fullName}</span>
              </div>
              <div className="flex gap-3.5 py-4.5 border-b border-[#f0f2f5]">
                <label className="w-[150px] font-semibold text-[#374151]">
                  Chuyên khoa:
                </label>
                <span className="text-[#4b5563]">{doctor.specialization}</span>
              </div>
              <div className="flex gap-3.5 py-4.5 border-b border-[#f0f2f5]">
                <label className="w-[150px] font-semibold text-[#374151]">
                  Số điện thoại:
                </label>
                <span className="text-[#4b5563]">
                  {doctor.phone || "-"}
                </span>
              </div>
              <div className="flex gap-3.5 py-4.5 border-b border-[#f0f2f5]">
                <label className="w-[150px] font-semibold text-[#374151]">
                  Email:
                </label>
                <span className="text-[#4b5563]">{doctor.email || "-"}</span>
              </div>
              <div className="flex gap-3.5 py-4.5 border-b border-[#f0f2f5]">
                <label className="w-[150px] font-semibold text-[#374151]">
                  Khoa:
                </label>
                <span className="text-[#4b5563]">
                  {doctor.departmentName || "-"}
                </span>
              </div>
              <div className="flex gap-3.5 py-4.5">
                <label className="w-[150px] font-semibold text-[#374151]">
                  Trạng thái:
                </label>
                <span
                  className={`inline-block px-4 py-1.5 rounded-[20px] text-[13px] font-semibold ${
                    doctor.status === "Active"
                      ? "bg-[#dcfce7] text-[#15803d]"
                      : "bg-[#fee2e2] text-[#dc2626]"
                  }`}
                >
                  {doctor.status}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
            <h3 className="text-xl font-bold mb-5 flex items-center gap-2.5">
              <i className="fa-solid fa-chart-line text-[#2563eb]"></i>
              Tổng quan
            </h3>
            <div className="flex items-center gap-4">
              <div className="w-[54px] h-[54px] rounded-xl bg-[#eef5ff] flex items-center justify-center text-[#2563eb] text-xl">
                <i className="fa-solid fa-calendar-check"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1f2937]">
                  {doctor.appointments?.length || 0}
                </p>
                <p className="text-[14px] text-[#666]">Tổng lịch khám</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
          <h3 className="text-xl font-bold mb-5 flex items-center gap-2.5">
            <i className="fa-solid fa-calendar-days text-[#2563eb]"></i>
            Lịch khám
          </h3>

          <div className="grid grid-cols-4 gap-4 mb-5">
            <div>
              <label className="block text-[14px] font-medium text-[#374151] mb-2">
                Từ ngày
              </label>
              <input
                type="date"
                value={filterDateFrom}
                onChange={(e) => setFilterDateFrom(e.target.value)}
                className="w-full h-11 border border-[#d7d7d7] rounded-lg px-3.5 text-[14px] outline-none focus:border-[#1976f3]"
              />
            </div>
            <div>
              <label className="block text-[14px] font-medium text-[#374151] mb-2">
                Đến ngày
              </label>
              <input
                type="date"
                value={filterDateTo}
                onChange={(e) => setFilterDateTo(e.target.value)}
                className="w-full h-11 border border-[#d7d7d7] rounded-lg px-3.5 text-[14px] outline-none focus:border-[#1976f3]"
              />
            </div>
            <div>
              <label className="block text-[14px] font-medium text-[#374151] mb-2">
                Trạng thái
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full h-11 border border-[#d7d7d7] rounded-lg px-3.5 text-[14px] bg-white outline-none cursor-pointer focus:border-[#1976f3]"
              >
                <option value="">Tất cả</option>
                <option value="Scheduled">Đã đặt</option>
                <option value="Completed">Đã khám</option>
                <option value="Cancelled">Đã hủy</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full h-11 flex items-center justify-center gap-2.5 bg-[#0d6efd] text-white rounded-lg text-[14px] font-semibold transition-all duration-300 hover:bg-[#0b5ed7]">
                <i className="fa-solid fa-magnifying-glass"></i>
                Tìm kiếm
              </button>
            </div>
          </div>

          <table className="w-full border-collapse">
            <thead className="bg-[#f8fafc]">
              <tr>
                <th className="py-4.5 px-4.5 text-left text-[15px] font-semibold text-[#374151]">
                  STT
                </th>
                <th className="py-4.5 px-4.5 text-left text-[15px] font-semibold text-[#374151]">
                  Ngày khám
                </th>
                <th className="py-4.5 px-4.5 text-left text-[15px] font-semibold text-[#374151]">
                  Giờ khám
                </th>
                <th className="py-4.5 px-4.5 text-left text-[15px] font-semibold text-[#374151]">
                  Phòng
                </th>
                <th className="py-4.5 px-4.5 text-left text-[15px] font-semibold text-[#374151]">
                  Bệnh nhân
                </th>
                <th className="py-4.5 px-4.5 text-left text-[15px] font-semibold text-[#374151]">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments().map((apt, index) => (
                <tr
                  key={index}
                  className="transition-all duration-250 hover:bg-[#f8fbff]"
                >
                  <td className="py-4.5 px-4.5 border-t border-[#eceff3] text-[15px]">
                    {index + 1}
                  </td>
                  <td className="py-4.5 px-4.5 border-t border-[#eceff3] text-[15px]">
                    {apt.appointmentDate}
                  </td>
                  <td className="py-4.5 px-4.5 border-t border-[#eceff3] text-[15px]">
                    {apt.appointmentTime}
                  </td>
                  <td className="py-4.5 px-4.5 border-t border-[#eceff3] text-[15px]">
                    {apt.roomNumber || "-"}
                  </td>
                  <td className="py-4.5 px-4.5 border-t border-[#eceff3] text-[15px]">
                    {apt.patientName || "-"}
                  </td>
                  <td className="py-4.5 px-4.5 border-t border-[#eceff3]">
                    <span
                      className={`inline-block px-4 py-1.5 rounded-[20px] text-[13px] font-semibold ${statusBadge(apt.status)}`}
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
    </section>
  );
}

export default DoctorDetail;
