import { useLocation } from "react-router-dom";

const pageTitleMap = {
  "/": "Quản lý khoa",
  "/departments": "Quản lý khoa",
  "/departments/create": "Thêm khoa",
  "/departments/:id": "Chi tiết khoa",
  "/departments/:id/edit": "Sửa khoa",
  "/doctors": "Quản lý bác sĩ",
  "/doctors/:id": "Chi tiết bác sĩ",
};

function Header() {
  const location = useLocation();
  const title = pageTitleMap[location.pathname] || "Hospital Management";

  return (
    <header className="h-[80px] bg-white flex justify-between items-center px-8 border-b border-[#e6e8ef]">
      <div className="flex items-center gap-6">
        <button className="text-2xl text-[#444]">
          <i className="fa-solid fa-bars"></i>
        </button>
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>

      <div className="flex items-center gap-9">
        <div className="relative text-2xl text-[#444]">
          <i className="fa-regular fa-bell"></i>
          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#ff2d55] text-white flex items-center justify-center text-[11px] font-semibold">
            3
          </span>
        </div>

        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40"
            alt="Admin"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-base font-semibold">Admin</span>
          <i className="fa-solid fa-chevron-down text-sm text-[#666]"></i>
        </div>
      </div>
    </header>
  );
}

export default Header;
