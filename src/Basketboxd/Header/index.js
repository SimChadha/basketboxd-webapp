import { React, useState } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Searchbar from "./Searchbar";

function Header() {
    return (
        <div style={{display: 'flex'}}>
            <Link
                    to={`/`}
                    className={`nav-link`}
                    style={{fontSize: '30px'}}
                >
            Basketboxd
            </Link>
            <Searchbar/>
            <nav className={`nav`} style={{ marginLeft: 'auto' }}>
                <Link
                    to={`/signin`}
                    className={`nav-link`}
                    style={{fontSize: '30px'}}
                >
                    Sign In
                </Link>
                <Link
                    to={`/signup`}
                    className={`nav-link`}
                    style={{fontSize: '30px'}}
                >
                    Sign Up
                </Link>
            </nav>
        </div>
    )
}
export default Header;