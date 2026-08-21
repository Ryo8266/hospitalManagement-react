import { Link } from "react-router-dom";

const base =
  "w-9 h-9 inline-flex items-center justify-center rounded-lg border text-[14px] transition-colors";

function RowActions({ viewTo, editTo, onDelete }) {
  return (
    <div className="flex items-center gap-2">
      {viewTo && (
        <Link
          to={viewTo}
          title="Xem chi tiết"
          className={`${base} border-[#bfdbfe] bg-[#eff6ff] text-[#2563eb] hover:bg-[#2563eb] hover:text-white`}
        >
          <i className="fa-regular fa-eye"></i>
        </Link>
      )}
      {editTo && (
        <Link
          to={editTo}
          title="Chỉnh sửa"
          className={`${base} border-[#fde68a] bg-[#fffbeb] text-[#f59e0b] hover:bg-[#f59e0b] hover:text-white`}
        >
          <i className="fa-solid fa-pen"></i>
        </Link>
      )}
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          title="Xóa"
          className={`${base} border-[#fecaca] bg-[#fef2f2] text-[#ef4444] hover:bg-[#ef4444] hover:text-white`}
        >
          <i className="fa-regular fa-trash-can"></i>
        </button>
      )}
    </div>
  );
}

export default RowActions;
