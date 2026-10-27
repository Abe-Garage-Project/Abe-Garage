import { Outlet } from 'react-router-dom';
export default function PrintLayout() {
  return (
    <main className="print-document">
      <Outlet />
    </main>
  );
}
