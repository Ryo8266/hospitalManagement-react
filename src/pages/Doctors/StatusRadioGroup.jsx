const OPTIONS = ["Active", "Inactive"];

function StatusRadioGroup({ value, onChange }) {
  return (
    <div className="flex items-center gap-8 h-11">
      {OPTIONS.map((option) => (
        <label key={option} className="flex items-center gap-2.5 cursor-pointer text-[14px]">
          <input
            type="radio"
            name="status"
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
            className="sr-only"
          />
          <span
            className={`w-5 h-5 rounded-full border-2 block relative transition-colors ${
              value === option ? "border-[#1a6cf0]" : "border-[#c5cad3]"
            }`}
          >
            {value === option && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1a6cf0]"></span>
              </span>
            )}
          </span>
          <span className="text-[#374151]">{option}</span>
        </label>
      ))}
    </div>
  );
}

export default StatusRadioGroup;
