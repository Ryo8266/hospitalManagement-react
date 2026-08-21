import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { path: "#", label: "Dashboard", icon: "fa-solid fa-house" },
  { path: "/departments", label: "Quản lý khoa", icon: "fa-solid fa-building" },
  { path: "/doctors", label: "Quản lý bác sĩ", icon: "fa-solid fa-user-doctor" },
  { path: "/patients", label: "Quản lý bệnh nhân", icon: "fa-solid fa-users" },
  { path: "/rooms", label: "Quản lý phòng khám", icon: "fa-solid fa-hospital" },
  { path: "/appointments", label: "Quản lý lịch khám", icon: "fa-solid fa-calendar-days" },
  { path: "#", label: "Quản lý bệnh", icon: "fa-solid fa-stethoscope" },
  { path: "#", label: "Quản lý thuốc", icon: "fa-solid fa-capsules" },
  { path: "#", label: "Quản lý hóa đơn", icon: "fa-solid fa-file-invoice" },
  { path: "#", label: "Thống kê", icon: "fa-solid fa-chart-column", hasChildren: true },
];

function Sidebar() {
  const location = useLocation();

  const isActive = (path) =>
    path !== "#" && (location.pathname === path || location.pathname.startsWith(`${path}/`));

  const itemClass = (active) =>
    `flex items-center gap-3.5 py-3 px-4 rounded-lg transition-colors text-[15px] whitespace-nowrap ${
      active ? "bg-[#1a6cf0] text-white font-semibold" : "text-[#dbe4f0] hover:bg-white/10"
    }`;

  return (
    <aside className="w-[240px] shrink-0 bg-[#0b2a52] flex flex-col">
      <div className="flex items-center gap-3.5 py-6 px-5">
        <div className="w-11 h-11 rounded-xl bg-[#1a6cf0] text-white flex items-center justify-center text-[22px]">
          <i className="fa-solid fa-plus"></i>
        </div>
        <div>
          <h2 className="text-[20px] font-bold text-white leading-tight">HOSPITAL</h2>
          <p className="text-[10px] tracking-wide text-[#9db4d4]">MANAGEMENT SYSTEM</p>
        </div>
      </div>

      <ul className="px-3 flex-1">
        {menuItems.map((item) => (
          <li key={item.label} className="mb-1">
            <Link to={item.path} className={itemClass(isActive(item.path))}>
              <i className={`${item.icon} w-5 text-center`}></i>
              <span className="flex-1">{item.label}</span>
              {item.hasChildren && (
                <i className="fa-solid fa-chevron-down text-[11px] opacity-70"></i>
              )}
            </Link>
          </li>
        ))}
      </ul>

      <div className="px-3 py-4 border-t border-white/10">
        <a href="#" className={itemClass(false)}>
          <i className="fa-solid fa-gear w-5 text-center"></i>
          Cài đặt
        </a>
        <a href="#" className={itemClass(false)}>
          <i className="fa-solid fa-right-from-bracket w-5 text-center"></i>
          Đăng xuất
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;
