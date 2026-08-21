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

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(1);

  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      setDoctors(res.data);
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

  const deleteDoctor = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa bác sĩ này?")) return;
    try {
      await api.delete(`/doctors/${id}`);
      fetchDoctors();
    } catch {
      alert("Xóa thất bại");
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchDepartments();
  }, []);

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
    fetchDoctors();
  };

  const filtered = doctors.filter((doctor) => {
    if (filterDepartment && doctor.departmentName !== filterDepartment) return false;
    if (filterStatus && doctor.status !== filterStatus) return false;
    if (search) {
      const keyword = search.trim().toLowerCase();
      const haystack = `${doctor.fullName || ""} ${doctor.specialization || ""} ${
        doctor.phone || ""
      } ${doctor.email || ""}`.toLowerCase();
      if (!haystack.includes(keyword)) return false;
    }
    return true;
  });

  const pageDoctors = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="p-8 flex-1">
      <PageHeader title="Danh sách bác sĩ">
        <Link to="/doctors/create" className={btnPrimary}>
          <i className="fa-solid fa-plus"></i>
          Thêm bác sĩ
        </Link>
      </PageHeader>

      <Toolbar>
        <SearchInput
          value={searchText}
          onChange={setSearchText}
          onEnter={applySearch}
          placeholder="Tìm kiếm theo họ tên, chuyên khoa, SĐT, email..."
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
            <option value="">Tất cả</option>
            {departments.map((dept) => (
              <option key={dept.departmentId} value={dept.departmentName}>
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
            <option value="">Tất cả</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </ToolbarField>

        <SearchButton onClick={applySearch} />
        <RefreshButton onClick={reset} />
      </Toolbar>

      <TableCard
        minWidth="1200px"
        pagination={
          <Pagination
            page={page}
            pageSize={PAGE_SIZE}
            total={filtered.length}
            unit="bác sĩ"
            onChange={setPage}
          />
        }
      >
        <thead className="bg-[#f8fafc]">
          <tr>
            <th className={thClass}>STT</th>
            <th className={thClass}>Họ và tên</th>
            <th className={thClass}>Chuyên khoa</th>
            <th className={thClass}>Khoa</th>
            <th className={thClass}>Số điện thoại</th>
            <th className={thClass}>Email</th>
            <th className={thClass}>Trạng thái</th>
            <th className={thClass}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {pageDoctors.map((doctor, index) => (
            <tr key={doctor.doctorId} className="transition-colors hover:bg-[#f9fbff]">
              <td className={tdClass}>{(page - 1) * PAGE_SIZE + index + 1}</td>
              <td className={tdClass}>{doctor.fullName}</td>
              <td className={tdClass}>{doctor.specialization}</td>
              <td className={tdClass}>{doctor.departmentName}</td>
              <td className={tdClass}>{doctor.phone || "-"}</td>
              <td className={tdClass}>{doctor.email || "-"}</td>
              <td className={tdClass}>
                <StatusBadge status={doctor.status} />
              </td>
              <td className={tdClass}>
                <RowActions
                  viewTo={`/doctors/${doctor.doctorId}`}
                  editTo={`/doctors/${doctor.doctorId}/edit`}
                  onDelete={() => deleteDoctor(doctor.doctorId)}
                />
              </td>
            </tr>
          ))}
          {pageDoctors.length === 0 && (
            <tr>
              <td colSpan={8} className="py-10 text-center text-[14px] text-[#6b7280]">
                Không có bác sĩ nào
              </td>
            </tr>
          )}
        </tbody>
      </TableCard>
    </section>
  );
}

export default DoctorList;
