import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'

function DepartmentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [department, setDepartment] = useState(null)

  const fetchDepartment = async () => {
    try {
      const res = await api.get(`/departments/${id}`)
      setDepartment(res.data)
    } catch {
      console.log('Lỗi khi lấy dữ liệu')
    }
  }

  const deleteDepartment = async () => {
    try {
      await api.delete(`/departments/${id}`)
      navigate('/departments')
    } catch {
      console.log('Lỗi khi xóa')
    }
  }

  const updateDepartment = () => {
    navigate(`/departments/${id}/edit`)
  }

  useEffect(() => {
    fetchDepartment()
  }, [id])

  if (!department) {
    return (
      <section className="p-8 flex-1 flex items-center justify-center">
        <p className="text-lg text-[#666]">Đang tải...</p>
      </section>
    )
  }

  return (
    <section className="p-8 flex-1">
      <div className="flex items-center gap-2.5 mb-6 text-[15px]">
        <Link to="/departments" className="text-[#2563eb] font-medium">Quản lý khoa</Link>
        <span className="text-[#6b7280]">{'>'}</span>
        <Link to="/departments" className="text-[#2563eb] font-medium">Danh sách khoa</Link>
        <span className="text-[#6b7280]">{'>'}</span>
        <span>Chi tiết khoa</span>
      </div>

      <div className="bg-white rounded-xl p-7 mb-6 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-5">
            <div className="w-[90px] h-[90px] rounded-full bg-[#eef5ff] flex items-center justify-center text-[#2563eb] text-[42px]">
              <i className="fa-solid fa-hospital"></i>
            </div>
            <div>
              <h1 className="text-[38px] font-bold mb-2.5">{department.departmentName}</h1>
              <span className="inline-block px-4 py-1.5 rounded-full text-[14px] font-semibold bg-[#e8f7ed] text-[#16a34a]">
                Đang hoạt động
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={updateDepartment}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-[15px] font-semibold border border-[#2563eb] text-[#2563eb] transition-all duration-300 hover:bg-[#2563eb] hover:text-white"
            >
              <i className="fa-solid fa-pen"></i>
              Sửa
            </button>
            <button
              onClick={deleteDepartment}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-[15px] font-semibold border border-[#dc2626] text-[#dc2626] transition-all duration-300 hover:bg-[#dc2626] hover:text-white"
            >
              <i className="fa-regular fa-trash-can"></i>
              Xóa
            </button>
          </div>
        </div>

        <hr className="border-none border-t border-[#e5e7eb] my-6" />

        <div className="grid grid-cols-2 gap-y-6 gap-x-20">
          <div className="flex gap-3.5 items-start">
            <label className="w-[130px] font-semibold text-[#374151]">Mã khoa:</label>
            <span className="text-[#4b5563] leading-7">{department.departmentId}</span>
          </div>
          <div className="flex gap-3.5 items-start">
            <label className="w-[130px] font-semibold text-[#374151]">Tên khoa:</label>
            <span className="text-[#4b5563] leading-7">{department.departmentName}</span>
          </div>
          <div className="flex gap-3.5 items-start">
            <label className="w-[130px] font-semibold text-[#374151]">Số điện thoại:</label>
            <span className="text-[#4b5563] leading-7">{department.phone}</span>
          </div>
          <div className="col-start-2 flex gap-3.5 items-start">
            <label className="w-[130px] font-semibold text-[#374151]">Mô tả:</label>
            <span className="text-[#4b5563] leading-7">{department.description}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-7 mb-6 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl flex items-center gap-3">
            <i className="fa-solid fa-notes-medical text-[#2563eb]"></i>
            Danh sách bác sĩ thuộc khoa
          </h2>
          <div className="bg-[#f3f4f6] px-4.5 py-2.5 rounded-lg font-semibold">
            Tổng số: <strong>{department.doctors?.length || 0}</strong> bác sĩ
          </div>
        </div>

        <table className="w-full border-collapse">
          <thead className="bg-[#f5f7fb]">
            <tr>
              <th className="py-4.5 px-4.5 text-left text-[15px]">STT</th>
              <th className="py-4.5 px-4.5 text-left text-[15px]">Họ và tên</th>
              <th className="py-4.5 px-4.5 text-left text-[15px]">Chuyên khoa</th>
            </tr>
          </thead>
          <tbody>
            {department.doctors?.map((doctor, index) => (
              <tr key={index} className="transition-all duration-250 hover:bg-[#f9fbff]">
                <td className="py-4.5 px-4.5 border-t border-[#eceff3]">{index + 1}</td>
                <td className="py-4.5 px-4.5 border-t border-[#eceff3]">{doctor.fullName}</td>
                <td className="py-4.5 px-4.5 border-t border-[#eceff3]">{doctor.specialization}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link
        to="/departments"
        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-[15px] font-semibold border border-[#2563eb] text-[#2563eb] transition-all duration-300 hover:bg-[#2563eb] hover:text-white"
      >
        <i className="fa-solid fa-arrow-left"></i>
        Quay lại danh sách
      </Link>
    </section>
  )
}

export default DepartmentDetail