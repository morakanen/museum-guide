import React from 'react';


const UserContainer = ({ user, login, logout }) => {
  return (
    <ul className="loginStatus">
      {user ? (
        <li>
          Hi <strong>{user?.username?.toUpperCase()}</strong>!
          <button onClick={logout} className="btn">
            Logout
          </button>
        </li>
      ) : (
        <li>
          <button onClick={login} className="btn">
            Please Login
          </button>
        </li>
      )}
    </ul>
  );
};

export default UserContainer;