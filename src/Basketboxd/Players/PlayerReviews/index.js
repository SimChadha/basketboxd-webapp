import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as client from "../../reviews/client";
import * as userClient from "../../users/client";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import {
  BsFillCheckCircleFill,
  BsTrash3Fill,
  BsPencil,
  BsPlusCircleFill,
} from "react-icons/bs";
import Table from "react-bootstrap/Table";

function PlayerReviews(props) {
  const { playerName, newReviewHandler } = props;
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

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviews = await client.findReviewsByPlayerName(
          playerName
        );
        setPlayerReviews(reviews);

        // Calculate and send the average rating
        const averageRating = calculateAverageRating(reviews);
        newReviewHandler(averageRating);
      } catch (error) {
        console.error("Error fetching player reviews:", error);
      }
    };

    fetchReviews();
  }, [playerName, newReviewHandler, currentUser]);

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) {
      return null;
    }

    const totalRating = reviews.reduce(
      (sum, review) => sum + review.playerRating,
      0
    );
    const averageRating = totalRating / reviews.length;

    return averageRating;
  };

  const createReview = async () => {
    try {
      const newReview = await client.createReview({
        ...review,
        playerName: playerName,
      });
      setPlayerReviews([newReview, ...playerReviews]);

      // Calculate and send the updated average rating
      const averageRating = calculateAverageRating([newReview, ...playerReviews]);
      newReviewHandler(averageRating);
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
      setPlayerReviews(
        playerReviews.map((r) => (r._id === review._id ? review : r))
      );

      // Calculate and send the updated average rating
      const averageRating = calculateAverageRating(playerReviews);
      newReviewHandler(averageRating);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteReview = async (review) => {
    try {
      await client.deleteReview(review);
      setPlayerReviews(playerReviews.filter((r) => r._id !== review._id));

      // Calculate and send the updated average rating
      const averageRating = calculateAverageRating(playerReviews);
      newReviewHandler(averageRating);
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <div className="row justify-content-center" style={{ marginTop: "12px" }}>
      {currentUser !== null && (
        <Table responsive className="text-center">
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
                  onChange={(e) =>
                    setReview({ ...review, review: e.target.value })
                  }
                />
              </td>
              <td>
                <Rating
                  value={review.playerRating}
                  defaultValue={0}
                  precision={0.5}
                  onChange={(event, newValue) =>
                    setReview({ ...review, playerRating: newValue })
                  }
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
                  onClick={() =>
                    setReview({
                      playerRating: 0,
                      userId: currentUser?._id,
                      playerName: playerName,
                    })
                  }
                  title="Clear current review selection"
                  className="me-2 text-danger fs-1 text"
                />
              </td>
            </tr>
          </tbody>
        </Table>
      )}
      <Table responsive className="text-center">
        <thead>
          <tr>
            <th scope="col">User</th>
            <th scope="col">Review</th>
            <th scope="col">Rating</th>
            {(currentUser !== null) && <th scope="col">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {playerReviews.map((review) => (
            <tr key={review._id}>
              <td>
                <Link to={`/account/${review.userId}`}>
                  {review.userId}
                </Link>
              </td>
              <td>{review.review}</td>
              <td>{review.playerRating}</td>
              <td>
                {currentUser?._id === review.userId && (
                  <button className="btn btn-warning me-2">
                    <BsPencil onClick={() => selectReview(review)} />
                  </button>
                )}
                {(currentUser?._id === review.userId ||
                  currentUser?.role === "ADMIN") && (
                  <button className="btn btn-danger me-2">
                    <BsTrash3Fill onClick={() => deleteReview(review)} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default PlayerReviews