import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
function Players() {
  const { playerName } = useParams();
  const NBA_STATS_API = "https://nba-stats-db.herokuapp.com/api";

  const playerStatsURL = `${NBA_STATS_API}/playerdata/name/${playerName}`;

  const [playerStats, setPlayerStats] = useState([]);;
  const findPlayerStats = async () => {
    const response = await axios.get(playerStatsURL);
    setPlayerStats(response.data.results);
  };
  useEffect(() => {
    findPlayerStats();
  }, []);

  return (
  <div>
    <h1>{playerName}</h1>
    <div className="d-flex flex-row flex-wrap mb-4">
        {playerStats.map((seasonStat) => (
          <div className="card">
            <div className="card-body">
              <p className="card-text">
                {seasonStat.season}<br/>
                Games: {seasonStat.games}<br/>
                PTS {seasonStat.PTS / seasonStat.games}<br/>
                TRB {seasonStat.TRB / seasonStat.games}<br/>
                AST {seasonStat.AST / seasonStat.games}<br/>
                TOV {seasonStat.TOV / seasonStat.games}<br/>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
}
export default Players;
