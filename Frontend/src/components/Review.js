import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../util';

const Review = ({ comment }) => {
  return (
    <div className="card mb-2">
      <div className="card-body">
        <div>
          <b>{comment.customer.name}</b>
          &nbsp;rated&nbsp;
          <b>{comment.rating} of 5</b>
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
