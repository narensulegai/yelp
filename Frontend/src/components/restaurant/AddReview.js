import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { addComment, getComments } from '../../util/fetch/api';
import Review from '../Review';

const AddReview = ({ dish }) => {
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState('NA');
  const [showReviews, setShowReviews] = useState(false);
  const review = useRef();
  const rating = useRef();

  const toggleShowReviews = () => {
    setShowReviews(!showReviews);
  };

  const calcAvg = (rev) => {
    return `${rev.reduce((m, r) => r.rating + m, 0) / rev.length}`;
  };
  useEffect(() => {
    (async () => {
      const revs = await getComments(dish.id);
      if (revs.length) {
        setAverage(calcAvg(revs));
      }
      setReviews(revs);
    })();
  }, [dish]);

  const handleOnReview = () => {
    const c = {
      text: review.current.value,
      rating: parseInt(rating.current.value),
    };
    addComment(dish.id, c)
      .then(async () => {
        const revs = await getComments(dish.id);
        setReviews(revs);
        setAverage(calcAvg(revs));
        review.current.value = '';
        window.alert('Thank you for your review!');
      });
  };

  return (
    <>
      <div>
        <div>
          Average rating <b>{average}</b> of 5
          <a className="nav-link d-inline pointer" onClick={toggleShowReviews}>
            Snow {reviews.length} review(s)
          </a>
        </div>
        {showReviews && (
          <div className="mt-3">
            {reviews.map((r) => {
              return <Review key={r.id} comment={r} />;
            })}
          </div>
        )}
      </div>
      <div className="mt-3">
        <span className="mr-3">Please rate {dish.name}</span>
        <select defaultValue="5" ref={rating}>
          <option value="5">Great (5)</option>
          <option value="4">Good (4)</option>
          <option value="3">Average (3)</option>
          <option value="2">Not good (2)</option>
          <option value="1">Bad (1)</option>
        </select>
      </div>
      <div className="mt-3">
        <textarea className="form-control" rows="3" placeholder={`Add your review for ${dish.name}`} ref={review} />
      </div>
      <div className="mt-3">
        <button className="btn-primary" onClick={handleOnReview}>Add review</button>
      </div>
    </>
  );
};

AddReview.propTypes = {
  dish: PropTypes.object,
};

export default AddReview;
