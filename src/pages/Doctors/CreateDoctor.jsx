import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'

function CreateDoctor() {
  const navigate = useNavigate()
  const [departments, setDepartments] = useState([])
  const [formData, setFormData] = useState({
    departmentId: '',
    fullName: '',
    specialization: '',
    phone: '',
    email: '',
    status: 'Active',
  })

  const fetchDepartments = async () => {
    try {
      const res = await api.get('/departments')
      setDepartments(res.data)
    } catch {
      console.log('Lỗi khi lấy danh sách khoa')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.specialization || !formData.departmentId) {
      alert('Chưa đầy đủ thông tin')
      return
    }

    try {
      await api.post('/doctors', formData)
      alert('Thêm bác sĩ thành công')
      navigate('/doctors')
    } catch {
      alert('Thêm thất bại')
    }
  }

  useEffect(() => {
    fetchDepartments()
  }, [])

  return (
    <section className="p-[34px] px-[27px] flex-1">
      <div className="flex items-center gap-3 mb-[31px] text-[16px]">
        <Link to="/doctors" className="text-[#075fc9] font-medium">Quản lý bác sĩ</Link>
        <i className="fa-solid fa-chevron-right text-[12px] text-[#788293]"></i>
        <Link to="/doctors" className="text-[#075fc9] font-medium">Danh sách bác sĩ</Link>
        <i className="fa-solid fa-chevron-right text-[12px] text-[#788293]"></i>
        <span className="text-[#606a7b]">Thêm bác sĩ</span>
      </div>

      <div className="bg-white rounded-[7px] border border-[#e8e9ed] shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="px-[30px] pt-[35px] pb-[27px]">
          <div className="flex items-center gap-[17px]">
            <i className="fa-solid fa-user-plus text-[#0567df] text-[30px]"></i>
            <h2 className="text-[24px] text-[#075fc9] font-bold">Thông tin bác sĩ</h2>
          </div>
          <div className="h-px bg-[#dfe2e8] mt-[26px]"></div>
        </div>

        <div className="px-[30px] pb-[29px]">
          <div className="grid grid-cols-[230px_1fr] items-center min-h-[85px]">
            <label className="text-[17px] font-semibold text-[#172033]">
              Họ và tên <span className="text-[#ed2024] ml-[3px]">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Nhập họ và tên"
              className="w-full h-[57px] border border-[#d4d8df] rounded-lg px-4 text-[16px] outline-none transition-all duration-200 focus:border-[#146be3] focus:shadow-[0_0_0_3px_rgba(20,107,227,0.1)] placeholder:text-[#858d9c]"
            />
          </div>

          <div className="grid grid-cols-[230px_1fr] items-center min-h-[85px]">
            <label className="text-[17px] font-semibold text-[#172033]">
              Chuyên khoa <span className="text-[#ed2024] ml-[3px]">*</span>
            </label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              placeholder="Nhập chuyên khoa (Ví dụ: Tim mạch, Nhi, Nội...)"
              className="w-full h-[57px] border border-[#d4d8df] rounded-lg px-4 text-[16px] outline-none transition-all duration-200 focus:border-[#146be3] focus:shadow-[0_0_0_3px_rgba(20,107,227,0.1)] placeholder:text-[#858d9c]"
            />
          </div>

          <div className="grid grid-cols-[230px_1fr] items-center min-h-[85px]">
            <label className="text-[17px] font-semibold text-[#172033]">
              Số điện thoại
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Nhập số điện thoại"
              className="w-full h-[57px] border border-[#d4d8df] rounded-lg px-4 text-[16px] outline-none transition-all duration-200 focus:border-[#146be3] focus:shadow-[0_0_0_3px_rgba(20,107,227,0.1)] placeholder:text-[#858d9c]"
            />
          </div>

          <div className="grid grid-cols-[230px_1fr] items-center min-h-[85px]">
            <label className="text-[17px] font-semibold text-[#172033]">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email"
              className="w-full h-[57px] border border-[#d4d8df] rounded-lg px-4 text-[16px] outline-none transition-all duration-200 focus:border-[#146be3] focus:shadow-[0_0_0_3px_rgba(20,107,227,0.1)] placeholder:text-[#858d9c]"
            />
          </div>

          <div className="grid grid-cols-[230px_1fr] items-center min-h-[85px]">
            <label className="text-[17px] font-semibold text-[#172033]">
              Khoa <span className="text-[#ed2024] ml-[3px]">*</span>
            </label>
            <div className="relative">
              <select
                name="departmentId"
                value={formData.departmentId}
                onChange={handleChange}
                className="w-full h-[57px] border border-[#d4d8df] rounded-lg px-4 text-[16px] outline-none transition-all duration-200 focus:border-[#146be3] focus:shadow-[0_0_0_3px_rgba(20,107,227,0.1)] appearance-none cursor-pointer bg-white"
              >
                <option value="">-- Chọn khoa --</option>
                {departments.map((dept) => (
                  <option key={dept.departmentId} value={dept.departmentId}>
                    {dept.departmentName}
                  </option>
                ))}
              </select>
              <i className="fa-solid fa-chevron-down absolute right-[18px] top-1/2 -translate-y-1/2 text-[#364152] pointer-events-none text-[12px]"></i>
            </div>
          </div>

          <div className="grid grid-cols-[230px_1fr] items-center min-h-[80px]">
            <label className="text-[17px] font-semibold text-[#172033]">Trạng thái</label>
            <div className="flex items-center gap-[42px]">
              <label
                className={`flex items-center gap-3 cursor-pointer text-[17px] ${
                  formData.status === 'Active' ? 'font-normal' : 'font-normal'
                }`}
              >
                <input
                  type="radio"
                  name="status"
                  value="Active"
                  checked={formData.status === 'Active'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span
                  className={`w-[26px] h-[26px] rounded-full border-2 block relative transition-all ${
                    formData.status === 'Active'
                      ? 'border-[#0874e9]'
                      : 'border-[#c5cad3]'
                  }`}
                >
                  {formData.status === 'Active' && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-[13px] h-[13px] rounded-full bg-[#0874e9]"></span>
                    </span>
                  )}
                </span>
                <span>Active</span>
              </label>

              <label
                className={`flex items-center gap-3 cursor-pointer text-[17px] ${
                  formData.status === 'Inactive' ? 'font-normal' : 'font-normal'
                }`}
              >
                <input
                  type="radio"
                  name="status"
                  value="Inactive"
                  checked={formData.status === 'Inactive'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span
                  className={`w-[26px] h-[26px] rounded-full border-2 block relative transition-all ${
                    formData.status === 'Inactive'
                      ? 'border-[#0874e9]'
                      : 'border-[#c5cad3]'
                  }`}
                >
                  {formData.status === 'Inactive' && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="w-[13px] h-[13px] rounded-full bg-[#0874e9]"></span>
                    </span>
                  )}
                </span>
                <span>Inactive</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end min-h-[110px] px-[34px] py-6 border-t border-[#e1e4e9] gap-8">
          <button
            type="button"
            onClick={() => navigate('/doctors')}
            className="h-[56px] px-[35px] rounded-[7px] text-[17px] font-medium flex items-center justify-center gap-[17px] bg-white border border-[#d7dbe2] text-[#273449] min-w-[155px] transition-all duration-200 hover:bg-[#f5f6f8]"
          >
            <i className="fa-solid fa-xmark"></i>
            Hủy
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="h-[56px] px-[35px] rounded-[7px] text-[17px] font-medium flex items-center justify-center gap-[17px] bg-[#0869ed] border border-[#0869ed] text-white min-w-[170px] transition-all duration-200 hover:bg-[#075dd1]"
          >
            <i className="fa-regular fa-floppy-disk"></i>
            Lưu
          </button>
        </div>
      </div>
    </section>
  )
}

export default CreateDoctor