import { btnPrimary, btnSecondary } from "./styles";

export function Toolbar({ children }) {
  return (
    <div className="bg-white rounded-xl border border-[#e5e7eb] p-5 mb-6 flex items-end gap-4 flex-wrap">
      {children}
    </div>
  );
}

export function ToolbarField({ label, className = "w-[220px]", children }) {
  return (
    <div className={className}>
      {label && (
        <label className="block mb-2 text-[14px] font-medium text-[#374151]">
          {label}
        </label>
      )}
      {children}
    </div>
  );
}

export function SearchInput({ value, onChange, placeholder, onEnter }) {
  return (
    <div className="flex-1 min-w-[260px] h-11 flex items-center rounded-lg border border-[#d1d5db] px-3 focus-within:border-[#2563eb] transition-colors">
      <i className="fa-solid fa-magnifying-glass text-[#9ca3af] text-[14px]"></i>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onEnter?.()}
        placeholder={placeholder}
        className="flex-1 ml-3 border-none outline-none text-[14px] bg-transparent placeholder:text-[#9ca3af]"
      />
    </div>
  );
}

export function SearchButton({ onClick }) {
  return (
    <button type="button" onClick={onClick} className={btnPrimary}>
      <i className="fa-solid fa-magnifying-glass"></i>
      Tìm kiếm
    </button>
  );
}

export function RefreshButton({ onClick }) {
  return (
    <button type="button" onClick={onClick} className={btnSecondary}>
      <i className="fa-solid fa-rotate-right"></i>
      Làm mới
    </button>
  );
}
