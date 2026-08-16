import { useLocation } from 'react-router-dom'

const pageTitleMap = {
  '/': 'Quản lý khoa',
  '/departments': 'Quản lý khoa',
  '/departments/create': 'Thêm khoa',
  '/departments/:id': 'Chi tiết khoa',
  '/departments/:id/edit': 'Sửa khoa',
  '/doctors': 'Quản lý bác sĩ',
  '/doctors/create': 'Thêm bác sĩ',
  '/doctors/:id': 'Chi tiết bác sĩ',
  '/doctors/:id/edit': 'Sửa bác sĩ',
  '/patients': 'Quản lý bệnh nhân',
  '/patients/create': 'Thêm bệnh nhân',
  '/patients/:id': 'Chi tiết bệnh nhân',
  '/patients/:id/edit': 'Sửa bệnh nhân',
  '/rooms': 'Quản lý phòng khám',
}

function Header() {
  const location = useLocation()
  const title = pageTitleMap[location.pathname] || 'Hospital Management'

  return (
    <header className="h-[80px] bg-white flex justify-between items-center px-[30px] border-b border-[#e6e8ef]">
      <div className="flex items-center gap-6">
        <button className="text-[25px] text-[#444]">
          <i className="fa-solid fa-bars"></i>
        </button>
        <h2 className="text-[32px] font-bold">{title}</h2>
      </div>

      <div className="flex items-center gap-[35px]">
        <div className="relative text-[22px] text-[#444]">
          <i className="fa-regular fa-bell"></i>
          <span className="absolute -top-2 -right-2.5 w-5 h-5 rounded-full bg-[#ff2d55] text-white flex items-center justify-center text-[11px] font-semibold">
            3
          </span>
        </div>

        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/42"
            alt="Admin"
            className="w-[42px] h-[42px] rounded-full object-cover"
          />
          <span className="text-[16px] font-semibold">Admin</span>
          <i className="fa-solid fa-chevron-down text-[13px] text-[#666]"></i>
        </div>
      </div>
    </header>
  )
}

export default Header