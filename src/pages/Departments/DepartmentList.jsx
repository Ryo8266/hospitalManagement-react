import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import PageHeader from "../../components/ui/PageHeader";
import TableCard from "../../components/ui/TableCard";
import Pagination from "../../components/ui/Pagination";
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

function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const [filterDoctors, setFilterDoctors] = useState("");
  const [page, setPage] = useState(1);

  const fetchDepartments = async () => {
    try {
      const res = await api.get("/departments");
      setDepartments(res.data);
    } catch {
      console.log("Lỗi");
    }
  };

  const deleteDepartment = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa khoa này?")) return;
    try {
      await api.delete(`/departments/${id}`);
      fetchDepartments();
    } catch (err) {
      if (err.response?.status === 400) {
        alert("Không thể xóa: Khoa còn bác sĩ hoặc phòng");
      } else {
        alert("Xóa thất bại");
      }
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const applySearch = () => {
    setSearch(searchText);
    setPage(1);
  };

  const reset = () => {
    setSearchText("");
    setSearch("");
    setFilterDoctors("");
    setPage(1);
    fetchDepartments();
  };

  const filtered = departments.filter((dept) => {
    const numberOfDoctors = dept.numberOfDoctors || 0;
    if (filterDoctors === "with" && numberOfDoctors === 0) return false;
    if (filterDoctors === "without" && numberOfDoctors > 0) return false;
    if (search && !(dept.departmentName || "").toLowerCase().includes(search.trim().toLowerCase())) {
      return false;
    }
    return true;
  });

  const pageDepartments = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="p-8 flex-1">
      <PageHeader title="Danh sách khoa">
        <Link to="/departments/create" className={btnPrimary}>
          <i className="fa-solid fa-plus"></i>
          Thêm khoa
        </Link>
      </PageHeader>

      <Toolbar>
        <SearchInput
          value={searchText}
          onChange={setSearchText}
          onEnter={applySearch}
          placeholder="Tìm kiếm theo tên khoa..."
        />

        <ToolbarField label="Số bác sĩ">
          <select
            value={filterDoctors}
            onChange={(e) => {
              setFilterDoctors(e.target.value);
              setPage(1);
            }}
            className={selectClass}
          >
            <option value="">-- Tất cả --</option>
            <option value="with">Có bác sĩ</option>
            <option value="without">Chưa có bác sĩ</option>
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
            total={filtered.length}
            unit="khoa"
            onChange={setPage}
          />
        }
      >
        <thead className="bg-[#f8fafc]">
          <tr>
            <th className={thClass}>STT</th>
            <th className={thClass}>Tên khoa</th>
            <th className={thClass}>Mô tả</th>
            <th className={thClass}>Số điện thoại</th>
            <th className={thClass}>Số bác sĩ</th>
            <th className={thClass}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {pageDepartments.map((dept, index) => (
            <tr key={dept.departmentId} className="transition-colors hover:bg-[#f9fbff]">
              <td className={tdClass}>{(page - 1) * PAGE_SIZE + index + 1}</td>
              <td className={tdClass}>
                <Link
                  to={`/departments/${dept.departmentId}`}
                  className="font-medium text-[#1a6cf0] hover:underline"
                >
                  {dept.departmentName}
                </Link>
              </td>
              <td className={tdClass}>{dept.description}</td>
              <td className={tdClass}>{dept.phone}</td>
              <td className={tdClass}>{dept.numberOfDoctors || 0}</td>
              <td className={tdClass}>
                <RowActions
                  viewTo={`/departments/${dept.departmentId}`}
                  editTo={`/departments/${dept.departmentId}/edit`}
                  onDelete={() => deleteDepartment(dept.departmentId)}
                />
              </td>
            </tr>
          ))}
          {pageDepartments.length === 0 && (
            <tr>
              <td colSpan={6} className="py-10 text-center text-[14px] text-[#6b7280]">
                Không có khoa nào
              </td>
            </tr>
          )}
        </tbody>
      </TableCard>
    </section>
  );
}

export default DepartmentList;
