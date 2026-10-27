import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <header className="site-header">
      <Link className="brand" to="/">
        ABE <span>GARAGE</span>
      </Link>
      <nav aria-label="Main navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        {isAuthenticated ? (
          <>
            <NavLink to="/admin">Workspace</NavLink>
            <button type="button" onClick={logout}>
              Log out
            </button>
          </>
        ) : (
          <NavLink to="/login">Staff login</NavLink>
        )}
      </nav>
    </header>
  );
}
