import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'

function DoctorDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [doctor, setDoctor] = useState(null)
  const [filterDateFrom, setFilterDateFrom] = useState('')
  const [filterDateTo, setFilterDateTo] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const fetchDoctorDetail = async () => {
    try {
      const res = await api.get(`/doctors/${id}`)
      setDoctor(res.data)
    } catch {
      console.log('Lỗi khi lấy dữ liệu')
    }
  }

  const deleteDoctor = async () => {
    try {
      await api.delete(`/doctors/${id}`)
      alert('Xóa thành công')
      navigate('/doctors')
    } catch {
      console.log('Lỗi khi xóa')
    }
  }

  const updateDoctor = () => {
    navigate(`/doctors/${id}/edit`)
  }

  useEffect(() => {
    fetchDoctorDetail()
  }, [id])

  const filteredAppointments = () => {
    if (!doctor?.appointments) return []
    let list = doctor.appointments
    if (filterDateFrom) {
      list = list.filter((a) => a.appointmentDate >= filterDateFrom)
    }
    if (filterDateTo) {
      list = list.filter((a) => a.appointmentDate <= filterDateTo)
    }
    if (filterStatus) {
      list = list.filter((a) => a.status === filterStatus)
    }
    return list
  }

  const statusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-[#dcfce7] text-[#15803d]'
      case 'Scheduled':
        return 'bg-[#fef3c7] text-[#b45309]'
      case 'Cancelled':
        return 'bg-[#fee2e2] text-[#dc2626]'
      default:
        return 'bg-[#dbeafe] text-[#2563eb]'
    }
  }

  const statusLabel = (status) => {
    switch (status) {
      case 'Completed':
        return 'Đã khám'
      case 'Scheduled':
        return 'Đã đặt'
      case 'Cancelled':
        return 'Đã hủy'
      default:
        return status
    }
  }

  if (!doctor) {
    return (
      <section className="p-8 flex-1 flex items-center justify-center">
        <p className="text-lg text-[#666]">Đang tải...</p>
      </section>
    )
  }

  return (
    <section className="p-[30px] flex-1">
      <div className="flex items-center gap-3 mb-[28px] text-[15px] text-[#666]">
        <span>Quản lý bác sĩ</span>
        <i className="fa-solid fa-angle-right text-[12px] text-[#bbb]"></i>
        <span>Danh sách bác sĩ</span>
        <i className="fa-solid fa-angle-right text-[12px] text-[#bbb]"></i>
        <strong className="text-[#111]">Chi tiết bác sĩ</strong>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Link to="/doctors">
          <button className="flex items-center gap-2.5 px-5.5 py-3 rounded-lg text-[15px] font-semibold border border-[#ddd] text-[#666] bg-white transition-all duration-300 hover:bg-[#f3f3f3]">
            <i className="fa-solid fa-arrow-left"></i>
            Quay lại danh sách
          </button>
        </Link>
        <div className="flex gap-[15px]">
          <button
            onClick={updateDoctor}
            className="flex items-center gap-2.5 px-5.5 py-3 rounded-lg text-[15px] font-semibold bg-[#1b66ff] text-white transition-all duration-300 hover:bg-[#0056e7]"
          >
            <i className="fa-solid fa-pen"></i>
            Cập nhật
          </button>
          <button
            onClick={deleteDoctor}
            className="flex items-center gap-2.5 px-5.5 py-3 rounded-lg text-[15px] font-semibold bg-[#ef4444] text-white transition-all duration-300 hover:bg-[#d62828]"
          >
            <i className="fa-regular fa-trash-can"></i>
            Xóa
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[360px_1fr] gap-6">
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-[#e8edf5] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-3 pb-[22px] mb-0 border-b border-[#edf2f7]">
              <i className="fa-solid fa-user-doctor text-[#2563eb] text-[22px]"></i>
              <h3 className="text-[24px] font-bold text-[#222]">Thông tin bác sĩ</h3>
            </div>
            <div className="px-[25px] pt-0 pb-6">
              <div className="grid grid-cols-[150px_1fr] items-center py-[18px] border-b border-[#f3f4f6]">
                <label className="font-semibold text-[#444]">Mã bác sĩ</label>
                <span className="text-[#222] text-[15px]">BS{doctor.doctorId}</span>
              </div>
              <div className="grid grid-cols-[150px_1fr] items-center py-[18px] border-b border-[#f3f4f6]">
                <label className="font-semibold text-[#444]">Họ và tên</label>
                <span className="text-[#222] text-[15px]">{doctor.fullName}</span>
              </div>
              <div className="grid grid-cols-[150px_1fr] items-center py-[18px] border-b border-[#f3f4f6]">
                <label className="font-semibold text-[#444]">Chuyên khoa</label>
                <span className="text-[#222] text-[15px]">{doctor.specialization}</span>
              </div>
              <div className="grid grid-cols-[150px_1fr] items-center py-[18px] border-b border-[#f3f4f6]">
                <label className="font-semibold text-[#444]">Số điện thoại</label>
                <span className="text-[#222] text-[15px]">{doctor.phoneNumber || '-'}</span>
              </div>
              <div className="grid grid-cols-[150px_1fr] items-center py-[18px] border-b border-[#f3f4f6]">
                <label className="font-semibold text-[#444]">Email</label>
                <span className="text-[#222] text-[15px]">{doctor.email || '-'}</span>
              </div>
              <div className="grid grid-cols-[150px_1fr] items-center py-[18px] border-b border-[#f3f4f6]">
                <label className="font-semibold text-[#444]">Khoa</label>
                <span className="text-[#222] text-[15px]">{doctor.departmentName || '-'}</span>
              </div>
              <div className="grid grid-cols-[150px_1fr] items-center py-[18px]">
                <label className="font-semibold text-[#444]">Trạng thái</label>
                <span
                  className={`inline-flex items-center justify-center px-3.5 py-1.5 rounded-[6px] text-[13px] font-semibold w-max ${
                    doctor.status === 'Active'
                      ? 'bg-[#dcfce7] text-[#15803d]'
                      : 'bg-[#fee2e2] text-[#dc2626]'
                  }`}
                >
                  {doctor.status}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-[#e8edf5] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-3 pb-[22px] border-b border-[#edf2f7]">
              <h3 className="text-[24px] font-bold text-[#222]">Tổng quan</h3>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between p-4.5 rounded-xl border border-[#edf2f7] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_8px_18px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-[18px]">
                  <div className="w-[54px] h-[54px] rounded-xl bg-[#dbeafe] text-[#2563eb] flex items-center justify-center text-[22px] flex-shrink-0">
                    <i className="fa-regular fa-calendar"></i>
                  </div>
                  <div className="flex-1 flex justify-between items-center">
                    <h4 className="text-[15px] font-semibold text-[#555]">Tổng lịch khám</h4>
                    <span className="text-[28px] font-bold text-[#222]">
                      {doctor.appointments?.length || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-[#e8edf5] transition-all duration-300 hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-3 pb-[22px] border-b border-[#edf2f7]">
            <i className="fa-regular fa-calendar text-[#2563eb] text-[22px]"></i>
            <h3 className="text-[24px] font-bold text-[#222]">Lịch khám</h3>
          </div>

          <div className="grid grid-cols-4 gap-5 items-end p-[25px] border-b border-[#eef2f7]">
            <div>
              <label className="block text-[14px] font-semibold text-[#555] mb-2">
                Từ ngày
              </label>
              <input
                type="date"
                value={filterDateFrom}
                onChange={(e) => setFilterDateFrom(e.target.value)}
                className="w-full h-[46px] border border-[#d9e2ef] rounded-lg px-3.5 text-[15px] outline-none transition-all duration-300 focus:border-[#2563eb] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.12)]"
              />
            </div>
            <div>
              <label className="block text-[14px] font-semibold text-[#555] mb-2">
                Đến ngày
              </label>
              <input
                type="date"
                value={filterDateTo}
                onChange={(e) => setFilterDateTo(e.target.value)}
                className="w-full h-[46px] border border-[#d9e2ef] rounded-lg px-3.5 text-[15px] outline-none transition-all duration-300 focus:border-[#2563eb] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.12)]"
              />
            </div>
            <div>
              <label className="block text-[14px] font-semibold text-[#555] mb-2">
                Trạng thái
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full h-[46px] border border-[#d9e2ef] rounded-lg px-3.5 text-[15px] bg-white outline-none cursor-pointer transition-all duration-300 focus:border-[#2563eb] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.12)]"
              >
                <option value="">Tất cả</option>
                <option value="Scheduled">Đã đặt</option>
                <option value="Completed">Đã khám</option>
                <option value="Cancelled">Đã hủy</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full h-[46px] flex items-center justify-center gap-2.5 bg-[#1b66ff] text-white rounded-lg text-[15px] font-semibold transition-all duration-300 hover:bg-[#0056e7]">
                <i className="fa-solid fa-magnifying-glass"></i>
                Tìm kiếm
              </button>
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
                    Phòng khám
                  </th>
                  <th className="py-4 px-4.5 text-left text-[14px] font-bold text-[#374151] border-b border-[#e5e7eb]">
                    Bệnh nhân
                  </th>
                  <th className="py-4 px-4.5 text-left text-[14px] font-bold text-[#374151] border-b border-[#e5e7eb] w-[150px]">
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
                      {apt.room || apt.roomNumber || '-'}
                    </td>
                    <td className="py-4.5 px-4.5 border-b border-[#edf2f7] text-[15px] text-[#444]">
                      {apt.patient || apt.patientName || '-'}
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
  )
}

export default DoctorDetail