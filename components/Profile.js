import React, { useState } from 'react';

const Profile = ({ user, onLogout }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => setDropdownVisible(!isDropdownVisible);

  return (
    <div className="profile-container">
      <div className="profile-icon" onClick={toggleDropdown}>
        {user ? user.name.charAt(0).toUpperCase() : 'U'}
      </div>
      {isDropdownVisible && (
        <div className="dropdown-menu">
          <button onClick={onLogout}>Logout</button>
          <button onClick={() => alert('Settings')}>Settings</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
