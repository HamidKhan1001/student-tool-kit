import React from 'react';
import Header from '../components/Header';

const AuthenticatedLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      {/* Add common footer here if needed */}
    </>
  );
};

export default AuthenticatedLayout;