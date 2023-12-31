import TopPlayers from "./TopPlayers";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function Home() {

  const { currentUser } = useSelector((state) => state.userReducer);

  return (
    <div>
        {currentUser !== null && (
          <h3>Welcome {currentUser?.username}!</h3>
        )}
        <h1>Top Players for 2022-2023</h1>
        <TopPlayers />
    </div>
  );
}
export default Home;
