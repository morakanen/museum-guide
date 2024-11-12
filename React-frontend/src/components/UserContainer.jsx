import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/userstateSlice';

const UserContainer = () => {
  const { isAuthenticated, user } = useSelector((state) => state.userstate);
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div>
      <h3>Welcome, {user.username}!</h3>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};

export default UserContainer;