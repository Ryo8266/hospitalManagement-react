import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import PageHeader from "../../components/ui/PageHeader";
import TableCard from "../../components/ui/TableCard";
import Pagination from "../../components/ui/Pagination";
import StatusBadge from "../../components/ui/StatusBadge";
import {
  Toolbar,
  ToolbarField,
  SearchInput,
  SearchButton,
  RefreshButton,
} from "../../components/ui/Toolbar";
import { btnPrimary, inputClass, selectClass, thClass, tdClass } from "../../components/ui/styles";
import { appointmentCode, formatDate, formatTime } from "../../utils/format";

const PAGE_SIZE = 7;

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterDoctor, setFilterDoctor] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(1);

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointments");
      setAppointments(res.data);
    } catch {
      console.log("Lỗi khi lấy danh sách lịch khám");
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      setDoctors(res.data);
    } catch {
      console.log("Lỗi khi lấy danh sách bác sĩ");
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  const cancelAppointment = async (id) => {
    if (!confirm("Bạn có chắc muốn hủy lịch khám này?")) return;
    try {
      await api.put(`/appointments/${id}/cancel`);
      fetchAppointments();
    } catch (err) {
      if (err.response?.status === 400) {
        alert("Chỉ hủy được lịch khám đang ở trạng thái Scheduled");
      } else {
        alert("Hủy lịch khám thất bại");
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
    setFilterDate("");
    setFilterDoctor("");
    setFilterStatus("");
    setPage(1);
    fetchAppointments();
  };

  const filtered = appointments.filter((apt) => {
    if (filterDate && apt.appointmentDate !== filterDate) return false;
    if (filterDoctor && String(apt.doctorId) !== filterDoctor) return false;
    if (filterStatus && apt.status !== filterStatus) return false;
    if (search) {
      const keyword = search.trim().toLowerCase();
      const haystack = `${appointmentCode(apt.id)} ${apt.patientName || ""} ${
        apt.doctorName || ""
      } ${apt.reason || ""}`.toLowerCase();
      if (!haystack.includes(keyword)) return false;
    }
    return true;
  });

  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="p-8 flex-1">
      <PageHeader title="Danh sách lịch khám">
        <Link to="/appointments/create" className={btnPrimary}>
          <i className="fa-solid fa-plus"></i>
          Thêm lịch khám
        </Link>
      </PageHeader>

      <Toolbar>
        <SearchInput
          value={searchText}
          onChange={setSearchText}
          onEnter={applySearch}
          placeholder="Tìm kiếm theo mã, tên bệnh nhân, bác sĩ, lý do khám..."
        />

        <ToolbarField label="Ngày khám" className="w-[180px]">
          <input
            type="date"
            value={filterDate}
            onChange={(e) => {
              setFilterDate(e.target.value);
              setPage(1);
            }}
            className={inputClass}
          />
        </ToolbarField>

        <ToolbarField label="Bác sĩ">
          <select
            value={filterDoctor}
            onChange={(e) => {
              setFilterDoctor(e.target.value);
              setPage(1);
            }}
            className={selectClass}
          >
            <option value="">Tất cả bác sĩ</option>
            {doctors.map((doctor) => (
              <option key={doctor.doctorId} value={doctor.doctorId}>
                {doctor.fullName}
              </option>
            ))}
          </select>
        </ToolbarField>

        <ToolbarField label="Trạng thái" className="w-[180px]">
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setPage(1);
            }}
            className={selectClass}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </ToolbarField>

        <SearchButton onClick={applySearch} />
        <RefreshButton onClick={reset} />
      </Toolbar>

      <TableCard
        minWidth="1400px"
        pagination={
          <Pagination
            page={page}
            pageSize={PAGE_SIZE}
            total={filtered.length}
            unit="lịch khám"
            onChange={setPage}
          />
        }
      >
        <thead className="bg-[#f8fafc]">
          <tr>
            <th className={thClass}>STT</th>
            <th className={thClass}>Mã lịch khám</th>
            <th className={thClass}>Bệnh nhân</th>
            <th className={thClass}>Bác sĩ</th>
            <th className={thClass}>Phòng khám</th>
            <th className={thClass}>Ngày khám</th>
            <th className={thClass}>Giờ khám</th>
            <th className={thClass}>Lý do khám</th>
            <th className={thClass}>Trạng thái</th>
            <th className={thClass}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {pageItems.map((apt, index) => (
            <tr key={apt.id} className="transition-colors hover:bg-[#f9fbff]">
              <td className={tdClass}>{(page - 1) * PAGE_SIZE + index + 1}</td>
              <td className={`${tdClass} font-medium text-[#1a6cf0]`}>
                {appointmentCode(apt.id)}
              </td>
              <td className={tdClass}>{apt.patientName || "-"}</td>
              <td className={tdClass}>{apt.doctorName || "-"}</td>
              <td className={tdClass}>
                <div>
                  {apt.roomNumber} – {apt.roomType}
                </div>
                <div className="text-[13px] text-[#6b7280]">({apt.departmentName})</div>
              </td>
              <td className={tdClass}>{formatDate(apt.appointmentDate)}</td>
              <td className={tdClass}>{formatTime(apt.appointmentTime)}</td>
              <td className={tdClass}>{apt.reason || "-"}</td>
              <td className={tdClass}>
                <StatusBadge status={apt.status} />
              </td>
              <td className={tdClass}>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/appointments/${apt.id}`}
                    title="Xem chi tiết"
                    className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-[#bfdbfe] bg-[#eff6ff] text-[#2563eb] transition-colors hover:bg-[#2563eb] hover:text-white"
                  >
                    <i className="fa-regular fa-eye"></i>
                  </Link>
                  <Link
                    to={`/appointments/${apt.id}/diagnosis`}
                    title="Cập nhật chẩn đoán"
                    className={`w-9 h-9 inline-flex items-center justify-center rounded-lg border transition-colors ${
                      apt.status === "Scheduled"
                        ? "border-[#fde68a] bg-[#fffbeb] text-[#f59e0b] hover:bg-[#f59e0b] hover:text-white"
                        : "border-[#e5e7eb] bg-[#f9fafb] text-[#d1d5db] pointer-events-none"
                    }`}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </Link>
                  <button
                    type="button"
                    title="Hủy lịch khám"
                    disabled={apt.status !== "Scheduled"}
                    onClick={() => cancelAppointment(apt.id)}
                    className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-[#fecaca] bg-[#fef2f2] text-[#ef4444] transition-colors hover:bg-[#ef4444] hover:text-white disabled:border-[#e5e7eb] disabled:bg-[#f9fafb] disabled:text-[#d1d5db] disabled:cursor-not-allowed disabled:hover:bg-[#f9fafb] disabled:hover:text-[#d1d5db]"
                  >
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {pageItems.length === 0 && (
            <tr>
              <td colSpan={10} className="py-10 text-center text-[14px] text-[#6b7280]">
                Không có lịch khám nào
              </td>
            </tr>
          )}
        </tbody>
      </TableCard>
    </section>
  );
}

export default AppointmentList;
