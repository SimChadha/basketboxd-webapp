import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import getAllPlayers from "./getAllPlayers";
import teamColors from "../teamColors";
import { RotatingSquare } from 'react-loader-spinner'

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const playerName = searchParams.get("player");
  const year = searchParams.get("year");
  const [players, setPlayers] = useState([]);
  const [queryLoaded, setQueryLoaded] = useState(false);

  const navigate = useNavigate();

  const fetchPlayers = async () => {
    try {
      setQueryLoaded(false);
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
      setQueryLoaded(true);
      console.log("Ending with: " + queryLoaded)
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
      <div className="row justify-content-center">
        <RotatingSquare
          height="100"
          width="100"
          color="#ffffff"
          ariaLabel="rotating-square-loading"
          wrapperClass="justify-content-center"
          strokeWidth="4"
          visible={!queryLoaded}
        />
      </div>

      <div className="d-flex flex-row justify-content-center flex-wrap mb-4" style={{ marginLeft: '30px', marginRight: '30px' }}>
        {players.map((player) => (
          <div className="card" key={player.player_name + player.team} onClick={() => handlePlayerClick(player.player_name)}
          style={{ backgroundColor: teamColors(player.team).background, color: teamColors(player.team).text, margin: '5px'}}>
            <img src={`../../logos/${teamColors(player.team).logo}`} className="card-img-top mx-auto d-block" alt="..."
            style={{ width: '75px', height: '75px' }}></img>
            <div className="card-body">
              <p className="card-text">
                <Link
                  to={`/Players/${encodeURIComponent(player.player_name)}`}
                  style={{ color: teamColors(player.team).text }}
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
