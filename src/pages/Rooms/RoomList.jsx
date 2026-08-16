import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const fetchRooms = async () => {
    try {
      const res = await api.get("/rooms");
      setRooms(res.data);
    } catch {
      console.log("Lỗi");
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await api.get("/departments");
      setDepartments(res.data);
    } catch {
      console.log("Lỗi khi lấy danh sách khoa");
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchDepartments();
  }, []);

  const filteredRooms = rooms.filter((room) => {
    if (filterDepartment && room.departmentId !== Number(filterDepartment)) return false;
    if (filterStatus && room.status !== filterStatus) return false;
    return true;
  });

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

  return (
    <section className="p-8 flex-1">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-[34px] font-bold text-[#1f2937]">Danh sách phòng khám</h2>
        <Link to="/rooms/create">
          <button className="flex items-center gap-2.5 bg-[#0d6efd] text-white px-6 py-3.5 rounded-lg text-base font-semibold transition-all duration-300 hover:bg-[#0b5ed7]">
            <i className="fa-solid fa-plus text-lg"></i>
            Thêm phòng khám
          </button>
        </Link>
      </div>

      <div className="flex items-center gap-4.5 mb-8">
        <div className="flex-1 h-14 flex items-center bg-white border border-[#dfe3eb] rounded-lg px-4.5">
          <i className="fa-solid fa-magnifying-glass text-[#999] text-lg"></i>
          <input
            type="text"
            placeholder="Tìm kiếm theo số phòng hoặc loại phòng"
            className="flex-1 border-none outline-none ml-3.5 text-[15px] bg-transparent"
          />
        </div>

        <select
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
          className="w-[250px] h-14 border border-[#dfe3eb] rounded-lg px-4 text-[15px] bg-white outline-none cursor-pointer focus:border-[#0d6efd]"
        >
          <option value="">-- Tất cả khoa --</option>
          {departments.map((dept) => (
            <option key={dept.departmentId} value={dept.departmentId}>
              {dept.departmentName}
            </option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-[250px] h-14 border border-[#dfe3eb] rounded-lg px-4 text-[15px] bg-white outline-none cursor-pointer focus:border-[#0d6efd]"
        >
          <option value="">-- Tất cả trạng thái --</option>
          <option value="Available">Trống</option>
          <option value="Occupied">Đang sử dụng</option>
          <option value="Maintenance">Bảo trì</option>
        </select>

        <button className="h-14 flex items-center gap-2.5 px-7 bg-[#0d6efd] text-white rounded-lg text-base font-semibold transition-all duration-300 hover:bg-[#0b5ed7]">
          <i className="fa-solid fa-magnifying-glass text-[17px]"></i>
          Tìm kiếm
        </button>

        <button
          onClick={fetchRooms}
          className="h-14 flex items-center gap-2.5 px-7 border border-[#dfe3eb] text-[#555] rounded-lg text-base font-semibold bg-white transition-all duration-300 hover:bg-[#f5f5f5]"
        >
          <i className="fa-solid fa-rotate-right text-[17px]"></i>
          Làm mới
        </button>
      </div>

      <div className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden">
        <table className="w-full border-collapse min-w-[1200px]">
          <thead className="bg-[#f8fafc]">
            <tr>
              <th className="py-5 px-5 text-left text-[15px] font-semibold text-[#374151] border-b border-[#e5e7eb]">
                STT
              </th>
              <th className="py-5 px-5 text-left text-[15px] font-semibold text-[#374151] border-b border-[#e5e7eb]">
                Số phòng
              </th>
              <th className="py-5 px-5 text-left text-[15px] font-semibold text-[#374151] border-b border-[#e5e7eb]">
                Loại phòng
              </th>
              <th className="py-5 px-5 text-left text-[15px] font-semibold text-[#374151] border-b border-[#e5e7eb]">
                Khoa
              </th>
              <th className="py-5 px-5 text-left text-[15px] font-semibold text-[#374151] border-b border-[#e5e7eb]">
                Trạng thái
              </th>
              <th className="py-5 px-5 text-left text-[15px] font-semibold text-[#374151] border-b border-[#e5e7eb]">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRooms.map((room, index) => (
              <tr
                key={room.id}
                className="transition-all duration-250 hover:bg-[#f9fbff]"
              >
                <td className="py-5 px-5 text-[15px] border-b border-[#f0f2f5]">
                  {index + 1}
                </td>
                <td className="py-5 px-5 text-[15px] border-b border-[#f0f2f5] font-medium text-[#0d6efd]">
                  {room.roomNumber}
                </td>
                <td className="py-5 px-5 text-[15px] border-b border-[#f0f2f5]">
                  {room.roomType}
                </td>
                <td className="py-5 px-5 text-[15px] border-b border-[#f0f2f5]">
                  {room.departmentName}
                </td>
                <td className="py-5 px-5 text-[15px] border-b border-[#f0f2f5]">
                  <span
                    className={`inline-block px-3.5 py-1.5 rounded-[30px] text-[13px] font-semibold ${statusBadge(room.status)}`}
                  >
                    {statusLabel(room.status)}
                  </span>
                </td>
                <td className="py-5 px-5 text-[15px] border-b border-[#f0f2f5] whitespace-nowrap">
                  <Link to={`/rooms/${room.id}/edit`}>
                    <button className="w-10 h-10 rounded-lg border border-[#e5e7eb] text-[#f59e0b] bg-white transition-all duration-250 hover:bg-[#f59e0b] hover:text-white">
                      <i className="fa-solid fa-pen"></i>
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default RoomList;