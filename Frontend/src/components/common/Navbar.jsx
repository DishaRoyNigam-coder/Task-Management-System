import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/dashboard">📋 Task Manager</Link>
      <div>
        <span>{user?.name}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}