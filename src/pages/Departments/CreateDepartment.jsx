import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import PageHeader from '../../components/ui/PageHeader'
import Card from '../../components/ui/Card'
import FormField from '../../components/ui/FormField'
import { btnPrimary, btnSecondary, inputClass, textareaClass } from '../../components/ui/styles'

function CreateDepartment() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        departmentName: '',
        phone: '',
        description: '',
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async () => {
        if (!formData.departmentName || !formData.phone) {
            alert('Chưa đầy đủ thông tin')
            return
        }

        try {
            await api.post('/departments', formData)
            alert('Thêm khoa thành công')
            navigate('/departments')
        } catch {
            alert('Thêm thất bại')
        }
    }

    return (
        <section className="p-8 flex-1">
            <PageHeader title="Thêm khoa" backTo="/departments" />

            <Card
                title="Thông tin khoa"
                footer={
                    <>
                        <button
                            type="button"
                            onClick={() => navigate('/departments')}
                            className={btnSecondary}
                        >
                            <i className="fa-solid fa-xmark"></i>
                            Hủy bỏ
                        </button>
                        <button type="button" onClick={handleSubmit} className={btnPrimary}>
                            <i className="fa-regular fa-floppy-disk"></i>
                            Lưu
                        </button>
                    </>
                }
            >
                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    <FormField label="Tên khoa" required hint="Tên khoa là bắt buộc và phải duy nhất.">
                        <input
                            type="text"
                            name="departmentName"
                            value={formData.departmentName}
                            onChange={handleChange}
                            placeholder="Nhập tên khoa"
                            className={inputClass}
                        />
                    </FormField>

                    <FormField label="Số điện thoại" required hint="Nhập số điện thoại liên hệ của khoa.">
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Nhập số điện thoại"
                            className={inputClass}
                        />
                    </FormField>

                    <FormField
                        label="Mô tả"
                        hint="Mô tả chức năng và nhiệm vụ của khoa."
                        className="col-span-2"
                    >
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Nhập mô tả chức năng của khoa"
                            className={`${textareaClass} h-[120px]`}
                        ></textarea>
                    </FormField>
                </div>
            </Card>
        </section>
    )
}

export default CreateDepartment
