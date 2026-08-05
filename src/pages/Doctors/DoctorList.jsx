import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      setDoctors(res.data);
    } catch {
      console.log("Lỗi");
    }
  };

  const deleteDoctor = async (id) => {
    try {
      await api.delete(`/doctors/${id}`);
      alert("Xóa thành công");
      fetchDoctors();
    } catch {
      console.log("Lỗi");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <section className="p-8 flex-1">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-[34px] font-bold text-[#1f2937]">
          Danh sách bác sĩ
        </h2>
        <button className="flex items-center gap-2.5 bg-[#0d6efd] text-white px-6 py-3.5 rounded-lg text-base font-semibold transition-all duration-300 hover:bg-[#0b5ed7]">
          <i className="fa-solid fa-plus text-lg"></i>
          Thêm bác sĩ
        </button>
      </div>

      <div className="flex items-center gap-4.5 mb-8">
        <div className="flex-1 h-14 flex items-center bg-white border border-[#dfe3eb] rounded-lg px-4.5">
          <i className="fa-solid fa-magnifying-glass text-[#999] text-lg"></i>
          <input
            type="text"
            placeholder="Tìm kiếm theo họ tên, chuyên khoa, SĐT, email..."
            className="flex-1 border-none outline-none ml-3.5 text-[15px] bg-transparent"
          />
        </div>

        <select className="w-[250px] h-14 border border-[#dfe3eb] rounded-lg px-4 text-[15px] bg-white outline-none cursor-pointer focus:border-[#0d6efd]">
          <option>Khoa</option>
          <option>Nội tổng quát</option>
          <option>Tim mạch</option>
          <option>Nhi khoa</option>
        </select>

        <select className="w-[250px] h-14 border border-[#dfe3eb] rounded-lg px-4 text-[15px] bg-white outline-none cursor-pointer focus:border-[#0d6efd]">
          <option>Trạng thái</option>
          <option>Active</option>
          <option>Inactive</option>
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
                Họ và tên
              </th>
              <th className="py-5 px-5 text-left text-[15px] font-semibold text-[#374151] border-b border-[#e5e7eb]">
                Chuyên khoa
              </th>
              <th className="py-5 px-5 text-left text-[15px] font-semibold text-[#374151] border-b border-[#e5e7eb]">
                Khoa
              </th>
              <th className="py-5 px-5 text-left text-[15px] font-semibold text-[#374151] border-b border-[#e5e7eb]">
                Số điện thoại
              </th>
              <th className="py-5 px-5 text-left text-[15px] font-semibold text-[#374151] border-b border-[#e5e7eb]">
                Email
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
            {doctors.map((doctor, index) => (
              <tr
                key={doctor.doctorId}
                className="transition-all duration-250 hover:bg-[#f9fbff]"
              >
                <td className="py-5 px-5 text-[15px] border-b border-[#f0f2f5]">
                  {index + 1}
                </td>
                <td className="py-5 px-5 text-[15px] border-b border-[#f0f2f5]">
                  {doctor.fullName}
                </td>
                <td className="py-5 px-5 text-[15px] border-b border-[#f0f2f5]">
                  {doctor.specialization}
                </td>
                <td className="py-5 px-5 text-[15px] border-b border-[#f0f2f5]">
                  {doctor.departmentName}
                </td>
                <td className="py-5 px-5 text-[15px] border-b border-[#f0f2f5]">
                  {doctor.phone || "-"}
                </td>
                <td className="py-5 px-5 text-[15px] border-b border-[#f0f2f5]">
                  {doctor.email || "-"}
                </td>
                <td className="py-5 px-5 text-[15px] border-b border-[#f0f2f5]">
                  <span
                    className={`inline-block px-3.5 py-1.5 rounded-[30px] text-[13px] font-semibold ${
                      doctor.status === "Active"
                        ? "text-[#1f9254] bg-[#e8f8ef]"
                        : "text-[#d14343] bg-[#ffe9e9]"
                    }`}
                  >
                    {doctor.status}
                  </span>
                </td>
                <td className="py-5 px-5 text-[15px] border-b border-[#f0f2f5] whitespace-nowrap">
                  <Link to={`/doctors/${doctor.doctorId}`}>
                    <button className="w-10 h-10 rounded-lg border border-[#e5e7eb] text-[#0d6efd] bg-white transition-all duration-250 mr-2 hover:bg-[#0d6efd] hover:text-white">
                      <i className="fa-regular fa-eye"></i>
                    </button>
                  </Link>
                  <button className="w-10 h-10 rounded-lg border border-[#e5e7eb] text-[#f59e0b] bg-white transition-all duration-250 mr-2 hover:bg-[#f59e0b] hover:text-white">
                    <i className="fa-solid fa-pen"></i>
                  </button>
                  <button
                    onClick={() => deleteDoctor(doctor.doctorId)}
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

export default DoctorList;
