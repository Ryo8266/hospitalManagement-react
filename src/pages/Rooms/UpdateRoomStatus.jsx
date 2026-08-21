import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import PageHeader from "../../components/ui/PageHeader";
import { CardSection } from "../../components/ui/Card";
import StatusBadge from "../../components/ui/StatusBadge";
import { ROOM_STATUSES } from "./StatusLegend";
import { btnPrimary, btnSecondary, textareaClass } from "../../components/ui/styles";

const NOTE_LIMIT = 255;

function StatusSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const selected = ROOM_STATUSES.find((s) => s.value === value);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`w-full h-11 rounded-lg border px-3 text-[14px] flex items-center justify-between bg-white transition-colors ${
          open ? "border-[#2563eb]" : "border-[#d1d5db]"
        }`}
      >
        {selected ? (
          <span className="flex items-center gap-2.5">
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ backgroundColor: selected.color }}
            ></span>
            <span className="font-medium" style={{ color: selected.color }}>
              {selected.value}
            </span>
          </span>
        ) : (
          <span className="text-[#9ca3af]">-- Chọn trạng thái --</span>
        )}
        <i className="fa-solid fa-chevron-down text-[12px] text-[#6b7280]"></i>
      </button>

      {open && (
        <ul className="absolute z-10 left-0 right-0 mt-1.5 bg-white rounded-lg border border-[#e5e7eb] shadow-[0_10px_25px_rgba(0,0,0,0.08)] overflow-hidden">
          {ROOM_STATUSES.map((status) => (
            <li key={status.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(status.value);
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-[14px] transition-colors hover:bg-[#f5f7fb]"
              >
                <span
                  className="w-2 h-2 rounded-full inline-block shrink-0"
                  style={{ backgroundColor: status.color }}
                ></span>
                <span className="font-semibold w-[110px]" style={{ color: status.color }}>
                  {status.value}
                </span>
                <span className="text-[#4b5563]">{status.description}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function UpdateRoomStatus() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [note, setNote] = useState("");

  const fetchRoom = async () => {
    try {
      const res = await api.get(`/rooms/${id}`);
      setRoom(res.data);
      setNewStatus(res.data.status);
    } catch {
      console.log("Lỗi khi lấy dữ liệu phòng");
    }
  };

  useEffect(() => {
    fetchRoom();
  }, [id]);

  const handleSubmit = async () => {
    if (!newStatus) {
      alert("Vui lòng chọn trạng thái");
      return;
    }

    try {
      await api.put(`/rooms/${id}/status`, { status: newStatus });
      alert("Cập nhật trạng thái thành công");
      navigate("/rooms");
    } catch {
      alert("Cập nhật thất bại");
    }
  };

  if (!room) {
    return (
      <section className="p-8 flex-1 flex items-center justify-center">
        <p className="text-[15px] text-[#6b7280]">Đang tải...</p>
      </section>
    );
  }

  return (
    <section className="p-8 flex-1">
      <PageHeader title="Cập nhật trạng thái phòng" backTo="/rooms" />

      <div className="bg-white rounded-xl border border-[#e5e7eb]">
        <CardSection title="Thông tin phòng khám">
          <div className="grid grid-cols-4 gap-6">
            <div>
              <div className="text-[14px] text-[#6b7280] mb-1.5">Số phòng</div>
              <div className="text-[15px] font-medium text-[#1f2937]">{room.roomNumber}</div>
            </div>
            <div>
              <div className="text-[14px] text-[#6b7280] mb-1.5">Loại phòng</div>
              <div className="text-[15px] font-medium text-[#1f2937]">{room.roomType}</div>
            </div>
            <div>
              <div className="text-[14px] text-[#6b7280] mb-1.5">Khoa</div>
              <div className="text-[15px] font-medium text-[#1f2937]">{room.departmentName}</div>
            </div>
            <div>
              <div className="text-[14px] text-[#6b7280] mb-1.5">Trạng thái hiện tại</div>
              <StatusBadge status={room.status} />
            </div>
          </div>
        </CardSection>

        <CardSection title="Cập nhật trạng thái">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="block mb-2 text-[14px] font-medium text-[#374151]">
                Trạng thái mới<span className="text-[#ef4444] ml-1">*</span>
              </label>
              <StatusSelect value={newStatus} onChange={setNewStatus} />
            </div>

            <div>
              <label className="block mb-2 text-[14px] font-medium text-[#374151]">
                Ghi chú (nếu có)
              </label>
              <textarea
                value={note}
                maxLength={NOTE_LIMIT}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Nhập ghi chú..."
                className={`${textareaClass} h-[150px]`}
              ></textarea>
              <div className="text-right text-[12px] text-[#9ca3af] mt-1">
                {note.length}/{NOTE_LIMIT}
              </div>
            </div>
          </div>
        </CardSection>

        <div className="px-6 py-5 flex justify-end gap-3">
          <button type="button" onClick={() => navigate("/rooms")} className={btnSecondary}>
            <i className="fa-solid fa-xmark"></i>
            Hủy
          </button>
          <button type="button" onClick={handleSubmit} className={btnPrimary}>
            <i className="fa-regular fa-floppy-disk"></i>
            Cập nhật trạng thái
          </button>
        </div>
      </div>
    </section>
  );
}

export default UpdateRoomStatus;
