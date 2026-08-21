import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import FormField from "../../components/ui/FormField";
import { btnPrimary, btnSecondary, inputClass, selectClass, textareaClass } from "../../components/ui/styles";
import { formatDateTime } from "../../utils/format";

function UpdatePatient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [createdAt, setCreatedAt] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
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
        phone: res.data.phone || "",
        email: res.data.email || "",
        address: res.data.address || "",
      });
      setCreatedAt(res.data.createdAt || "");
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
    if (
      !formData.fullName ||
      !formData.dateOfBirth ||
      !formData.gender ||
      !formData.phone ||
      !formData.email ||
      !formData.address
    ) {
      alert("Chưa đầy đủ thông tin");
      return;
    }

    try {
      await api.put(`/patients/${id}`, formData);
      alert("Cập nhật bệnh nhân thành công");
      navigate("/patients");
    } catch {
      alert("Cập nhật bệnh nhân thất bại");
    }
  };

  useEffect(() => {
    fetchPatient();
  }, [id]);

  return (
    <section className="p-8 flex-1">
      <PageHeader
        title="Chỉnh sửa bệnh nhân"
        backTo={`/patients/${id}`}
        backLabel="Quay lại chi tiết"
      />

      <Card
        title="Thông tin bệnh nhân"
        footer={
          <>
            <button type="button" onClick={() => navigate("/patients")} className={btnSecondary}>
              <i className="fa-solid fa-xmark"></i>
              Hủy
            </button>
            <button type="button" onClick={handleSubmit} className={btnPrimary}>
              <i className="fa-regular fa-floppy-disk"></i>
              Cập nhật
            </button>
          </>
        }
      >
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          <FormField label="Họ và tên" required>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Nhập họ và tên"
              className={inputClass}
            />
          </FormField>

          <FormField label="Ngày sinh" required>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className={inputClass}
            />
          </FormField>

          <FormField label="Giới tính" required>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="">-- Chọn giới tính --</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </FormField>

          <FormField label="Số điện thoại" required>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Nhập số điện thoại"
              className={inputClass}
            />
          </FormField>

          <FormField label="Email" required>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email"
              className={inputClass}
            />
          </FormField>

          <FormField label="Địa chỉ" required>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Nhập địa chỉ"
              className={`${textareaClass} h-[150px]`}
            ></textarea>
          </FormField>

          <FormField label="Ngày đăng ký">
            <input
              type="text"
              value={formatDateTime(createdAt)}
              readOnly
              className={`${inputClass} bg-[#f3f4f6] text-[#6b7280] cursor-not-allowed`}
            />
          </FormField>
        </div>
      </Card>
    </section>
  );
}

export default UpdatePatient;
