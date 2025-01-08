import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import '../assets/images/aelogo.png';
const Header = ({ isAuthenticated, user, handleLogout }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const apiUrlRootPath = process.env.REACT_APP_API_URL;
  const apiUploadRootPath = process.env.REACT_APP_FOR_UPLOADS_URL;
  return (
    <header className="header fixed-top">
      <nav className="navbar">
        <div className="logo-section">
          <Link to="/" className="brand">
            <img src="/aelogo.png" alt="AE" className="logo-img" />
            <span className="logo-text">AdmissionsExpress</span>
          </Link>
        </div>

        <div className="nav-sections">
          {isAuthenticated && user ? (
            <>
              <div className="nav-links">
                <Link to="/dashboard" className="nav-item">
                  <i className="fas fa-home"></i>
                  <span>Dashboard</span>
                </Link>
                {user?.role === 'admin' && (
                <Link to={`${apiUploadRootPath}/admin`}  className="nav-item" target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-shield-alt"></i>
                  <span>Admin Panel</span>
                </Link>
              )}
              </div>

              <div className="user-controls">
                <div className="notification-center" onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
                  <i className="fas fa-bell"></i>
                  {/* <span className="notification-badge">2</span> */}
                  <div className={`notification-dropdown ${isNotificationOpen ? 'show' : ''}`}>
                    {/* <div className="notification-header">
                      <h3>Notifications</h3>
                      <span>Mark all as read</span>
                    </div>
                    <div className="notification-list">
                      <div className="notification-item unread">
                        <i className="fas fa-circle"></i>
                        <span>Your application was reviewed</span>
                      </div>
                      <div className="notification-item">
                        <span>Document upload successful</span>
                      </div>
                    </div> */}
                  </div>
                </div>

                <div className="user-profile">
                  <div className="user-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="user-dropdown">
                    <div className="user-header">
                      <span className="user-name">{user.name}</span>
                      <span className="user-email">{user.email}</span>
                    </div>
                    {/* <div className="dropdown-content">
                      <Link to="/profile" className="dropdown-item">
                        <i className="fas fa-user"></i>
                        <span>My Profile</span>
                      </Link>
                      <Link to="/settings" className="dropdown-item">
                        <i className="fas fa-cog"></i>
                        <span>Settings</span>
                      </Link>
                      <Link to="/help" className="dropdown-item">
                        <i className="fas fa-question-circle"></i>
                        <span>Help Center</span>
                      </Link>
                      <div className="dropdown-divider"></div>
                      <button onClick={handleLogout} className="dropdown-item logout">
                        <i className="fas fa-sign-out-alt"></i>
                        <span>Sign Out</span>
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="auth-controls">
              <Link to="/auth" className="auth-btn login">Sign In</Link>
              <Link to="/auth" className="auth-btn register">Get Started</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
