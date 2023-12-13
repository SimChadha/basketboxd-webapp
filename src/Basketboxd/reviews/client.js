import axios from "axios";
export const BASE_API =
  process.env.REACT_APP_API_BASE || "http://localhost:4000/api";
export const REVIEWS_API = `${BASE_API}/reviews`;
const request = axios.create({
  withCredentials: true,
});
export const createReview = async (review) => {
  const response = await request.post(`${REVIEWS_API}`, review);
  return response.data;
};
export const findAllReviews = async () => {
  const response = await request.get(`${REVIEWS_API}`);
  return response.data;
};
export const findReviewsByUserId = async (userId) => {
  const response = await request.get(`${REVIEWS_API}/${userId}`);
  return response.data;
};
export const findReviewsByUsername = async (username) => {
  const response = await request.get(`${REVIEWS_API}/username/${username}`);
  return response.data;
};
export const findReviewsByPlayerName = async (playerName) => {
  const response = await request.get(`${REVIEWS_API}/playerName/${playerName}`);
  return response.data;
};
export const updateReview = async (review) => {
  const response = await request.put(`${REVIEWS_API}/${review._id}`, review);
  return response.data;
};
export const deleteReview = async (review) => {
  const response = await request.delete(`${REVIEWS_API}/${review._id}`);
  return response.data;
};
