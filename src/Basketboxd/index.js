import { Routes, Route } from "react-router-dom";
import Signin from "./users/signin.js";
import Account from "./users/account.js";
import UserProfile from "./users/userProfile.js";
import Signup from "./users/signup.js";
import Home from "./Home/index.js";
import Search from "./Search/index.js"
import Players from "./Players/index.js"
import Header from "./Header/index.js";
import UserTable from "./users/table.js";
import store from "./store/index.js";
import { Provider } from "react-redux";
import './index.css';


function Basketboxd() {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<Account />} />
            <Route path="/account/:userId" element={<UserProfile />} />
            <Route path="/search/*" element={<Search />} />
            <Route path="/admin/users" element={<UserTable />} />
            <Route path="/players/:playerName" element={<Players />} />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}

export default Basketboxd;
