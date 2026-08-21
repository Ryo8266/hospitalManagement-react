const btn =
  "w-9 h-9 inline-flex items-center justify-center rounded-lg border border-[#e5e7eb] bg-white text-[14px] text-[#374151] transition-colors hover:bg-[#f3f4f6] disabled:opacity-40 disabled:cursor-not-allowed";

function Pagination({ page, pageSize, total, unit = "bản ghi", onChange }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="flex items-center justify-between gap-4 px-5 py-4 border-t border-[#f0f2f5]">
      <span className="text-[14px] text-[#6b7280]">
        Hiển thị {from} - {to} của {total} {unit}
      </span>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className={btn}
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
        >
          <i className="fa-solid fa-chevron-left text-[12px]"></i>
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={
              p === page
                ? "w-9 h-9 inline-flex items-center justify-center rounded-lg bg-[#1a6cf0] text-white text-[14px] font-semibold"
                : btn
            }
          >
            {p}
          </button>
        ))}

        <button
          type="button"
          className={btn}
          disabled={page >= totalPages}
          onClick={() => onChange(page + 1)}
        >
          <i className="fa-solid fa-chevron-right text-[12px]"></i>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
