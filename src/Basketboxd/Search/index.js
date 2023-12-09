import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getPlayerStats } from "../Players/client";
import axios from "axios";
import lemickey from './lemickey.jpg';

function Search() {
  const NBA_STATS_API = "https://nba-stats-db.herokuapp.com/api";

  const [searchParams, setSearchParams] = useSearchParams();
  const playerName = searchParams.get("player");
  const year = searchParams.get("year");

  const [players, setPlayers] = useState([]);
  const playersBySeasonURL = `${NBA_STATS_API}/playerdata/season/${year}`;
  const findAllPlayersInSeason = async () => {
    const response = await axios.get(playersBySeasonURL);
    setPlayers(response.data.results);
  };
  useEffect(() => {
    findAllPlayersInSeason();
  }, []);

  return (
    <div>
      <h1>Results for players in {year}: {playerName}</h1>
      <Link
                  key={playerName}
                  to={`/Players/${playerName}`}
                  className="a"
                >
                  {playerName}
                </Link>

      <div className="d-flex flex-row flex-wrap mb-4">
        {players.map((player) => (
          <div className="card">
            <img className="card-photo card-img-top" src={lemickey} alt="..." />
            <div className="card-body">
              <p className="card-text">
                <Link
                  key={player.player_name}
                  to={`/Players/${player.player_name}`}
                >
                  {player.player_name}
                </Link>
                <br />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
