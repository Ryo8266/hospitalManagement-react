import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { path: "#", label: "Dashboard", icon: "fa-solid fa-house" },
  { path: "/departments", label: "Quản lý khoa", icon: "fa-solid fa-building" },
  {
    path: "/doctors",
    label: "Quản lý bác sĩ",
    icon: "fa-solid fa-user-doctor",
  },
  { path: "#", label: "Quản lý bệnh nhân", icon: "fa-solid fa-users" },
  { path: "#", label: "Quản lý phòng khám", icon: "fa-solid fa-hospital" },
  { path: "#", label: "Quản lý lịch khám", icon: "fa-solid fa-calendar-days" },
  { path: "#", label: "Quản lý thuốc", icon: "fa-solid fa-capsules" },
  { path: "#", label: "Quản lý hóa đơn", icon: "fa-solid fa-file-invoice" },
  { path: "#", label: "Thống kê", icon: "fa-solid fa-chart-column" },
];

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-[260px] bg-[#0f4ba8] text-white flex flex-col">
      <div className="flex items-center gap-4 py-7 px-6 border-b border-white/15">
        <div className="w-12 h-12 rounded-xl bg-white text-[#0f4ba8] flex items-center justify-center text-2xl">
          <i className="fa-solid fa-plus"></i>
        </div>
        <div>
          <h2 className="text-2xl font-bold">HOSPITAL</h2>
          <p className="text-xs opacity-85">MANAGEMENT SYSTEM</p>
        </div>
      </div>

      <ul className="p-5 flex-1">
        {menuItems.map((item) => (
          <li key={item.label} className="mb-2">
            <Link
              to={item.path}
              className={`flex items-center gap-4 py-3.5 px-4.5 rounded-xl transition-all duration-300 text-[15px] ${
                location.pathname === item.path
                  ? "bg-white text-[#0f4ba8] font-semibold"
                  : "hover:bg-white/15"
              }`}
            >
              <i className={`${item.icon} w-5 text-center`}></i>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="p-5 border-t border-white/15">
        <a
          href="#"
          className="flex items-center gap-4 py-3.5 px-4 rounded-xl transition-all duration-300 hover:bg-white/15"
        >
          <i className="fa-solid fa-right-from-bracket w-5 text-center"></i>
          Đăng xuất
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;
