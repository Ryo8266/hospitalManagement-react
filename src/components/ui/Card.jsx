function Card({ title, extra, footer, children, className = "", bodyClassName = "p-6" }) {
  return (
    <div className={`bg-white rounded-xl border border-[#e5e7eb] ${className}`}>
      {title && (
        <div className="px-6 py-5 border-b border-[#eef1f5] flex items-center justify-between gap-4">
          <h2 className="text-[18px] font-semibold text-[#1f2937]">{title}</h2>
          {extra}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
      {footer && (
        <div className="px-6 py-5 border-t border-[#eef1f5] flex justify-end gap-3">
          {footer}
        </div>
      )}
    </div>
  );
}

export function CardSection({ title, children, className = "" }) {
  return (
    <div className={`px-6 py-5 border-b border-[#eef1f5] ${className}`}>
      {title && (
        <h2 className="text-[18px] font-semibold text-[#1f2937] mb-5">{title}</h2>
      )}
      {children}
    </div>
  );
}

export default Card;
