import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
const links = [
  ['/admin', 'Dashboard', [2, 3]],
  ['/admin/my-jobs', 'My jobs', [1]],
  ['/admin/orders', 'Orders', [1, 2, 3]],
  ['/admin/order/new', 'New order', [2, 3]],
  ['/admin/customers', 'Customers', [1, 2, 3]],
  ['/admin/services', 'Services', [3]],
  ['/admin/employees', 'Employees', [3]],
  ['/admin/settings', 'Settings', [3]],
  ['/admin/profile', 'My account', [1, 2, 3]],
];
export default function AdminMenu() {
  const { employee } = useAuth();
  return (
    <aside className="admin-menu">
      <nav aria-label="Staff navigation">
        {links
          .filter(([, , roles]) => roles.includes(employee?.role_id))
          .map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/admin'}>
              {label}
            </NavLink>
          ))}
      </nav>
    </aside>
  );
}
