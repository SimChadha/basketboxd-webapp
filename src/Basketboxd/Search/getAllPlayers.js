import axios from "axios";

async function getAllPlayers(year, pageNum) {
  const NBA_STATS_API = "https://nba-stats-db.herokuapp.com/api";
  const playersBySeasonURL = `${NBA_STATS_API}/playerdata/season/${year}/?page=${pageNum}`;

  try {
    const response = await axios.get(playersBySeasonURL);
    const resultArray = response.data.results;

    if (response.data.next === null) {
      return resultArray;
    } else {
      const nextPageResults = await getAllPlayers(year, pageNum + 1);
      return resultArray.concat(nextPageResults);
    }
  } catch (error) {
    console.error("Error fetching players:", error);
    return [];
  }
}

export default getAllPlayers;
