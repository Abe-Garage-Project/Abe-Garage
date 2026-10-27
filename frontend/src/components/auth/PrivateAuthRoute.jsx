import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
export default function PrivateAuthRoute({ roles = [1, 2, 3] }) {
  const { checking, isAuthenticated, employee } = useAuth();
  const location = useLocation();
  if (checking) return <p role="status">Checking session…</p>;
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  if (!roles.includes(employee.role_id)) return <Navigate to="/unauthorized" replace />;
  return <Outlet />;
}
