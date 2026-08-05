import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function DepartmentList() {
  const [departments, setDepartments] = useState([]);

  const fetchDepartments = async () => {
    try {
      const res = await api.get("/departments");
      setDepartments(res.data);
    } catch {
      console.log("Lỗi");
    }
  };

  const deleteDepartment = async (id) => {
    try {
      await api.delete(`/departments/${id}`);
      fetchDepartments();
    } catch (err) {
      if (err.response?.status === 400) {
        alert('Không thể xóa: Khoa còn bác sĩ hoặc phòng');
      } else {
        console.log("Lỗi khi xóa");
      }
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <section className="p-8 flex-1">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-[34px] font-bold text-[#1f2937]">Danh sách khoa</h2>
        <Link to="/departments/create">
          <button className="flex items-center gap-2.5 bg-[#0d6efd] text-white px-6 py-3.5 rounded-lg text-base font-semibold transition-all duration-300 hover:bg-[#0b5ed7]">
            <i className="fa-solid fa-plus text-lg"></i>
            Thêm khoa
          </button>
        </Link>
      </div>

      <div className="flex items-center gap-4.5 mb-8">
        <div className="flex-1 h-14 flex items-center bg-white border border-[#dfe3eb] rounded-lg px-4.5">
          <i className="fa-solid fa-magnifying-glass text-[#999] text-lg"></i>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên khoa..."
            className="flex-1 border-none outline-none ml-3.5 text-[15px] bg-transparent"
          />
        </div>

        <select className="w-[250px] h-14 border border-[#dfe3eb] rounded-lg px-4 text-[15px] bg-white outline-none cursor-pointer focus:border-[#0d6efd]">
          <option>-- Tất cả --</option>
        </select>

        <button className="h-14 flex items-center gap-2.5 px-7 bg-[#0d6efd] text-white rounded-lg text-base font-semibold transition-all duration-300 hover:bg-[#0b5ed7]">
          <i className="fa-solid fa-magnifying-glass text-[17px]"></i>
          Tìm kiếm
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
                Tên khoa
              </th>
              <th className="py-5 px-5 text-left text-[15px] font-semibold text-[#374151] border-b border-[#e5e7eb]">
                Mô tả
              </th>
              <th className="py-5 px-5 text-left text-[15px] font-semibold text-[#374151] border-b border-[#e5e7eb]">
                Số điện thoại
              </th>
              <th className="py-5 px-5 text-left text-[15px] font-semibold text-[#374151] border-b border-[#e5e7eb]">
                Số bác sĩ
              </th>
              <th className="py-5 px-5 text-left text-[15px] font-semibold text-[#374151] border-b border-[#e5e7eb]">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept, index) => (
              <tr
                key={dept.departmentId}
                className="transition-all duration-250 hover:bg-[#f9fbff]"
              >
                <td className="py-5 px-5 text-[15px] border-b border-[#f0f2f5]">
                  {index + 1}
                </td>
                <td className="py-5 px-5 text-[15px] border-b border-[#f0f2f5] text-[#0d6efd] font-semibold">
                  {dept.departmentName}
                </td>
                <td className="py-5 px-5 text-[15px] border-b border-[#f0f2f5]">
                  {dept.description}
                </td>
                <td className="py-5 px-5 text-[15px] border-b border-[#f0f2f5]">
                  {dept.phone}
                </td>
                <td className="py-5 px-5 text-[15px] border-b border-[#f0f2f5]">
                  {dept.numberOfDoctors || 0}
                </td>
                <td className="py-5 px-5 text-[15px] border-b border-[#f0f2f5] whitespace-nowrap">
                  <Link to={`/departments/${dept.departmentId}`}>
                    <button className="w-10 h-10 rounded-lg border border-[#e5e7eb] text-[#0d6efd] bg-white transition-all duration-250 mr-2 hover:bg-[#0d6efd] hover:text-white">
                      <i className="fa-regular fa-eye"></i>
                    </button>
                  </Link>
                  <Link to={`/departments/${dept.departmentId}/edit`}>
                    <button className="w-10 h-10 rounded-lg border border-[#e5e7eb] text-[#f59e0b] bg-white transition-all duration-250 mr-2 hover:bg-[#f59e0b] hover:text-white">
                      <i className="fa-solid fa-pen"></i>
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteDepartment(dept.departmentId)}
                    className="w-10 h-10 rounded-lg border border-[#e5e7eb] text-[#ef4444] bg-white transition-all duration-250 hover:bg-[#ef4444] hover:text-white"
                  >
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default DepartmentList;
