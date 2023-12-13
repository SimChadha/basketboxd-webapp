import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as client from './client';
import * as reviewClient from '../reviews/client';

const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const fetchUser = async () => {
    const userFromClient = await client.findUserByUsername(username);
    setUser(userFromClient);
  };
  const fetchReviews = async () => {
    const reviewsFromClient = await reviewClient.findReviewsByUsername(username);
    setReviews(reviewsFromClient);
  };

  useEffect(() => {
    fetchUser();
    fetchReviews();
  }, []);

  return (
    <div>
      <h1 className='mt-2'>User Info</h1>
      <div className="list-group mx-5 px-5 mb-2">
        <div className="list-group-item">
          <h4 className="list-group-item-heading">Username</h4>
          <p className="list-group-item-text">{user?.username} </p>
        </div>
        <div className="list-group-item">
          <h4 className="list-group-item-heading">Name</h4>
          <p className="list-group-item-text">{user?.firstName} {user?.lastName}</p>
        </div>
        <div className="list-group-item">
          <h4 className="list-group-item-heading">Role</h4>
          <p className="list-group-item-text">{user?.role}</p>
        </div>
      </div>
      <h1>Reviews</h1>
      {reviews.map((review) => {
        return (
          <div key={review._id} className="list-group mb-3 px-5 mx-5">
            <div className="list-group-item">
              <h4 className="list-group-item-heading">Player Name</h4>
              <p className="list-group-item-text">{review.playerName}</p>
            </div>
            <div className="list-group-item">
              <h4 className="list-group-item-heading">Player Rating</h4>
              <p className="list-group-item-text">{review.playerRating}/5</p>
            </div>
            <div className="list-group-item">
              <h4 className="list-group-item-heading">Review</h4>
              <p className="list-group-item-text">{review.review}</p>
            </div>
            <div className="list-group-item">
              <h4 className="list-group-item-heading">Date reviewed</h4>
              <p className="list-group-item-text">{review.datePosted}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserProfile;
