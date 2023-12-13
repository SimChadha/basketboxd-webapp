import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import * as client from "../users/client";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as reducer from "../users/userReducer";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
    const [account, setAccount] = useState(null);
    const { currentUser } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        setAccount(currentUser);
    }, [currentUser]);
    return (
        <Navbar collapseOnSelect expand="lg" className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" className="me-2" />
            <Navbar.Brand className="navbar navbar-light bg-none ms-4">
                <Nav.Link
                    href="/"
                    style={{ fontSize: '30px', color: "white", fontFamily: 'Trebuchet MS, sans-serif' }}
                >
                    Basketboxd🏀
                </Nav.Link>
            </Navbar.Brand>
            <Nav className="justify-content-end">
                {account !== null && (
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link
                                to={`/account`}
                                className={`nav-link`}
                                style={{ fontSize: '30px' }}
                            >
                                Account
                            </Link>
                        </li>
                        <li className="nav-item">
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
                        </li>
                    </ul>
                )}
                {account === null &&
                    <ul className="navbar-nav mx-auto me-2">
                        <li className="nav-item">
                                <Link
                                    to={`/signin`}
                                    className={`nav-link text-primary`}
                                    style={{ fontSize: '30px' }}
                                >
                                    Sign In
                                </Link>
                        </li>
                        <li className="nav-item">
                                <Link
                                    to={`/signup`}
                                    className={`nav-link text-primary`}
                                    style={{ fontSize: '30px' }}
                                >
                                    Sign Up
                                </Link>
                        </li>
                    </ul>
                }
            </Nav>
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav>
                    <Searchbar />
                </Nav>
            </Navbar.Collapse>
        </Navbar >
    )
}
export default Header;