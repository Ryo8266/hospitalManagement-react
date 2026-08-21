import { Link } from "react-router-dom";
import { btnSecondary } from "./styles";

function PageHeader({ title, backTo, backLabel = "Quay lại danh sách", children }) {
  return (
    <div className="flex justify-between items-center gap-4 mb-6">
      <h1 className="text-[24px] font-bold text-[#1f2937]">{title}</h1>
      <div className="flex items-center gap-3">
        {backTo && (
          <Link to={backTo} className={btnSecondary}>
            <i className="fa-solid fa-arrow-left"></i>
            {backLabel}
          </Link>
        )}
        {children}
      </div>
    </div>
  );
}

export default PageHeader;
