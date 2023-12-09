

import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  return (
    <div>
      <h2>Welcome, {user ? user.email : 'Guest'}!</h2>
    </div>
  );
};

export default Profile;


