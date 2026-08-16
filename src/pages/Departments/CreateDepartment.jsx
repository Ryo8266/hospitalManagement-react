import {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import api from '../../services/api'

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
        if (!formData.departmentName) {
            alert('Chưa đầy đủ thông tin')
            return
        }

        try {
            await api.post('/departments', formData)
            navigate('/departments')
        } catch {
            alert('Thêm thất bại')
        }
    }

    return (
        <section className="p-8 flex-1">
            <div className="flex items-center gap-2.5 py-6 px-10 text-lg">
                <Link to="/departments" className="text-[#1565c0]">Quản lý khoa</Link>
                <span className="text-[#6b7280]">{'>'}</span>
                <span>Thêm khoa</span>
            </div>

            <div className="bg-white mx-8 rounded-lg shadow-sm overflow-hidden">
                <div className="py-6 px-9 border-b border-[#eee]">
                    <h3 className="text-[#1565c0] text-[30px] inline-block border-b-[3px] border-[#1565c0] pb-3">
                        Thông tin khoa
                    </h3>
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="p-9">
                    <div className="grid grid-cols-[220px_1fr] gap-5 mb-9 items-start">
                        <label className="text-[22px] mt-[15px]">
                            Tên khoa <span className="text-red-500">*</span>
                        </label>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                name="departmentName"
                                value={formData.departmentName}
                                onChange={handleChange}
                                placeholder="Nhập tên khoa"
                                className="h-[55px] border border-[#d7d7d7] rounded-md px-4.5 text-lg transition-all duration-300 focus:border-[#1976f3] focus:shadow-[0_0_4px_rgba(25,118,243,0.25)] outline-none"
                            />
                            <small className="mt-2.5 text-[#666]">Tên khoa là bắt buộc và phải duy nhất.</small>
                        </div>
                    </div>

                    <div className="grid grid-cols-[220px_1fr] gap-5 mb-9 items-start">
                        <label className="text-[22px] mt-[15px]">Số điện thoại</label>
                        <div className="flex flex-col">
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Nhập số điện thoại"
                                className="h-[55px] border border-[#d7d7d7] rounded-md px-4.5 text-lg transition-all duration-300 focus:border-[#1976f3] focus:shadow-[0_0_4px_rgba(25,118,243,0.25)] outline-none"
                            />
                            <small className="mt-2.5 text-[#666]">Nhập số điện thoại liên hệ của khoa.</small>
                        </div>
                    </div>

                    <div className="grid grid-cols-[220px_1fr] gap-5 mb-9 items-start">
                        <label className="text-[22px] mt-[15px]">Mô tả</label>
                        <div className="flex flex-col">
              <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Nhập mô tả chức năng của khoa"
                  className="h-[140px] border border-[#d7d7d7] rounded-md p-4.5 text-lg resize-none transition-all duration-300 focus:border-[#1976f3] focus:shadow-[0_0_4px_rgba(25,118,243,0.25)] outline-none"
              ></textarea>
                            <small className="mt-2.5 text-[#666]">Mô tả chức năng và nhiệm vụ của khoa.</small>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 border-t border-[#eee] pt-6">
                        <button
                            type="button"
                            onClick={() => navigate('/departments')}
                            className="flex items-center gap-2 px-8 py-3.5 bg-white border border-[#ccc] rounded-md text-lg hover:bg-[#f5f5f5]"
                        >
                            <i className="fa-solid fa-xmark"></i>
                            Hủy bỏ
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="flex items-center gap-2 px-9 py-3.5 bg-[#1565c0] text-white rounded-md text-lg hover:bg-[#0f55a4]"
                        >
                            <i className="fa-regular fa-floppy-disk"></i>
                            Lưu
                        </button>
                    </div>
                </form>
            </div>

            <footer className="mt-auto py-8 text-center text-[#666] text-[15px]">
                © 2024 Hospital Management System. All rights reserved.
            </footer>
        </section>
    )
}

export default CreateDepartment