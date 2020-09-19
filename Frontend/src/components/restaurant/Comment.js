import React, { Component } from 'react';
import { currentUser, getComments } from '../../util/fetch/api';

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
          <h6>Customer comments</h6>
          {this.state.comments.map((c) => {
            return (
              <div key={c.id} className="card mb-3">
                <div className="card-header">
                  <div>{c.text}</div>
                  <div>{c.rating}/5</div>
                  <div>
                    <a href={`#/restaurant/customer/${c.customer.id}`}>{c.customer.name}</a>
                  </div>
                </div>
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
