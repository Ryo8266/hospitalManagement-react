import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

function Layout() {
  return (
    <div className="flex min-h-screen bg-[#f5f7fb] font-inter">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout