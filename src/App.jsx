import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import DepartmentList from './pages/Departments/DepartmentList'
import CreateDepartment from './pages/Departments/CreateDepartment'
import DepartmentDetail from './pages/Departments/DepartmentDetail'
import UpdateDepartment from './pages/Departments/UpdateDepartment'
import DoctorList from './pages/Doctors/DoctorList'
import DoctorDetail from './pages/Doctors/DoctorDetail'
import CreateDoctor from './pages/Doctors/CreateDoctor'
import UpdateDoctor from './pages/Doctors/UpdateDoctor'
import PatientList from './pages/Patients/PatientList'
import PatientDetail from './pages/Patients/PatientDetail'
import CreatePatient from './pages/Patients/CreatePatient'
import UpdatePatient from './pages/Patients/UpdatePatient'
import RoomList from './pages/Rooms/RoomList'
import RoomDetail from './pages/Rooms/RoomDetail'
import CreateRoom from './pages/Rooms/CreateRoom'
import UpdateRoomStatus from './pages/Rooms/UpdateRoomStatus'
import AppointmentList from './pages/Appointments/AppointmentList'
import AppointmentDetail from './pages/Appointments/AppointmentDetail'
import CreateAppointment from './pages/Appointments/CreateAppointment'
import UpdateDiagnosis from './pages/Appointments/UpdateDiagnosis'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DepartmentList />} />
        <Route path="departments" element={<DepartmentList />} />
        <Route path="departments/create" element={<CreateDepartment />} />
        <Route path="departments/:id" element={<DepartmentDetail />} />
        <Route path="departments/:id/edit" element={<UpdateDepartment />} />
        <Route path="doctors" element={<DoctorList />} />
        <Route path="doctors/:id" element={<DoctorDetail />} />
        <Route path="doctors/create" element={<CreateDoctor />} />
        <Route path="doctors/:id/edit" element={<UpdateDoctor />} />
        <Route path="patients" element={<PatientList />} />
        <Route path="patients/:id" element={<PatientDetail />} />
        <Route path="patients/create" element={<CreatePatient />} />
        <Route path="patients/:id/edit" element={<UpdatePatient />} />
        <Route path="rooms" element={<RoomList />} />
        <Route path="rooms/create" element={<CreateRoom />} />
        <Route path="rooms/:id" element={<RoomDetail />} />
        <Route path="rooms/:id/edit" element={<UpdateRoomStatus />} />
        <Route path="appointments" element={<AppointmentList />} />
        <Route path="appointments/create" element={<CreateAppointment />} />
        <Route path="appointments/:id" element={<AppointmentDetail />} />
        <Route path="appointments/:id/diagnosis" element={<UpdateDiagnosis />} />
      </Route>
    </Routes>
  )
}

export default App