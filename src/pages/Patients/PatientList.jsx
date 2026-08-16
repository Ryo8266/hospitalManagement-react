import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function PatientList() {
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    try {
      const res = await api.get("/patients");
      setPatients(res.data);
    } catch {
      console.log("Lỗi");
    }
  };

  const deletePatient = async (id) => {
    try {
      await api.delete(`/patients/${id}`);
      alert("Xóa bệnh nhân thành công");
      fetchPatients();
    } catch {
      alert("Xóa thất bại");
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <section className="p-8 flex-1">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-[34px] font-bold text-[#1f2937]">Danh sách bệnh nhân</h2>
        <Link to="/patients/create">
          <button className="flex items-center gap-2.5 bg-[#0d6efd] text-white px-6 py-3.5 rounded-lg text-base font-semibold transition-all duration-300 hover:bg-[#0b5ed7]">
            <i className="fa-solid fa-plus text-lg"></i>
            Thêm bệnh nhân
          </button>
        </Link>
      </div>

      <div className="flex items-center gap-4.5 mb-8">
        <div className="flex-1 h-14 flex items-center bg-white border border-[#dfe3eb] rounded-lg px-4.5">
          <i className="fa-solid fa-magnifying-glass text-[#999] text-lg"></i>
          <input
            type="text"
            placeholder="Tìm kiếm theo họ tên, số điện thoại hoặc email"
            className="flex-1 border-none outline-none ml-3.5 text-[15px] bg-transparent"
          />
        </div>

        <button className="h-14 flex items-center gap-2.5 px-7 bg-[#0d6efd] text-white rounded-lg text-base font-semibold transition-all duration-300 hover:bg-[#0b5ed7]">
          <i className="fa-solid fa-magnifying-glass text-[17px]"></i>
          Tìm kiếm
        </button>

        <button
          onClick={fetchPatients}
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
                Họ tên
              </th>
              <th className="py-5 px-5 text-left text-[15px] font-semibold text-[#374151] border-b border-[#e5e7eb]">
                Ngày sinh
              </th>
              <th className="py-5 px-5 text-left text-[15px] font-semibold text-[#374151] border-b border-[#e5e7eb]">
                Giới tính
              </th>
              <th className="py-5 px-5 text-left text-[15px] font-semibold text-[#374151] border-b border-[#e5e7eb]">
                Số điện thoại
              </th>
              <th className="py-5 px-5 text-left text-[15px] font-semibold text-[#374151] border-b border-[#e5e7eb]">
                Email
              </th>
              <th className="py-5 px-5 text-left text-[15px] font-semibold text-[#374151] border-b border-[#e5e7eb]">
                Địa chỉ
              </th>
              <th className="py-5 px-5 text-left text-[15px] font-semibold text-[#374151] border-b border-[#e5e7eb]">
                Ngày đăng ký
              </th>
              <th className="py-5 px-5 text-left text-[15px] font-semibold text-[#374151] border-b border-[#e5e7eb]">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr
                key={patient.id}
                className="transition-all duration-250 hover:bg-[#f9fbff]"
              >
                <td className="py-5 px-5 text-[15px] border-b border-[#f0f2f5]">
                  {index + 1}
                </td>
                <td className="py-5 px-5 text-[15px] border-b border-[#f0f2f5] font-medium text-[#0d6efd]">
                  {patient.fullName}
                </td>
                <td className="py-5 px-5 text-[15px] border-b border-[#f0f2f5]">
                  {patient.dateOfBirth}
                </td>
                <td className="py-5 px-5 text-[15px] border-b border-[#f0f2f5]">
                  {patient.gender}
                </td>
                <td className="py-5 px-5 text-[15px] border-b border-[#f0f2f5]">
                  {patient.phoneNumber}
                </td>
                <td className="py-5 px-5 text-[15px] border-b border-[#f0f2f5]">
                  {patient.email}
                </td>
                <td className="py-5 px-5 text-[15px] border-b border-[#f0f2f5]">
                  {patient.address}
                </td>
                <td className="py-5 px-5 text-[15px] border-b border-[#f0f2f5]">
                  {patient.createdAt}
                </td>
                <td className="py-5 px-5 text-[15px] border-b border-[#f0f2f5] whitespace-nowrap">
                  <Link to={`/patients/${patient.id}`}>
                    <button className="w-10 h-10 rounded-lg border border-[#e5e7eb] text-[#0d6efd] bg-white transition-all duration-250 mr-2 hover:bg-[#0d6efd] hover:text-white">
                      <i className="fa-regular fa-eye"></i>
                    </button>
                  </Link>
                  <Link to={`/patients/${patient.id}/edit`}>
                    <button className="w-10 h-10 rounded-lg border border-[#e5e7eb] text-[#f59e0b] bg-white transition-all duration-250 mr-2 hover:bg-[#f59e0b] hover:text-white">
                      <i className="fa-solid fa-pen"></i>
                    </button>
                  </Link>
                  <button
                    onClick={() => deletePatient(patient.id)}
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

export default PatientList;