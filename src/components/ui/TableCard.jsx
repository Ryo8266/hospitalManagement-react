function TableCard({ children, pagination, minWidth = "1000px", bordered = true }) {
  return (
    <div
      className={
        bordered
          ? "bg-white rounded-xl border border-[#e5e7eb] overflow-hidden"
          : "bg-white overflow-hidden"
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse" style={{ minWidth }}>
          {children}
        </table>
      </div>
      {pagination}
    </div>
  );
}

export default TableCard;
