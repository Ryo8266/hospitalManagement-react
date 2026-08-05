import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import DepartmentList from './pages/Departments/DepartmentList'
import CreateDepartment from './pages/Departments/CreateDepartment'
import DepartmentDetail from './pages/Departments/DepartmentDetail'
import UpdateDepartment from './pages/Departments/UpdateDepartment'
import DoctorList from './pages/Doctors/DoctorList'
import DoctorDetail from './pages/Doctors/DoctorDetail'

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
      </Route>
    </Routes>
  )
}

export default App