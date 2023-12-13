import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as client from "../../reviews/client";
import { Link } from "react-router-dom";
import {
    BsFillCheckCircleFill,
    BsTrash3Fill,
    BsPencil,
    BsPlusCircleFill,
  } from "react-icons/bs";

function PlayerReviews(playerName) {
  const [account, setAccount] = useState(null);
  const { currentUser } = useSelector((state) => state.userReducer);
  useEffect(() => {
    setAccount(currentUser);
  }, [currentUser]);

  const [playerReviews, setPlayerReviews] = useState([]);

  const [review, setReview] = useState({
    playerRating: 0,
    userId: currentUser?._id,
    playerName: playerName,
  });

  const createReview = async () => {
    try {
      const newReview = await client.createReview(review);
      setPlayerReviews([newReview, ...playerReviews]);
    } catch (err) {
      console.log(err);
    }
  };

  const selectReview = async (review) => {
    try {
      const r = await client.findReviewById(review._id);
      setReview(r);
    } catch (err) {
      console.log(err);
    }
  };
  const updateReview = async () => {
    try {
      const status = await client.updateReview(review);
      setPlayerReviews(playerReviews.map((r) => (r._id === review._id ? review : r)));
    } catch (err) {
      console.log(err);
    }
  };
  const deleteReview = async (review) => {
    try {
      await client.deleteReview(review);
      setPlayerReviews(playerReviews.filter((r) => r._id !== review._id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviews = await client.findReviewsByPlayerName(playerName);
        setPlayerReviews(reviews);
      } catch (error) {
        console.error("Error fetching player reviews:", error);
      }
    };

    fetchReviews();
  }, [playerName]);

  return (
    <div>
        <table className="table">
        <thead>
          <tr>
            <th>Review</th>
            <th>Rating</th>
          </tr>
          <tr>
            <td>
              <input
                value={review.review}
                onChange={(e) => setReview({ ...review, review: e.target.value })}
              />
              <input
                value={review.playerRating}
                onChange={(e) => setReview({ ...review, playerRating: e.target.value })}
              />
            </td>
            <td>
              <BsPlusCircleFill
                onClick={createReview}
                className="text-primary fs-1 text"
              />
              <BsFillCheckCircleFill
                onClick={updateReview}
                className="me-2 text-success fs-1 text"
              />
            </td>
          </tr>
        </thead>
        <tbody>
          {playerReviews.map((review) => (
            <tr key={review._id}>
              <td>
              <Link to={`/Basketboxd/account/${review.userId}`}>
                {review.userId}
              </Link>
              </td>
              <td>{review.review}</td>
              <td>{review.playerRating}</td>
              <td>
                <button className="btn btn-warning me-2">
                  <BsPencil onClick={() => selectReview(review)} />
                </button>
                <button className="btn btn-danger me-2">
                  <BsTrash3Fill onClick={() => deleteReview(review)} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

}

export default PlayerReviews;