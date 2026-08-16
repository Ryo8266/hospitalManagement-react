import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

function UpdatePatient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    email: "",
    address: "",
  });

  const fetchPatient = async () => {
    try {
      const res = await api.get(`/patients/${id}`);
      setFormData({
        fullName: res.data.fullName || "",
        dateOfBirth: res.data.dateOfBirth || "",
        gender: res.data.gender || "",
        phoneNumber: res.data.phoneNumber || "",
        email: res.data.email || "",
        address: res.data.address || "",
      });
    } catch {
      console.log("Lỗi khi lấy dữ liệu bệnh nhân");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.dateOfBirth || !formData.gender) {
      alert("Chưa đầy đủ thông tin");
      return;
    }

    try {
      await api.put(`/patients/${id}`, formData);
      alert("Sửa bệnh nhân thành công");
      navigate("/patients");
    } catch {
      alert("Sửa bệnh nhân thất bại");
    }
  };

  useEffect(() => {
    fetchPatient();
  }, [id]);

  return (
    <section className="p-[34px] px-[27px] flex-1">
      <div className="flex items-center gap-3 mb-[31px] text-[16px]">
        <Link to="/patients" className="text-[#075fc9] font-medium">Quản lý bệnh nhân</Link>
        <i className="fa-solid fa-chevron-right text-[12px] text-[#788293]"></i>
        <Link to="/patients" className="text-[#075fc9] font-medium">Danh sách bệnh nhân</Link>
        <i className="fa-solid fa-chevron-right text-[12px] text-[#788293]"></i>
        <span className="text-[#606a7b]">Sửa bệnh nhân</span>
      </div>

      <div className="bg-white rounded-[7px] border border-[#e8e9ed] shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="px-[30px] pt-[35px] pb-[27px] border-b border-[#eee]">
          <h3 className="text-[#1565c0] text-[30px] inline-block border-b-[3px] border-[#1565c0] pb-3">
            Thông tin bệnh nhân
          </h3>
        </div>

        <div className="px-[30px] pb-[29px]">
          <div className="grid grid-cols-[230px_1fr] items-center min-h-[85px]">
            <label className="text-[17px] font-semibold text-[#172033]">
              Họ và tên <span className="text-[#ed2024] ml-[3px]">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Nhập họ và tên"
              className="w-full h-[57px] border border-[#d4d8df] rounded-lg px-4 text-[16px] outline-none transition-all duration-200 focus:border-[#146be3] focus:shadow-[0_0_0_3px_rgba(20,107,227,0.1)] placeholder:text-[#858d9c]"
            />
          </div>

          <div className="grid grid-cols-[230px_1fr] items-center min-h-[85px]">
            <label className="text-[17px] font-semibold text-[#172033]">
              Ngày sinh <span className="text-[#ed2024] ml-[3px]">*</span>
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full h-[57px] border border-[#d4d8df] rounded-lg px-4 text-[16px] outline-none transition-all duration-200 focus:border-[#146be3] focus:shadow-[0_0_0_3px_rgba(20,107,227,0.1)]"
            />
          </div>

          <div className="grid grid-cols-[230px_1fr] items-center min-h-[85px]">
            <label className="text-[17px] font-semibold text-[#172033]">
              Giới tính <span className="text-[#ed2024] ml-[3px]">*</span>
            </label>
            <div className="relative">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full h-[57px] border border-[#d4d8df] rounded-lg px-4 text-[16px] outline-none transition-all duration-200 focus:border-[#146be3] focus:shadow-[0_0_0_3px_rgba(20,107,227,0.1)] appearance-none cursor-pointer bg-white"
              >
                <option value="">-- Chọn giới tính --</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
              <i className="fa-solid fa-chevron-down absolute right-[18px] top-1/2 -translate-y-1/2 text-[#364152] pointer-events-none text-[12px]"></i>
            </div>
          </div>

          <div className="grid grid-cols-[230px_1fr] items-center min-h-[85px]">
            <label className="text-[17px] font-semibold text-[#172033]">
              Số điện thoại
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Nhập số điện thoại"
              className="w-full h-[57px] border border-[#d4d8df] rounded-lg px-4 text-[16px] outline-none transition-all duration-200 focus:border-[#146be3] focus:shadow-[0_0_0_3px_rgba(20,107,227,0.1)] placeholder:text-[#858d9c]"
            />
          </div>

          <div className="grid grid-cols-[230px_1fr] items-center min-h-[85px]">
            <label className="text-[17px] font-semibold text-[#172033]">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email"
              className="w-full h-[57px] border border-[#d4d8df] rounded-lg px-4 text-[16px] outline-none transition-all duration-200 focus:border-[#146be3] focus:shadow-[0_0_0_3px_rgba(20,107,227,0.1)] placeholder:text-[#858d9c]"
            />
          </div>

          <div className="grid grid-cols-[230px_1fr] items-center min-h-[85px]">
            <label className="text-[17px] font-semibold text-[#172033]">
              Địa chỉ
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Nhập địa chỉ"
              className="w-full h-[80px] border border-[#d4d8df] rounded-lg px-4 py-3 text-[16px] outline-none transition-all duration-200 focus:border-[#146be3] focus:shadow-[0_0_0_3px_rgba(20,107,227,0.1)] resize-none placeholder:text-[#858d9c]"
            ></textarea>
          </div>
        </div>

        <div className="flex items-center justify-end min-h-[110px] px-[34px] py-6 border-t border-[#e1e4e9] gap-8">
          <button
            type="button"
            onClick={() => navigate("/patients")}
            className="h-[56px] px-[35px] rounded-[7px] text-[17px] font-medium flex items-center justify-center gap-[17px] bg-white border border-[#d7dbe2] text-[#273449] min-w-[155px] transition-all duration-200 hover:bg-[#f5f6f8]"
          >
            <i className="fa-solid fa-xmark"></i>
            Hủy
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="h-[56px] px-[35px] rounded-[7px] text-[17px] font-medium flex items-center justify-center gap-[17px] bg-[#0869ed] border border-[#0869ed] text-white min-w-[170px] transition-all duration-200 hover:bg-[#075dd1]"
          >
            <i className="fa-regular fa-floppy-disk"></i>
            Lưu bệnh nhân
          </button>
        </div>
      </div>
    </section>
  );
}

export default UpdatePatient;