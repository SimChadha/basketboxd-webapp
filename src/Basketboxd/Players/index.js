import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import teamColors from "../teamColors";
import PlayerReviews from "./PlayerReviews";
import Rating from '@mui/material/Rating';
import { RotatingSquare } from "react-loader-spinner";

function Players() {
  const { playerName } = useParams();
  const NBA_STATS_API = "https://nba-stats-db.herokuapp.com/api";

  const playerStatsURL = `${NBA_STATS_API}/playerdata/name/${playerName}`;
  const [queryLoaded, setQueryLoaded] = useState(false);
  const [playerStats, setPlayerStats] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2023");
  const [avg, setAvg] = useState(0);

  const findPlayerStats = async () => {
    setQueryLoaded(false);
    const response = await axios.get(playerStatsURL);
    setPlayerStats(response.data.results);
    setQueryLoaded(true);
  };
  useEffect(() => {
    findPlayerStats();
  }, []);

  const filterStatsByYear = () => {
    if (!selectedYear) {
      return playerStats;
    }
    return playerStats.filter(
      (seasonStat) => seasonStat.season.toString() === selectedYear
    );
  };

  const calculateCareerAverages = () => {
    const totalGames = playerStats.reduce((acc, seasonStat) => acc + seasonStat.games, 0);
    const totalPTS = playerStats.reduce((acc, seasonStat) => acc + seasonStat.PTS, 0);
    const totalTRB = playerStats.reduce((acc, seasonStat) => acc + seasonStat.TRB, 0);
    const totalAST = playerStats.reduce((acc, seasonStat) => acc + seasonStat.AST, 0);
    const totalTOV = playerStats.reduce((acc, seasonStat) => acc + seasonStat.TOV, 0);

    return {
      PTS: (totalPTS / totalGames).toFixed(1),
      TRB: (totalTRB / totalGames).toFixed(1),
      AST: (totalAST / totalGames).toFixed(1),
      TOV: (totalTOV / totalGames).toFixed(1),
    };
  };

  const careerAverages = calculateCareerAverages();

  return (
    <div className="container">
      <h1 className="text-center">{playerName}</h1>
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
      <div className="row justify-content-center">
        <div className="col-md-4">
          <label htmlFor="yearSelector"><h2>Stats for: </h2></label>
            <select
              id="yearSelector"
              onChange={(e) => setSelectedYear(e.target.value)}
              value={selectedYear}
            >
              {playerStats.map((seasonStat) => (
                <option key={seasonStat.season + seasonStat.team} value={seasonStat.season}>
                  {seasonStat.season}
                </option>
              ))}
            </select>
            {filterStatsByYear().map((seasonStat) => (
              <div key={seasonStat.season + seasonStat.team} className="card"
              style={{ backgroundColor: teamColors(seasonStat.team).background, color: teamColors(seasonStat.team).text}}>
                <img src={`../../logos/${teamColors(seasonStat.team).logo}`} className="card-img-top mx-auto d-block" alt="..."
            style={{ width: '75px', height: '75px' }}></img>
                <div className="card-body">
                  <p className="card-text">
                    {teamName(seasonStat.team)}
                    <br />
                    {seasonStat.season - 1} - {seasonStat.season}
                    <br />
                    Games: {seasonStat.games}
                    <br />
                    PTS {(seasonStat.PTS / seasonStat.games).toFixed(1)}
                    <br />
                    TRB {(seasonStat.TRB / seasonStat.games).toFixed(1)}
                    <br />
                    AST {(seasonStat.AST / seasonStat.games).toFixed(1)}
                    <br />
                    TOV {(seasonStat.TOV / seasonStat.games).toFixed(1)}
                  </p>
                </div>
              </div>
            ))}
        </div>
        <div className="col-md-4">
          <h2> Career Stats </h2>
        <div key="careerStats" className="card">
                <div className="card-body">
                  <p className="card-text">
                  PTS {careerAverages.PTS}<br />
                  TRB {careerAverages.TRB}<br />
                  AST {careerAverages.AST}<br />
                  TOV {careerAverages.TOV}<br /><br/>
                  {avg !== null ? (
                    <>
                    Average Rating <br/>
                    <Rating name="read-only" value={avg} precision={0.5} readOnly />
                    </>
                  ) : null}
                  </p>
                </div>
              </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <PlayerReviews playerName={playerName} newReviewHandler={(newAvg) => {console.log("Inside w/ avg ", newAvg);setAvg(newAvg)}} />
      </div>
    </div>
  );
}

function teamName(teamCode) {
  switch (teamCode) {
    case "ATL":
      return "Atlanta Hawks";
    case "BOS":
      return "Boston Celtics";
    case "BRK":
      return "Brooklyn Nets";
    case "CHO":
      return "Charlotte Hornets";
    case "CHI":
      return "Chicago Bulls";
    case "CLE":
      return "Cleveland Cavaliers";
    case "DAL":
      return "Dallas Mavericks";
    case "DEN":
      return "Denver Nuggets";
    case "DET":
      return "Detroit Pistons";
    case "GSW":
      return "Golden State Warriors";
    case "HOU":
      return "Houston Rockets";
    case "IND":
      return "Indiana Pacers";
    case "LAC":
      return "Los Angeles Clippers";
    case "LAL":
      return "Los Angeles Lakers";
    case "MEM":
      return "Memphis Grizzlies";
    case "MIA":
      return "Miami Heat";
    case "MIL":
      return "Milwaukee Bucks";
    case "MIN":
      return "Minnesota Timberwolves";
    case "NOP":
      return "New Orleans Pelicans";
    case "NYK":
      return "New York Knicks";
    case "OKC":
      return "Oklahoma City Thunder";
    case "ORL":
      return "Orlando Magic";
    case "PHI":
      return "Philadelphia 76ers";
    case "PHO":
      return "Phoenix Suns";
    case "POR":
      return "Portland Trail Blazers";
    case "SAC":
      return "Sacramento Kings";
    case "SAS":
      return "San Antonio Spurs";
    case "SEA":
      return "Seattle Supersonics";
    case "TOR":
      return "Toronto Raptors";
    case "UTA":
      return "Utah Jazz";
    case "WAS":
      return "Washington Wizards";
    case "NOH":
    case "NOK":
      return "New Orleans Hornets";
    default:
      return "Unknown Team";
  }
}
export default Players;
