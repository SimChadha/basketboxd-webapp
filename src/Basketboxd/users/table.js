import React, { useState, useEffect } from "react";
import * as client from "./client";
import { Link } from "react-router-dom";
import {
  BsFillCheckCircleFill,
  BsTrash3Fill,
  BsPencil,
  BsPlusCircleFill,
} from "react-icons/bs";
import { useSelector } from "react-redux";
function UserTable() {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  const [user, setUser] = useState({
    username: "",
    password: "",
    role: "USER",
    firstName: "",
    lastName: "",
  });
  const resetUser = () => {
    setUser({ username: "", password: "", role: "USER", firstName: "", lastName: "" });
  }
  const { currentUser } = useSelector((state) => state.userReducer);
  const createUser = async () => {
    try {
      const newUser = await client.createUser(user);
      setUsers([newUser, ...users]);
    } catch (err) {
      console.log(err);
    }
  };
  const selectUser = async (user) => {
    try {
      const u = await client.findUserById(user._id);
      setUser(u);
    } catch (err) {
      console.log(err);
    }
  };
  const updateUser = async () => {
    try {
      const status = await client.updateUser(user);
      setUsers(users.map((u) => (u._id === user._id ? user : u)));
    } catch (err) {
      console.log(err);
    }
  };
  const deleteUser = async (user) => {
    try {
      await client.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      {currentUser !== null && currentUser.role === "ADMIN" &&
        <>
          <h1>User List</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
              <tr>
                <td>
                  <input
                    value={user.username}
                    placeholder="Username"
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    value={user.firstName}
                    placeholder="First Name"
                    onChange={(e) =>
                      setUser({ ...user, firstName: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    value={user.lastName}
                    placeholder="Last Name"
                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                  />
                </td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => setUser({ ...user, role: e.target.value })}
                  >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </td>
                <td>
                  <button className="btn bg-none me-2">
                    <BsPlusCircleFill
                      onClick={createUser}
                      title="Create User"
                      className="text-primary fs-1 text"
                    />
                  </button>
                  <button className="btn bg-none me-2">
                    <BsFillCheckCircleFill
                      onClick={updateUser}
                      title="Save User"
                      className="me-2 text-success fs-1 text"
                    />
                  </button>
                  <button className="btn bg-none me-2">
                    <BsTrash3Fill
                      className="text-danger fs-1 text"
                      onClick={resetUser} />
                  </button>
                </td>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <Link to={`/account/${user.username}`}>
                      {user.username}
                    </Link>
                  </td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="btn btn-warning me-2">
                      <BsPencil onClick={() => selectUser(user)} />
                    </button>
                    <button className="btn btn-danger me-2">
                      <BsTrash3Fill onClick={() => deleteUser(user)} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      }
      {currentUser?.role !== "ADMIN" &&
        <>
          <h1 className="text-danger">Access Denied</h1>
          <h3 className="text-danger">You must be an admin to view this page</h3>
        </>
      }
    </div>
  );
}
export default UserTable;
