import { Routes, Route, Navigate } from "react-router-dom";
import Signin from "./users/signin.js";
import Account from "./users/account.js";
import Signup from "./users/signup.js";
import Home from "./Home/index.js";
import Search from "./Search/index.js"
import Players from "./Players/index.js"
import Header from "./Header/index.js";
import './index.css';


function Basketboxd() {
  return (
    <div>
      <Header/>
      <div>
        <Routes>
          <Route path="/"       element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
          <Route path="/search*" element={<Search />} />
          <Route path="/players/:playerName" element={<Players />} />
        </Routes>
      </div>
    </div>
  );
}

export default Basketboxd;
