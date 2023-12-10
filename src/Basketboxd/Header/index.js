import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Searchbar from "./Searchbar";
import * as client from "../users/client";
import { useNavigate } from "react-router-dom";

function Header() {
    const [account, setAccount] = useState(null);
    const fetchAccount = async () => {
        const account = await client.account();
        if (typeof account !== 'number') { // if account is not a number, then it is an object
            setAccount(account);
        }
    };
    const navigate = useNavigate();
    useEffect(() => {
        fetchAccount();
    });
    return (
        <div style={{ display: 'flex' }}>
            <Link
                to={`/`}
                className={`nav-link`}
                style={{ fontSize: '30px' }}
            >
                Basketboxd
            </Link>
            <Searchbar />
            {account !== null && (
                <nav className={`nav`} style={{ marginLeft: 'auto' }}>
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