import { useLocation } from 'react-router-dom'

const MODULES = {
  departments: {
    base: 'Quản lý khoa',
    create: 'Thêm khoa',
    detail: 'Chi tiết khoa',
    edit: 'Sửa khoa',
  },
  doctors: {
    base: 'Quản lý bác sĩ',
    create: 'Thêm bác sĩ',
    detail: 'Chi tiết bác sĩ',
    edit: 'Cập nhật bác sĩ',
  },
  patients: {
    base: 'Quản lý bệnh nhân',
    create: 'Thêm bệnh nhân',
    detail: 'Chi tiết bệnh nhân',
    edit: 'Chỉnh sửa bệnh nhân',
  },
  rooms: {
    base: 'Quản lý phòng khám',
    create: 'Thêm phòng khám',
    detail: 'Chi tiết phòng khám',
    edit: 'Cập nhật trạng thái phòng',
  },
  appointments: {
    base: 'Quản lý lịch khám',
    create: 'Đặt lịch khám',
    detail: 'Chi tiết lịch khám',
    edit: 'Cập nhật chẩn đoán',
    editSegment: 'diagnosis',
  },
}

function resolveTitle(pathname) {
  const [module, second, third] = pathname.split('/').filter(Boolean)
  const titles = MODULES[module]

  if (!titles) return 'Quản lý khoa'
  if (!second) return titles.base
  if (second === 'create') return titles.create
  if (third === (titles.editSegment || 'edit')) return titles.edit
  return titles.detail
}

function Header() {
  const location = useLocation()
  const title = resolveTitle(location.pathname)

  return (
    <header className="h-[72px] bg-white flex justify-between items-center px-8 border-b border-[#e6e8ef]">
      <div className="flex items-center gap-5">
        <button className="text-[20px] text-[#4b5563]">
          <i className="fa-solid fa-bars"></i>
        </button>
        <h2 className="text-[22px] font-bold text-[#1f2937]">{title}</h2>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative text-[19px] text-[#4b5563]">
          <i className="fa-regular fa-bell"></i>
          <span className="absolute -top-2 -right-2.5 w-[18px] h-[18px] rounded-full bg-[#ef4444] text-white flex items-center justify-center text-[10px] font-semibold">
            3
          </span>
        </div>

        <div className="w-px h-7 bg-[#e5e7eb]"></div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#e5e7eb] text-[#6b7280] flex items-center justify-center text-[18px]">
            <i className="fa-solid fa-user"></i>
          </div>
          <span className="text-[15px] font-semibold text-[#1f2937]">Admin</span>
          <i className="fa-solid fa-chevron-down text-[12px] text-[#6b7280]"></i>
        </div>
      </div>
    </header>
  )
}

export default Header
