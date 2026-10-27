import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header.jsx';
import AdminMenu from '../components/layout/AdminMenu.jsx';
export default function StaffLayout() {
  return (
    <>
      <Header />
      <div className="staff-layout">
        <AdminMenu />
        <main className="staff-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}
