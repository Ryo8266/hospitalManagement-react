function FormField({ label, required, hint, children, className = "" }) {
  return (
    <div className={className}>
      <label className="block mb-2 text-[14px] font-medium text-[#374151]">
        {label}
        {required && <span className="text-[#ef4444] ml-1">*</span>}
      </label>
      {children}
      {hint && <small className="block mt-1.5 text-[13px] text-[#6b7280]">{hint}</small>}
    </div>
  );
}

export default FormField;
