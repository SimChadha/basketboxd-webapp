import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import * as client from "../users/client";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as reducer from "../users/userReducer";

function Header() {
    const [account, setAccount] = useState(null);
    const { currentUser } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        setAccount(currentUser);
    }, [currentUser]);
    return (
        <div className="d-flex align-items-center">
            <Link
                to={`/`}
                className={`nav-link`}
                style={{ fontSize: '30px' }}
            >
                Basketboxd
            </Link>
            <div className="my-3 mx-auto">
                <Searchbar />
            </div>
            {account !== null && (
                <nav className={`nav`}>
                    <Link
                        to={`/account`}
                        className={`nav-link`}
                        style={{ fontSize: '30px' }}
                    >
                        Account
                    </Link>
                    <Link
                        to={`/`}
                        className={`nav-link`}
                        style={{ fontSize: '30px' }}
                        onClick={async () => {
                            await client.signout();
                            dispatch(reducer.setCurrentUser(null));
                            setAccount(null);
                            navigate("/signin");
                        }}
                    >
                        Sign Out
                    </Link>
                </nav>
            )}
            {account === null &&
                <nav className={`nav`} style={{ marginLeft: 'auto' }}>
                    <Link
                        to={`/signin`}
                        className={`nav-link`}
                        style={{ fontSize: '30px' }}
                    >
                        Sign In
                    </Link>
                    <Link
                        to={`/signup`}
                        className={`nav-link`}
                        style={{ fontSize: '30px' }}
                    >
                        Sign Up
                    </Link>
                </nav>
            }
        </div>
    )
}
export default Header;