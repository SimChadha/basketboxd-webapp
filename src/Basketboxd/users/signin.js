import * as client from "./client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./userReducer";

function Signin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signin = async () => {
    const userFromClient = await client.signin(credentials);
    await dispatch(setCurrentUser(userFromClient));
    navigate("/account");
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 w-50">
          <h1>Signin</h1>
          <input className="form-control" placeholder="Username" value={credentials.username} onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
          <br />
          <input className="form-control" placeholder="Password" type='password' value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
          <button className="btn btn-primary" onClick={signin}> Signin </button>
        </div>
      </div>
    </div>
  );
}
export default Signin;