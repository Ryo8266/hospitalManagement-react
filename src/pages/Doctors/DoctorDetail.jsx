import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import TableCard from '../../components/ui/TableCard'
import Pagination from '../../components/ui/Pagination'
import StatusBadge from '../../components/ui/StatusBadge'
import {
  btnPrimary,
  btnDanger,
  inputClass,
  selectClass,
  thClass,
  tdClass,
} from '../../components/ui/styles'
import { formatDate, formatTime } from '../../utils/format'

const PAGE_SIZE = 10

function InfoRow({ label, children, last }) {
  return (
    <div
      className={`grid grid-cols-[140px_1fr] items-center py-3.5 ${
        last ? '' : 'border-b border-[#f3f4f6]'
      }`}
    >
      <span className="text-[14px] text-[#6b7280]">{label}</span>
      <span className="text-[15px] text-[#1f2937]">{children}</span>
    </div>
  )
}

function SummaryRow({ icon, tone, label, value }) {
  return (
    <div className="flex items-center gap-4 py-3.5 border-b border-[#f3f4f6] last:border-b-0">
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center text-[18px] shrink-0 ${tone}`}
      >
        <i className={icon}></i>
      </div>
      <span className="flex-1 text-[14px] font-medium text-[#4b5563]">{label}</span>
      <span className="text-[20px] font-bold text-[#1f2937]">{value}</span>
    </div>
  )
}

function DoctorDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [doctor, setDoctor] = useState(null)
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [page, setPage] = useState(1)

  const fetchDoctorDetail = async () => {
    try {
      const res = await api.get(`/doctors/${id}`)
      setDoctor(res.data)
    } catch {
      console.log('Lỗi khi lấy dữ liệu')
    }
  }

  const deleteDoctor = async () => {
    if (!confirm('Bạn có chắc muốn xóa bác sĩ này?')) return
    try {
      await api.delete(`/doctors/${id}`)
      navigate('/doctors')
    } catch {
      alert('Xóa thất bại')
    }
  }

  useEffect(() => {
    fetchDoctorDetail()
  }, [id])

  if (!doctor) {
    return (
      <section className="p-8 flex-1 flex items-center justify-center">
        <p className="text-[15px] text-[#6b7280]">Đang tải...</p>
      </section>
    )
  }

  const appointments = doctor.appointments || []

  const filtered = appointments.filter((apt) => {
    if (dateFrom && apt.appointmentDate < dateFrom) return false
    if (dateTo && apt.appointmentDate > dateTo) return false
    if (filterStatus && apt.status !== filterStatus) return false
    return true
  })

  const pageAppointments = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const uniquePatients = new Set(appointments.map((apt) => apt.patient).filter(Boolean)).size

  return (
    <section className="p-8 flex-1">
      <PageHeader title="Chi tiết bác sĩ" backTo="/doctors">
        <button
          type="button"
          onClick={() => navigate(`/doctors/${id}/edit`)}
          className={btnPrimary}
        >
          <i className="fa-solid fa-pen"></i>
          Cập nhật
        </button>
        <button type="button" onClick={deleteDoctor} className={btnDanger}>
          <i className="fa-regular fa-trash-can"></i>
          Xóa
        </button>
      </PageHeader>

      <div className="grid grid-cols-[360px_1fr] gap-6 items-start">
        <div className="flex flex-col gap-6">
          <Card title="Thông tin bác sĩ">
            <InfoRow label="Mã bác sĩ">BS{String(doctor.doctorId).padStart(4, '0')}</InfoRow>
            <InfoRow label="Họ và tên">{doctor.fullName}</InfoRow>
            <InfoRow label="Chuyên khoa">{doctor.specialization}</InfoRow>
            <InfoRow label="Số điện thoại">{doctor.phone || '-'}</InfoRow>
            <InfoRow label="Email">{doctor.email || '-'}</InfoRow>
            <InfoRow label="Khoa">{doctor.departmentName || '-'}</InfoRow>
            <InfoRow label="Trạng thái" last>
              <StatusBadge status={doctor.status} />
            </InfoRow>
          </Card>

          <Card title="Tổng quan">
            <SummaryRow
              icon="fa-regular fa-calendar"
              tone="bg-[#dbeafe] text-[#2563eb]"
              label="Tổng lịch khám"
              value={appointments.length}
            />
            <SummaryRow
              icon="fa-solid fa-users"
              tone="bg-[#dcfce7] text-[#15803d]"
              label="Tổng bệnh nhân"
              value={uniquePatients}
            />
            <SummaryRow
              icon="fa-solid fa-file-invoice"
              tone="bg-[#fef3c7] text-[#b45309]"
              label="Tổng hóa đơn"
              value="-"
            />
          </Card>
        </div>

        <Card title="Lịch khám" bodyClassName="p-0">
          <div className="grid grid-cols-4 gap-4 items-end p-6 border-b border-[#eef1f5]">
            <div>
              <label className="block mb-2 text-[14px] font-medium text-[#374151]">Từ ngày</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => {
                  setDateFrom(e.target.value)
                  setPage(1)
                }}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block mb-2 text-[14px] font-medium text-[#374151]">Đến ngày</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => {
                  setDateTo(e.target.value)
                  setPage(1)
                }}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block mb-2 text-[14px] font-medium text-[#374151]">
                Trạng thái
              </label>
              <select
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value)
                  setPage(1)
                }}
                className={selectClass}
              >
                <option value="">Tất cả</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <button
              type="button"
              onClick={() => setPage(1)}
              className={`${btnPrimary} w-full`}
            >
              <i className="fa-solid fa-magnifying-glass"></i>
              Tìm kiếm
            </button>
          </div>

          <TableCard
            minWidth="700px"
            bordered={false}
            pagination={
              <Pagination
                page={page}
                pageSize={PAGE_SIZE}
                total={filtered.length}
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
                <th className={thClass}>Phòng khám</th>
                <th className={thClass}>Bệnh nhân</th>
                <th className={thClass}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {pageAppointments.map((apt, index) => (
                <tr key={apt.id ?? index} className="transition-colors hover:bg-[#f9fbff]">
                  <td className={tdClass}>{(page - 1) * PAGE_SIZE + index + 1}</td>
                  <td className={tdClass}>{formatDate(apt.appointmentDate)}</td>
                  <td className={tdClass}>{formatTime(apt.appointmentTime)}</td>
                  <td className={tdClass}>{apt.room || '-'}</td>
                  <td className={tdClass}>{apt.patient || '-'}</td>
                  <td className={tdClass}>
                    <StatusBadge status={apt.status} />
                  </td>
                </tr>
              ))}
              {pageAppointments.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-[14px] text-[#6b7280]">
                    Không có lịch khám nào
                  </td>
                </tr>
              )}
            </tbody>
          </TableCard>
        </Card>
      </div>
    </section>
  )
}

export default DoctorDetail
