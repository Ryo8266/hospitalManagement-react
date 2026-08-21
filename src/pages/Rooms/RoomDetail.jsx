import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import TableCard from "../../components/ui/TableCard";
import Pagination from "../../components/ui/Pagination";
import StatusBadge from "../../components/ui/StatusBadge";
import { btnPrimary, btnDanger, thClass, tdClass } from "../../components/ui/styles";
import { formatDate, formatTime } from "../../utils/format";

const PAGE_SIZE = 5;

function RoomDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [page, setPage] = useState(1);

  const fetchRoom = async () => {
    try {
      const res = await api.get(`/rooms/${id}`);
      setRoom(res.data);
    } catch {
      console.log("Lỗi khi lấy dữ liệu phòng");
    }
  };

  useEffect(() => {
    fetchRoom();
  }, [id]);

  const deleteRoom = async () => {
    if (!confirm("Bạn có chắc muốn xóa phòng khám này?")) return;
    try {
      await api.delete(`/rooms/${id}`);
      navigate("/rooms");
    } catch (err) {
      if (err.response?.status === 400) {
        alert("Không thể xóa: Phòng còn lịch khám");
      } else {
        alert("Xóa thất bại");
      }
    }
  };

  if (!room) {
    return (
      <section className="p-8 flex-1 flex items-center justify-center">
        <p className="text-[15px] text-[#6b7280]">Đang tải...</p>
      </section>
    );
  }

  const appointments = room.appointments || [];
  const pageAppointments = appointments.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="p-8 flex-1">
      <PageHeader title="Chi tiết phòng khám" backTo="/rooms">
        <button
          type="button"
          onClick={() => navigate(`/rooms/${id}/edit`)}
          className={btnPrimary}
        >
          <i className="fa-solid fa-pen"></i>
          Cập nhật trạng thái
        </button>
        <button type="button" onClick={deleteRoom} className={btnDanger}>
          <i className="fa-regular fa-trash-can"></i>
          Xóa
        </button>
      </PageHeader>

      <Card title="Thông tin phòng khám" className="mb-6">
        <div className="grid grid-cols-4 gap-6">
          <div>
            <div className="text-[14px] text-[#6b7280] mb-1.5">Mã phòng</div>
            <div className="text-[15px] font-medium text-[#1f2937]">{room.id}</div>
          </div>
          <div>
            <div className="text-[14px] text-[#6b7280] mb-1.5">Số phòng</div>
            <div className="text-[15px] font-medium text-[#1f2937]">{room.roomNumber}</div>
          </div>
          <div>
            <div className="text-[14px] text-[#6b7280] mb-1.5">Loại phòng</div>
            <div className="text-[15px] font-medium text-[#1f2937]">{room.roomType}</div>
          </div>
          <div>
            <div className="text-[14px] text-[#6b7280] mb-1.5">Khoa</div>
            <div className="text-[15px] font-medium text-[#1f2937]">{room.departmentName}</div>
          </div>
          <div>
            <div className="text-[14px] text-[#6b7280] mb-1.5">Trạng thái</div>
            <StatusBadge status={room.status} />
          </div>
        </div>
      </Card>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[18px] font-semibold text-[#1f2937]">Lịch khám tại phòng</h2>
        <div className="bg-[#f3f4f6] px-4 py-2 rounded-lg text-[14px] font-semibold text-[#374151]">
          Tổng số: {appointments.length} lịch khám
        </div>
      </div>

      <TableCard
        minWidth="800px"
        pagination={
          <Pagination
            page={page}
            pageSize={PAGE_SIZE}
            total={appointments.length}
            unit="lịch khám"
            onChange={setPage}
          />
        }
      >
        <thead className="bg-[#f8fafc]">
          <tr>
            <th className={thClass}>STT</th>
            <th className={thClass}>Ngày khám</th>
            <th className={thClass}>Giờ khám</th>
            <th className={thClass}>Bệnh nhân</th>
            <th className={thClass}>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {pageAppointments.map((apt, index) => (
            <tr key={apt.id ?? index} className="transition-colors hover:bg-[#f9fbff]">
              <td className={tdClass}>{(page - 1) * PAGE_SIZE + index + 1}</td>
              <td className={tdClass}>{formatDate(apt.appointmentDate)}</td>
              <td className={tdClass}>{formatTime(apt.appointmentTime)}</td>
              <td className={tdClass}>{apt.patient || "-"}</td>
              <td className={tdClass}>
                <StatusBadge status={apt.status} />
              </td>
            </tr>
          ))}
          {pageAppointments.length === 0 && (
            <tr>
              <td colSpan={5} className="py-10 text-center text-[14px] text-[#6b7280]">
                Chưa có lịch khám nào tại phòng này
              </td>
            </tr>
          )}
        </tbody>
      </TableCard>
    </section>
  );
}

export default RoomDetail;
