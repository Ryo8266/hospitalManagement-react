import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

function UpdateRoomStatus() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const fetchRoom = async () => {
    try {
      const res = await api.get("/rooms");
      const found = res.data.find((r) => r.id === Number(id));
      if (found) {
        setRoom(found);
        setNewStatus(found.status);
      }
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

    if (
      !["Available", "Occupied", "Maintenance"].includes(newStatus)
    ) {
      alert("Trạng thái không hợp lệ");
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

  const statusBadge = (status) => {
    switch (status) {
      case "Available":
        return "text-[#1f9254] bg-[#e8f8ef]";
      case "Occupied":
        return "text-[#b45309] bg-[#fef3c7]";
      case "Maintenance":
        return "text-[#d14343] bg-[#ffe9e9]";
      default:
        return "text-[#2563eb] bg-[#dbeafe]";
    }
  };

  const statusLabel = (status) => {
    switch (status) {
      case "Available":
        return "Trống";
      case "Occupied":
        return "Đang sử dụng";
      case "Maintenance":
        return "Bảo trì";
      default:
        return status;
    }
  };

  if (!room) {
    return (
      <section className="p-[34px] px-[27px] flex-1 flex items-center justify-center">
        <p className="text-[16px] text-[#666]">Đang tải...</p>
      </section>
    );
  }

  return (
    <section className="p-[34px] px-[27px] flex-1">
      <div className="flex items-center gap-3 mb-[31px] text-[16px]">
        <Link to="/rooms" className="text-[#075fc9] font-medium">Quản lý phòng khám</Link>
        <i className="fa-solid fa-chevron-right text-[12px] text-[#788293]"></i>
        <Link to="/rooms" className="text-[#075fc9] font-medium">Danh sách phòng khám</Link>
        <i className="fa-solid fa-chevron-right text-[12px] text-[#788293]"></i>
        <span className="text-[#606a7b]">Cập nhật trạng thái phòng</span>
      </div>

      <div className="bg-white rounded-[7px] border border-[#e8e9ed] shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden mb-[20px]">
        <div className="px-[30px] pt-[35px] pb-[27px] border-b border-[#eee]">
          <h3 className="text-[#1565c0] text-[30px] inline-block border-b-[3px] border-[#1565c0] pb-3">
            Thông tin phòng khám
          </h3>
        </div>

        <div className="px-[30px] pb-[29px]">
          <div className="grid grid-cols-4 gap-[20px]">
            <div>
              <div className="text-[14px] text-[#6c757d] mb-[6px]">Số phòng</div>
              <div className="text-[16px] font-medium text-[#172033]">{room.roomNumber}</div>
            </div>
            <div>
              <div className="text-[14px] text-[#6c757d] mb-[6px]">Loại phòng</div>
              <div className="text-[16px] font-medium text-[#172033]">{room.roomType}</div>
            </div>
            <div>
              <div className="text-[14px] text-[#6c757d] mb-[6px]">Khoa</div>
              <div className="text-[16px] font-medium text-[#172033]">{room.departmentName}</div>
            </div>
            <div>
              <div className="text-[14px] text-[#6c757d] mb-[6px]">Trạng thái hiện tại</div>
              <span className={`inline-block px-[12px] py-[5px] rounded-[20px] text-[13px] font-semibold ${statusBadge(room.status)}`}>
                {statusLabel(room.status)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[7px] border border-[#e8e9ed] shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="px-[30px] pt-[35px] pb-[27px] border-b border-[#eee]">
          <h3 className="text-[#1565c0] text-[30px] inline-block border-b-[3px] border-[#1565c0] pb-3">
            Cập nhật trạng thái
          </h3>
        </div>

        <div className="px-[30px] pb-[29px]">
          <div className="grid grid-cols-2 gap-[30px] mb-[20px]">
            <div>
              <label className="block mb-[8px] text-[15px] font-medium text-[#333]">
                Trạng thái mới <span className="text-red-500">*</span>
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full h-[46px] border border-[#d9dee7] rounded px-[12px] text-[14px] outline-none transition-all duration-200 focus:border-[#146be3] bg-white cursor-pointer"
              >
                <option value="">-- Chọn trạng thái --</option>
                <option value="Available">Available (Trống)</option>
                <option value="Occupied">Occupied (Đang sử dụng)</option>
                <option value="Maintenance">Maintenance (Bảo trì)</option>
              </select>

              <ul className="list-none mt-[15px] p-[15px] bg-[#fafafa] rounded border border-[#eee] space-y-[8px] text-[14px]">
                <li className="flex items-center gap-[8px]">
                  <span className="w-[10px] h-[10px] rounded-full bg-[#198754] inline-block"></span>
                  <strong className="text-[#198754]">Available:</strong>
                  <span className="text-[#6c757d] ml-[10px]">Phòng trống, sẵn sàng sử dụng</span>
                </li>
                <li className="flex items-center gap-[8px]">
                  <span className="w-[10px] h-[10px] rounded-full bg-[#fd7e14] inline-block"></span>
                  <strong className="text-[#fd7e14]">Occupied:</strong>
                  <span className="text-[#6c757d] ml-[10px]">Phòng đang được sử dụng</span>
                </li>
                <li className="flex items-center gap-[8px]">
                  <span className="w-[10px] h-[10px] rounded-full bg-[#dc3545] inline-block"></span>
                  <strong className="text-[#dc3545]">Maintenance:</strong>
                  <span className="text-[#6c757d] ml-[10px]">Phòng đang bảo trì, không sử dụng</span>
                </li>
              </ul>
            </div>
            <div>
              <label className="block mb-[8px] text-[15px] font-medium text-[#333]">
                Ghi chú (nếu có)
              </label>
              <textarea
                placeholder="Nhập ghi chú..."
                className="w-full h-[100px] border border-[#d9dee7] rounded px-[12px] py-[10px] text-[14px] outline-none transition-all duration-200 focus:border-[#146be3] resize-none"
              ></textarea>
              <div className="text-right text-[12px] text-[#adb5bd] mt-[5px]">0/255</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-[15px] mt-[20px]">
        <button
          type="button"
          onClick={() => navigate("/rooms")}
          className="h-[46px] px-[25px] rounded text-[15px] font-medium flex items-center justify-center gap-[10px] bg-white border border-[#d7dbe2] text-[#333] transition-all duration-200 hover:bg-[#f5f6f8]"
        >
          <i className="fa-solid fa-xmark"></i>
          Hủy
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="h-[46px] px-[25px] rounded text-[15px] font-medium flex items-center justify-center gap-[10px] bg-[#0d6efd] text-white transition-all duration-200 hover:bg-[#0b5ed7]"
        >
          <i className="fa-regular fa-floppy-disk"></i>
          Cập nhật trạng thái
        </button>
      </div>
    </section>
  );
}

export default UpdateRoomStatus;