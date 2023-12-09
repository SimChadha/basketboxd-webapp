import axios from "axios";
const NBA_STATS_API = "https://nba-stats-db.herokuapp.com/api";

const request = axios.create({
    withCredentials: true,
}); 

export const getAllPlayersBySeason = async (season = 2023) => {
    const response = await request.get(`${NBA_STATS_API}/playerdata/season/${season}`);
    return response.data;
};

export const getPlayerStats = async (playerName) => {
    const response = await request.get(`${NBA_STATS_API}/playerdata/name/${playerName}`);
    return response.data;
};