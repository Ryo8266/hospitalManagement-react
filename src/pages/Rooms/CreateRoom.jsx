import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import FormField from "../../components/ui/FormField";
import StatusLegend from "./StatusLegend";
import { btnPrimary, btnSecondary, inputClass, selectClass } from "../../components/ui/styles";

function CreateRoom() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    roomNumber: "",
    roomType: "",
    departmentId: "",
    status: "",
  });

  const fetchDepartments = async () => {
    try {
      const res = await api.get("/departments");
      setDepartments(res.data);
    } catch {
      console.log("Lỗi khi lấy danh sách khoa");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.roomNumber || !formData.roomType || !formData.departmentId || !formData.status) {
      alert("Chưa đầy đủ thông tin");
      return;
    }

    try {
      await api.post("/rooms", {
        ...formData,
        departmentId: Number(formData.departmentId),
      });
      alert("Thêm phòng khám thành công");
      navigate("/rooms");
    } catch {
      alert("Thêm phòng khám thất bại");
    }
  };

  return (
    <section className="p-8 flex-1">
      <PageHeader title="Thêm phòng khám" backTo="/rooms" />

      <Card
        title="Thông tin phòng khám"
        footer={
          <>
            <button type="button" onClick={() => navigate("/rooms")} className={btnSecondary}>
              <i className="fa-solid fa-xmark"></i>
              Hủy
            </button>
            <button type="button" onClick={handleSubmit} className={btnPrimary}>
              <i className="fa-regular fa-floppy-disk"></i>
              Lưu phòng khám
            </button>
          </>
        }
      >
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-6">
          <FormField label="Số phòng" required>
            <input
              type="text"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              placeholder="Nhập số phòng (ví dụ: P.101)"
              className={inputClass}
            />
          </FormField>

          <FormField label="Loại phòng" required>
            <select
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="">-- Chọn loại phòng --</option>
              <option value="Khám">Khám</option>
              <option value="Phẫu thuật">Phẫu thuật</option>
              <option value="Cấp cứu">Cấp cứu</option>
            </select>
          </FormField>

          <FormField label="Khoa" required>
            <select
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="">-- Chọn khoa --</option>
              {departments.map((dept) => (
                <option key={dept.departmentId} value={dept.departmentId}>
                  {dept.departmentName}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Trạng thái" required>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="">-- Chọn trạng thái --</option>
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </FormField>
        </div>

        <div className="p-5 rounded-lg bg-[#f0f7ff] border border-[#cce0ff]">
          <h3 className="text-[14px] font-semibold text-[#1a6cf0] mb-3 flex items-center gap-2">
            <i className="fa-solid fa-circle-info"></i>
            Ghi chú trạng thái:
          </h3>
          <StatusLegend />
        </div>
      </Card>
    </section>
  );
}

export default CreateRoom;
