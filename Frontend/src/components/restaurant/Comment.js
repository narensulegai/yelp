import React, { Component } from 'react';
import { getRestaurantComments } from '../../util/fetch/api';
import Review from '../Review';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = { comments: [] };
  }

  async componentDidMount() {
    const comments = await getRestaurantComments();
    this.setState({ comments });
  }

  render() {
    return (
      <div className="row">
        <div className="col-6">
          <h4>Customer reviews</h4>
          {this.state.comments.map((comment) => {
            return (
              <div key={comment.id} className="ml-2">
                <h6>Dish {comment.dish.name}</h6>
                <Review comment={comment} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

Comment.propTypes = {};

export default Comment;
