import React from 'react';
import Header from '../components/Header';
import './AuthenticatedLayout.css';

const AuthenticatedLayout = ({ children, user, handleLogout }) => {
  return (
    <div className="authenticated-layout">
      <Header isAuthenticated={true} user={user} handleLogout={handleLogout} />
      <main className="authenticated-main">{children}</main>
    </div>
  );
};

export default AuthenticatedLayout;