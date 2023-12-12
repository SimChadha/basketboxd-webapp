import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as client from './client';

const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const fetchUser = async () => {
    const userFromClient = await client.findUserByUsername(username);
    setUser(userFromClient);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <h1>User Info</h1>
      <div className="list-group">
        <div className="list-group-item">
          <h4 className="list-group-item-heading">Username</h4>
          <p className="list-group-item-text">{user?.username} </p>
        </div>
        <div className="list-group-item">
          <h4 className="list-group-item-heading">Name</h4>
          <p className="list-group-item-text">{user?.firstName} {user?.lastName}</p>
        </div>
        <div className="list-group-item">
          <h4 className="list-group-item-heading">Role</h4>
          <p className="list-group-item-text">{user?.role}</p>
        </div>
      </div>
      <h1>Reviews</h1>
    </div>
  );
};

export default UserProfile;
