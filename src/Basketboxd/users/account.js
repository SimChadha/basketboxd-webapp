import * as client from "./client";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as reducer from "./userReducer";
function Account() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [account, setAccount] = useState(null);
  const findUserById = async (id) => {
    const user = await client.findUserById(id);
    setAccount(user);
  };
  const navigate = useNavigate();
  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
  };
  const save = async () => {
    await client.updateUser(account);
  };
  const signout = async () => {
    await client.signout();
    dispatch(reducer.setCurrentUser(null));
    setAccount(null);
    navigate("/signin");
  };
  useEffect(() => {
    if (id) {
      findUserById(id);
    } else {
      fetchAccount();
    }
  }, []);
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12">
          <h1>Account</h1>
          {account && (
            <>
              <div>
                <input
                  value={account.firstName}
                  placeholder="First Name"
                  className="form-control"
                  onChange={(e) =>
                    setAccount({ ...account, firstName: e.target.value })
                  }
                />
              </div>
              <div>
                <input
                  value={account.lastName}
                  placeholder="Last Name"
                  className="form-control"
                  onChange={(e) =>
                    setAccount({ ...account, lastName: e.target.value })
                  }
                />
              </div>
              <div>
                <input
                  value={account.password}
                  placeholder="Password"
                  className="form-control"
                  onChange={(e) =>
                    setAccount({ ...account, password: e.target.value })
                  }
                />
              </div>
              <div>
                <input
                  value={account.email}
                  placeholder="Email"
                  className="form-control"
                  onChange={(e) => setAccount({ ...account, email: e.target.value })}
                />
              </div>
              <select
                value={account.role}
                className="form-control"
                onChange={(e) => setAccount({ ...account, role: e.target.value })}
              >
                <option value="USER">User</option>
                {account.role === "ADMIN" && <option value="ADMIN">Admin</option>}
              </select>
              <button onClick={save} className="btn btn-primary w-100 mb-1">Save</button>
              <button onClick={signout} className="btn btn-danger w-100 mb-1">Signout</button>
              {account.role === "ADMIN" &&
                <Link to="/admin/users" className="btn btn-warning w-100">
                  Users
                </Link>
              }
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Account;
