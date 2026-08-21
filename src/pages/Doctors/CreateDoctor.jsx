import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import FormField from '../../components/ui/FormField'
import StatusRadioGroup from './StatusRadioGroup'
import { btnPrimary, btnSecondary, inputClass, selectClass } from '../../components/ui/styles'

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
      await api.post('/doctors', {
        ...formData,
        departmentId: Number(formData.departmentId),
      })
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
    <section className="p-8 flex-1">
      <PageHeader title="Thêm bác sĩ" backTo="/doctors" />

      <Card
        title="Thông tin bác sĩ"
        footer={
          <>
            <button type="button" onClick={() => navigate('/doctors')} className={btnSecondary}>
              <i className="fa-solid fa-xmark"></i>
              Hủy
            </button>
            <button type="button" onClick={handleSubmit} className={btnPrimary}>
              <i className="fa-regular fa-floppy-disk"></i>
              Lưu
            </button>
          </>
        }
      >
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          <FormField label="Họ và tên" required>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Nhập họ và tên"
              className={inputClass}
            />
          </FormField>

          <FormField label="Chuyên khoa" required>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              placeholder="Nhập chuyên khoa (Ví dụ: Tim mạch, Nhi, Nội...)"
              className={inputClass}
            />
          </FormField>

          <FormField label="Số điện thoại">
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Nhập số điện thoại"
              className={inputClass}
            />
          </FormField>

          <FormField label="Email">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email"
              className={inputClass}
            />
          </FormField>

          <FormField label="Khoa" required>
            <select
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="">-- Chọn khoa --</option>
              {departments.map((dept) => (
                <option key={dept.departmentId} value={dept.departmentId}>
                  {dept.departmentName}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Trạng thái">
            <StatusRadioGroup
              value={formData.status}
              onChange={(status) => setFormData({ ...formData, status })}
            />
          </FormField>
        </div>
      </Card>
    </section>
  )
}

export default CreateDoctor
