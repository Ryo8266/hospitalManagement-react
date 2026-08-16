import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

function CreateRoom() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    roomNumber: "",
    roomType: "",
    departmentId: "",
    status: "Available",
  });

  const fetchDepartments = async () => {
    try {
      const res = await api.get("/departments");
      setDepartments(res.data);
    } catch {
      console.log("Lỗi khi lấy danh sách khoa");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.roomNumber || !formData.roomType || !formData.departmentId) {
      alert("Chưa đầy đủ thông tin");
      return;
    }

    try {
      await api.post("/rooms", {
        ...formData,
        departmentId: Number(formData.departmentId),
      });
      alert("Thêm phòng khám thành công");
      navigate("/rooms");
    } catch {
      alert("Thêm phòng khám thất bại");
    }
  };

  return (
    <section className="p-[34px] px-[27px] flex-1">
      <div className="flex items-center gap-3 mb-[31px] text-[16px]">
        <Link to="/rooms" className="text-[#075fc9] font-medium">Quản lý phòng khám</Link>
        <i className="fa-solid fa-chevron-right text-[12px] text-[#788293]"></i>
        <Link to="/rooms" className="text-[#075fc9] font-medium">Danh sách phòng khám</Link>
        <i className="fa-solid fa-chevron-right text-[12px] text-[#788293]"></i>
        <span className="text-[#606a7b]">Thêm phòng khám</span>
      </div>

      <div className="bg-white rounded-[7px] border border-[#e8e9ed] shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="px-[30px] pt-[35px] pb-[27px] border-b border-[#eee]">
          <h3 className="text-[#1565c0] text-[30px] inline-block border-b-[3px] border-[#1565c0] pb-3">
            Thông tin phòng khám
          </h3>
        </div>

        <div className="px-[30px] pb-[29px]">
          <div className="grid grid-cols-2 gap-[30px] mb-[20px]">
            <div>
              <label className="block mb-[8px] text-[15px] font-medium text-[#333]">
                Số phòng <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                placeholder="Nhập số phòng (ví dụ: P.101)"
                className="w-full h-[46px] border border-[#d9dee7] rounded px-[12px] text-[14px] outline-none transition-all duration-200 focus:border-[#146be3]"
              />
            </div>
            <div>
              <label className="block mb-[8px] text-[15px] font-medium text-[#333]">
                Loại phòng <span className="text-red-500">*</span>
              </label>
              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                className="w-full h-[46px] border border-[#d9dee7] rounded px-[12px] text-[14px] outline-none transition-all duration-200 focus:border-[#146be3] bg-white cursor-pointer"
              >
                <option value="">-- Chọn loại phòng --</option>
                <option value="Khám">Khám</option>
                <option value="Phẫu thuật">Phẫu thuật</option>
                <option value="Cấp cứu">Cấp cứu</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[30px] mb-[20px]">
            <div>
              <label className="block mb-[8px] text-[15px] font-medium text-[#333]">
                Khoa <span className="text-red-500">*</span>
              </label>
              <select
                name="departmentId"
                value={formData.departmentId}
                onChange={handleChange}
                className="w-full h-[46px] border border-[#d9dee7] rounded px-[12px] text-[14px] outline-none transition-all duration-200 focus:border-[#146be3] bg-white cursor-pointer"
              >
                <option value="">-- Chọn khoa --</option>
                {departments.map((dept) => (
                  <option key={dept.departmentId} value={dept.departmentId}>
                    {dept.departmentName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-[8px] text-[15px] font-medium text-[#333]">
                Trạng thái <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full h-[46px] border border-[#d9dee7] rounded px-[12px] text-[14px] outline-none transition-all duration-200 focus:border-[#146be3] bg-white cursor-pointer"
              >
                <option value="Available">Available (Trống)</option>
                <option value="Occupied">Occupied (Đang sử dụng)</option>
                <option value="Maintenance">Maintenance (Bảo trì)</option>
              </select>
            </div>
          </div>

          <div className="p-[18px] bg-[#f0f7ff] rounded border border-[#cce5ff]">
            <h4 className="text-[15px] font-semibold text-[#075fc9] mb-[12px] flex items-center gap-[8px]">
              <i className="fa-solid fa-circle-info"></i>
              Ghi chú trạng thái:
            </h4>
            <ul className="list-none space-y-[8px] text-[14px]">
              <li className="flex items-center gap-[8px]">
                <span className="w-[10px] h-[10px] rounded-full bg-[#198754] inline-block"></span>
                <strong className="text-[#198754]">Available:</strong>
                <span className="text-[#6c757d]">Phòng trống, sẵn sàng sử dụng</span>
              </li>
              <li className="flex items-center gap-[8px]">
                <span className="w-[10px] h-[10px] rounded-full bg-[#fd7e14] inline-block"></span>
                <strong className="text-[#fd7e14]">Occupied:</strong>
                <span className="text-[#6c757d]">Phòng đang được sử dụng</span>
              </li>
              <li className="flex items-center gap-[8px]">
                <span className="w-[10px] h-[10px] rounded-full bg-[#dc3545] inline-block"></span>
                <strong className="text-[#dc3545]">Maintenance:</strong>
                <span className="text-[#6c757d]">Phòng đang bảo trì, không sử dụng</span>
              </li>
            </ul>
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
          Lưu phòng khám
        </button>
      </div>
    </section>
  );
}

export default CreateRoom;