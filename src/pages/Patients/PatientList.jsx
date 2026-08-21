import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import PageHeader from "../../components/ui/PageHeader";
import TableCard from "../../components/ui/TableCard";
import Pagination from "../../components/ui/Pagination";
import RowActions from "../../components/ui/RowActions";
import {
  Toolbar,
  SearchInput,
  SearchButton,
  RefreshButton,
} from "../../components/ui/Toolbar";
import { btnPrimary, thClass, tdClass } from "../../components/ui/styles";
import { formatDate, formatDateTime } from "../../utils/format";

const PAGE_SIZE = 7;

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchPatients = async () => {
    try {
      const res = await api.get("/patients");
      setPatients(res.data);
    } catch {
      console.log("Lỗi");
    }
  };

  const deletePatient = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa bệnh nhân này?")) return;
    try {
      await api.delete(`/patients/${id}`);
      fetchPatients();
    } catch {
      alert("Xóa thất bại");
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const applySearch = () => {
    setSearch(searchText);
    setPage(1);
  };

  const reset = () => {
    setSearchText("");
    setSearch("");
    setPage(1);
    fetchPatients();
  };

  const filtered = patients.filter((patient) => {
    if (!search) return true;
    const keyword = search.trim().toLowerCase();
    const haystack = `${patient.fullName || ""} ${patient.phone || ""} ${
      patient.email || ""
    }`.toLowerCase();
    return haystack.includes(keyword);
  });

  const pagePatients = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="p-8 flex-1">
      <PageHeader title="Danh sách bệnh nhân">
        <Link to="/patients/create" className={btnPrimary}>
          <i className="fa-solid fa-plus"></i>
          Thêm bệnh nhân
        </Link>
      </PageHeader>

      <Toolbar>
        <SearchInput
          value={searchText}
          onChange={setSearchText}
          onEnter={applySearch}
          placeholder="Tìm kiếm theo họ tên, số điện thoại hoặc email"
        />
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
            unit="bệnh nhân"
            onChange={setPage}
          />
        }
      >
        <thead className="bg-[#f8fafc]">
          <tr>
            <th className={thClass}>STT</th>
            <th className={thClass}>Họ tên</th>
            <th className={thClass}>Ngày sinh</th>
            <th className={thClass}>Giới tính</th>
            <th className={thClass}>Số điện thoại</th>
            <th className={thClass}>Email</th>
            <th className={thClass}>Địa chỉ</th>
            <th className={thClass}>Ngày đăng ký</th>
            <th className={thClass}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {pagePatients.map((patient, index) => (
            <tr key={patient.id} className="transition-colors hover:bg-[#f9fbff]">
              <td className={tdClass}>{(page - 1) * PAGE_SIZE + index + 1}</td>
              <td className={`${tdClass} font-medium text-[#1f2937]`}>{patient.fullName}</td>
              <td className={tdClass}>{formatDate(patient.dateOfBirth)}</td>
              <td className={tdClass}>{patient.gender}</td>
              <td className={tdClass}>{patient.phone || "-"}</td>
              <td className={tdClass}>{patient.email || "-"}</td>
              <td className={tdClass}>{patient.address || "-"}</td>
              <td className={tdClass}>{formatDateTime(patient.createdAt)}</td>
              <td className={tdClass}>
                <RowActions
                  viewTo={`/patients/${patient.id}`}
                  editTo={`/patients/${patient.id}/edit`}
                  onDelete={() => deletePatient(patient.id)}
                />
              </td>
            </tr>
          ))}
          {pagePatients.length === 0 && (
            <tr>
              <td colSpan={9} className="py-10 text-center text-[14px] text-[#6b7280]">
                Không có bệnh nhân nào
              </td>
            </tr>
          )}
        </tbody>
      </TableCard>
    </section>
  );
}

export default PatientList;
