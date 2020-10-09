import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../util';

const Review = ({ comment }) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <div>
          <a href={`#/restaurant/customer/${comment.customer.id}`}>{comment.customer.name}</a>
          <b className="ml-2">{comment.rating} of 5</b>
        </div>
        <div>{comment.text}</div>
        <div className="small">{formatDate(comment.createdAt)}</div>
      </div>
    </div>
  );
};

Review.propTypes = {
  comment: PropTypes.object,
};

export default Review;
