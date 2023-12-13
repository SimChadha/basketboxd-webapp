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
import Table from 'react-bootstrap/Table';

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
      const newReview = await client.createReview({ ...review, playerName: playerName.playerName });
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
        const reviews = await client.findReviewsByPlayerName(playerName.playerName);
        setPlayerReviews(reviews);
      } catch (error) {
        console.error("Error fetching player reviews:", error);
      }
    };

    fetchReviews();
  }, [playerName]);

  return (
    <div>
      <Table responsive>
        {currentUser !== null &&
          <div className="table">
            <thead>
              <tr>
                <th scope="col">Review Text</th>
                <th scope="col">Rating</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    value={review.review}
                    className="form-control"
                    placeholder="Review description"
                    type="longtext"
                    onChange={(e) => setReview({ ...review, review: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    value={review.playerRating}
                    className="form-control"
                    placeholder="Player Rating"
                    type="number"
                    min="0"
                    max="5"
                    onChange={(e) => setReview({ ...review, playerRating: e.target.value })}
                  />
                </td>
                <td>
                  <BsPlusCircleFill
                    onClick={createReview}
                    className="text-primary fs-1 text"
                    title="Create new review"
                  />
                  <BsFillCheckCircleFill
                    onClick={updateReview}
                    title="Save current review selection"
                    className="text-success fs-1 text"
                  />
                  <BsTrash3Fill
                    onClick={() => setReview({ playerRating: 0, userId: currentUser?._id, playerName: playerName.playerName })}
                    title="Clear current review selection"
                    className="me-2 text-danger fs-1 text"
                  />
                </td>
              </tr>
            </tbody>
          </div>
        }
      </Table >
      <table className="table">
        <thead>
          <tr>
            <th scope="col">User</th>
            <th scope="col">Review</th>
            <th scope="col">Rating</th>
            <th scope="col">Actions</th>
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
    </div >
  )

}

export default PlayerReviews;