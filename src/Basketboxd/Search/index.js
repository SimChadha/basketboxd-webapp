import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import getAllPlayers from "./getAllPlayers";
import teamColors from "../teamColors";

function Search() {
  const NBA_STATS_API = "https://nba-stats-db.herokuapp.com/api";
  const [searchParams, setSearchParams] = useSearchParams();
  const playerName = searchParams.get("player");
  const year = searchParams.get("year");
  const [players, setPlayers] = useState([]);
  const playersBySeasonURL = `${NBA_STATS_API}/playerdata/season/${year}`;

  const navigate = useNavigate();

  const fetchPlayers = async () => {
    try {
      setPlayers([]);

      const listOfPlayers = await getAllPlayers(year, 1);
      const filteredPlayers = listOfPlayers.filter((player) => {
        return player.player_name.toLowerCase().startsWith(playerName.toLowerCase());
      });
      const sortedPlayers = filteredPlayers.slice().sort((a, b) => {
        const nameA = a.player_name.toLowerCase();
        const nameB = b.player_name.toLowerCase();
      
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setPlayers(sortedPlayers);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, [year, playerName]);

  const handlePlayerClick = (playerName) => {
    navigate(`/Players/${encodeURIComponent(playerName)}`);
  };

  return (
    <div>
      <h1>Results for players in {year}: {playerName}</h1>

      <div className="d-flex flex-row flex-wrap mb-4" style={{ marginLeft: '30px', marginRight: '30px'}}>
        {players.map((player) => (
          <div className="card" key={player.player_name + player.team} onClick={() => handlePlayerClick(player.player_name)}
          style={{ backgroundColor: teamColors(player.team).background, color: teamColors(player.team).text}}>
            <div className="card-body">
              <p className="card-text">
                <Link
                  to={`/Players/${encodeURIComponent(player.player_name)}`}
                  style={{color: teamColors(player.team).text}}
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
}

export default Search;
