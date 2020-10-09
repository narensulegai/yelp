import React, { Component } from 'react';
import { currentUser, getComments } from '../../util/fetch/api';
import Review from '../Review';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = { comments: [] };
  }

  async componentDidMount() {
    const { user } = await currentUser();
    const comments = await getComments(user.id);
    this.setState({ comments });
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <h4>Customer reviews</h4>
          {this.state.comments.length === 0 ? <div>No reviews yet</div> : null}
          {this.state.comments.map((c) => {
            return <Review key={c.id} comment={c} />;
          })}
        </div>
      </div>
    );
  }
}

Comment.propTypes = {};

export default Comment;
