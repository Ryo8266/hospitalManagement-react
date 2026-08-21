import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'
import TableCard from '../../components/ui/TableCard'
import Pagination from '../../components/ui/Pagination'
import StatusBadge from '../../components/ui/StatusBadge'
import { btnPrimary, btnSecondary, btnDanger, thClass, tdClass } from '../../components/ui/styles'

const PAGE_SIZE = 5

function DepartmentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [department, setDepartment] = useState(null)
  const [page, setPage] = useState(1)

  const fetchDepartment = async () => {
    try {
      const res = await api.get(`/departments/${id}`)
      setDepartment(res.data)
    } catch {
      console.log('Lỗi khi lấy dữ liệu')
    }
  }

  const deleteDepartment = async () => {
    if (!confirm('Bạn có chắc muốn xóa khoa này?')) return
    try {
      await api.delete(`/departments/${id}`)
      navigate('/departments')
    } catch (err) {
      if (err.response?.status === 400) {
        alert('Không thể xóa: Khoa còn bác sĩ hoặc phòng')
      } else {
        alert('Xóa thất bại')
      }
    }
  }

  useEffect(() => {
    fetchDepartment()
  }, [id])

  if (!department) {
    return (
      <section className="p-8 flex-1 flex items-center justify-center">
        <p className="text-[15px] text-[#6b7280]">Đang tải...</p>
      </section>
    )
  }

  const doctors = department.doctors || []
  const pageDoctors = doctors.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <section className="p-8 flex-1">
      <div className="bg-white rounded-xl border border-[#e5e7eb] p-6 mb-6">
        <div className="flex justify-between items-start gap-6">
          <div className="flex items-center gap-5">
            <div className="w-[72px] h-[72px] rounded-full bg-[#eef5ff] flex items-center justify-center text-[#1a6cf0] text-[30px]">
              <i className="fa-solid fa-hospital"></i>
            </div>
            <div>
              <h1 className="text-[24px] font-bold text-[#1f2937] mb-2">
                {department.departmentName}
              </h1>
              <span className="inline-block px-3 py-1 rounded-full text-[13px] font-semibold bg-[#dbeafe] text-[#2563eb]">
                Đang hoạt động
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate(`/departments/${id}/edit`)}
              className={btnPrimary}
            >
              <i className="fa-solid fa-pen"></i>
              Sửa
            </button>
            <button type="button" onClick={deleteDepartment} className={btnDanger}>
              <i className="fa-regular fa-trash-can"></i>
              Xóa
            </button>
          </div>
        </div>

        <hr className="border-none border-t border-[#eef1f5] my-6" />

        <div className="grid grid-cols-2 gap-x-16 gap-y-4">
          <div className="flex gap-4">
            <span className="w-[140px] text-[14px] text-[#6b7280]">Mã khoa:</span>
            <span className="text-[15px] text-[#1f2937]">{department.departmentId}</span>
          </div>
          <div className="flex gap-4 row-span-3">
            <span className="w-[140px] text-[14px] text-[#6b7280]">Mô tả:</span>
            <span className="text-[15px] text-[#1f2937] flex-1">{department.description}</span>
          </div>
          <div className="flex gap-4">
            <span className="w-[140px] text-[14px] text-[#6b7280]">Tên khoa:</span>
            <span className="text-[15px] text-[#1f2937]">{department.departmentName}</span>
          </div>
          <div className="flex gap-4">
            <span className="w-[140px] text-[14px] text-[#6b7280]">Số điện thoại:</span>
            <span className="text-[15px] text-[#1f2937]">{department.phone}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[18px] font-semibold text-[#1f2937] flex items-center gap-3">
          <i className="fa-solid fa-notes-medical text-[#1a6cf0]"></i>
          Danh sách bác sĩ thuộc khoa
        </h2>
        <div className="bg-[#f3f4f6] px-4 py-2 rounded-lg text-[14px] font-semibold text-[#374151]">
          Tổng số: {doctors.length} bác sĩ
        </div>
      </div>

      <TableCard
        minWidth="900px"
        pagination={
          <Pagination
            page={page}
            pageSize={PAGE_SIZE}
            total={doctors.length}
            unit="bác sĩ"
            onChange={setPage}
          />
        }
      >
        <thead className="bg-[#f8fafc]">
          <tr>
            <th className={thClass}>STT</th>
            <th className={thClass}>Họ và tên</th>
            <th className={thClass}>Chuyên khoa</th>
            <th className={thClass}>Số điện thoại</th>
            <th className={thClass}>Email</th>
            <th className={thClass}>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {pageDoctors.map((doctor, index) => (
            <tr key={doctor.doctorId} className="transition-colors hover:bg-[#f9fbff]">
              <td className={tdClass}>{(page - 1) * PAGE_SIZE + index + 1}</td>
              <td className={tdClass}>{doctor.fullName}</td>
              <td className={tdClass}>{doctor.specialization}</td>
              <td className={tdClass}>{doctor.phone || '-'}</td>
              <td className={tdClass}>{doctor.email || '-'}</td>
              <td className={tdClass}>
                <StatusBadge status={doctor.status} />
              </td>
            </tr>
          ))}
          {pageDoctors.length === 0 && (
            <tr>
              <td colSpan={6} className="py-10 text-center text-[14px] text-[#6b7280]">
                Khoa chưa có bác sĩ nào
              </td>
            </tr>
          )}
        </tbody>
      </TableCard>

      <Link to="/departments" className={`${btnSecondary} mt-6`}>
        <i className="fa-solid fa-arrow-left"></i>
        Quay lại danh sách
      </Link>
    </section>
  )
}

export default DepartmentDetail
