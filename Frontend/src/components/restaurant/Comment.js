import React, { Component } from 'react';
import { getDishes } from '../../util/fetch/api';
import Review from '../Review';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = { dishes: [] };
  }

  async componentDidMount() {
    const dishes = await getDishes();
    this.setState({ dishes });
  }

  render() {
    return (
      <div className="row">
        <div className="col-6">
          <h4>Customer reviews</h4>
          {this.state.dishes.map((d) => {
            return (
              <div key={d.id} className="mt-3">
                <h6>{d.name} ({d.comments.length} review)</h6>
                {d.comments.map((c) => {
                  return (
                    <div key={c.id} className="ml-2">
                      <Review comment={c} />
                    </div>
                  );
                })}
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
