import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./userReducer";

function Signup() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: ""
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signup = async () => {
    try {
      const result = await client.signup(credentials);
      if (!result.message) {
        dispatch(setCurrentUser(result));
        navigate("/account");
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12">
          <h1>Signup</h1>
          {error && <div>{error}</div>}
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              value={credentials.firstName}
              onChange={(e) =>
                setCredentials({ ...credentials, firstName: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              value={credentials.lastName}
              onChange={(e) =>
                setCredentials({ ...credentials, lastName: e.target.value })
              }
            />
          </div>
          <button className="btn btn-primary" onClick={signup}>
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;