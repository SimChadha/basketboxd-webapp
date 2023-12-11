import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import teamColors from "../../teamColors";
function TopPlayers() {
  const NBA_STATS_API = "https://nba-stats-db.herokuapp.com/api";
  const topScorersURL = `${NBA_STATS_API}/playerdata/topscorers/total/season/2023`;
  const topAssistsURL = `${NBA_STATS_API}/top_assists/totals/2023`;
  const topReboundsURL = `${NBA_STATS_API}/top_rebounds/totals/2023`;

  const [topScorers, setTopScorers] = useState([]);
  const [topAssisters, setTopAssisters] = useState([]);
  const [topRebounders, setTopRebounders] = useState([]);

  const getTopScorers = async () => {
    const response = await axios.get(topScorersURL);
    const topTen = response.data.results.slice(0, 10);
    setTopScorers(topTen);
  };
  const getTopAssisters = async () => {
    const response = await axios.get(topAssistsURL);
    const topTen = response.data.results.slice(0, 10);
    setTopAssisters(topTen);
  };
  const getTopRebounders = async () => {
    const response = await axios.get(topReboundsURL);
    const topTen = response.data.results.slice(0, 10);
    setTopRebounders(topTen);
  };
  useEffect(() => {
    getTopScorers();
    getTopAssisters();
    getTopRebounders();
  }, []);

  const navigate = useNavigate();

  const handlePlayerClick = (playerName) => {
    navigate(`/Players/${encodeURIComponent(playerName)}`);
  };


  return (
    <div>
        <h2>Points</h2>
        <div className="d-flex justify-content-center flex-wrap mb-4" style={{ marginLeft: '30px', marginRight: '30px'}}>
        {topScorers.map((player) => (
          <div className="card" key={player.player_name} onClick={() => handlePlayerClick(player.player_name)}
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
                {player.PTS}
              </p>
            </div>
          </div>
        ))}
        </div>
        <h2>Assists</h2>
        <div className="d-flex justify-content-center flex-wrap mb-4" style={{ marginLeft: '30px', marginRight: '30px'}}>
        {topAssisters.map((player) => (
          <div className="card" key={player.player_name} onClick={() => handlePlayerClick(player.player_name)}
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
                {player.AST}
              </p>
            </div>
          </div>
        ))}
        </div>
        <h2>Rebounds</h2>
        <div className="d-flex justify-content-center flex-wrap mb-4" style={{ marginLeft: '30px', marginRight: '30px'}}>
        {topRebounders.map((player) => (
          <div className="card" key={player.player_name} onClick={() => handlePlayerClick(player.player_name)}
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
                {player.TRB}
              </p>
            </div>
          </div>
        ))}
        </div>
    </div>
  )
}

export default TopPlayers;