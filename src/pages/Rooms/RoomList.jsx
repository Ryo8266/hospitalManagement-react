import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import PageHeader from "../../components/ui/PageHeader";
import TableCard from "../../components/ui/TableCard";
import Pagination from "../../components/ui/Pagination";
import StatusBadge from "../../components/ui/StatusBadge";
import RowActions from "../../components/ui/RowActions";
import {
  Toolbar,
  ToolbarField,
  SearchInput,
  SearchButton,
  RefreshButton,
} from "../../components/ui/Toolbar";
import { btnPrimary, selectClass, thClass, tdClass } from "../../components/ui/styles";

const PAGE_SIZE = 7;

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(1);

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

  const deleteRoom = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa phòng khám này?")) return;
    try {
      await api.delete(`/rooms/${id}`);
      fetchRooms();
    } catch (err) {
      if (err.response?.status === 400) {
        alert("Không thể xóa: Phòng còn lịch khám");
      } else {
        alert("Xóa thất bại");
      }
    }
  };

  const applySearch = () => {
    setSearch(searchText);
    setPage(1);
  };

  const reset = () => {
    setSearchText("");
    setSearch("");
    setFilterDepartment("");
    setFilterStatus("");
    setPage(1);
    fetchRooms();
  };

  const filteredRooms = rooms.filter((room) => {
    if (filterDepartment && String(room.departmentId) !== filterDepartment) return false;
    if (filterStatus && room.status !== filterStatus) return false;
    if (search) {
      const keyword = search.trim().toLowerCase();
      const haystack = `${room.roomNumber || ""} ${room.roomType || ""}`.toLowerCase();
      if (!haystack.includes(keyword)) return false;
    }
    return true;
  });

  const pageRooms = filteredRooms.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="p-8 flex-1">
      <PageHeader title="Danh sách phòng khám">
        <Link to="/rooms/create" className={btnPrimary}>
          <i className="fa-solid fa-plus"></i>
          Thêm phòng khám
        </Link>
      </PageHeader>

      <Toolbar>
        <SearchInput
          value={searchText}
          onChange={setSearchText}
          onEnter={applySearch}
          placeholder="Tìm kiếm theo số phòng hoặc loại phòng"
        />

        <ToolbarField label="Khoa">
          <select
            value={filterDepartment}
            onChange={(e) => {
              setFilterDepartment(e.target.value);
              setPage(1);
            }}
            className={selectClass}
          >
            <option value="">Tất cả khoa</option>
            {departments.map((dept) => (
              <option key={dept.departmentId} value={dept.departmentId}>
                {dept.departmentName}
              </option>
            ))}
          </select>
        </ToolbarField>

        <ToolbarField label="Trạng thái">
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setPage(1);
            }}
            className={selectClass}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </ToolbarField>

        <SearchButton onClick={applySearch} />
        <RefreshButton onClick={reset} />
      </Toolbar>

      <TableCard
        pagination={
          <Pagination
            page={page}
            pageSize={PAGE_SIZE}
            total={filteredRooms.length}
            unit="phòng khám"
            onChange={setPage}
          />
        }
      >
        <thead className="bg-[#f8fafc]">
          <tr>
            <th className={thClass}>STT</th>
            <th className={thClass}>Số phòng</th>
            <th className={thClass}>Loại phòng</th>
            <th className={thClass}>Khoa</th>
            <th className={thClass}>Trạng thái</th>
            <th className={thClass}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {pageRooms.map((room, index) => (
            <tr key={room.id} className="transition-colors hover:bg-[#f9fbff]">
              <td className={tdClass}>{(page - 1) * PAGE_SIZE + index + 1}</td>
              <td className={`${tdClass} font-medium text-[#1a6cf0]`}>{room.roomNumber}</td>
              <td className={tdClass}>{room.roomType}</td>
              <td className={tdClass}>{room.departmentName}</td>
              <td className={tdClass}>
                <StatusBadge status={room.status} />
              </td>
              <td className={tdClass}>
                <RowActions
                  viewTo={`/rooms/${room.id}`}
                  editTo={`/rooms/${room.id}/edit`}
                  onDelete={() => deleteRoom(room.id)}
                />
              </td>
            </tr>
          ))}
          {pageRooms.length === 0 && (
            <tr>
              <td colSpan={6} className="py-10 text-center text-[14px] text-[#6b7280]">
                Không có phòng khám nào
              </td>
            </tr>
          )}
        </tbody>
      </TableCard>
    </section>
  );
}

export default RoomList;
