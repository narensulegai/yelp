import React, {Component} from 'react';
import {addComment, getComments, getRestaurants} from '../../util/fetch/api';
import TextInput from "../TextInput";
import PlaceOrder from "./PlacerOrder";
import {Route} from 'react-router-dom';

class View extends Component {
  constructor(props) {
    super(props);
    const id = window.location.hash.split('/').slice(-2)[0];
    this.state = {restaurant: {}, restaurantId: parseInt(id), comments: [], showDishes: false};
    this.comment = React.createRef();
    this.rating = React.createRef();
  }

  async componentDidMount() {
    const restaurants = await getRestaurants();
    const restaurant = restaurants.filter((r) => {
      return r.id === this.state.restaurantId;
    })[0];
    const comments = await getComments(this.state.restaurantId);
    this.setState({restaurant, comments});
  }

  handleAddComment = async () => {
    const c = {
      text: this.comment.current.value,
      rating: this.rating.current.value
    }
    addComment(this.state.restaurantId, c)
      .then(async () => {
        const comments = await getComments(this.state.restaurantId);
        this.setState({comments});
      })
  }

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <a href="#/customer/dashboard">Go back</a>
          <h4>{this.state.restaurant.name}</h4>

          <a href={`#/customer/restaurant/${this.state.restaurantId}/placeOrder`}>Place Order</a>
          &nbsp;|&nbsp;
          <a href={`#/customer/restaurant/${this.state.restaurantId}/comments`}>Add a review</a>

          <Route path={`/customer/restaurant/${this.state.restaurantId}/placeOrder`}>
            <PlaceOrder restaurantId={this.state.restaurantId}/>
          </Route>

          <Route path={`/customer/restaurant/${this.state.restaurantId}/comments`}>
            <div>Add comment</div>
            <TextInput ref={this.comment} label="Comment"/>
            <TextInput ref={this.rating} label="Rating"/>
            <button className="btn-primary" onClick={this.handleAddComment}>Comment</button>
          </Route>

          <div>
            <h2>Reviews</h2>
            {this.state.comments.length === 0 && <div>There are no review yet.</div>}
            {this.state.comments.map((c) => {
              return <div key={c.id} className="card mt-3">
                <div className="card-header">
                  <div>Comment <b>{c.text}</b></div>
                  <div>Rating <b>{c.rating}/5</b></div>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    );
  }
}

View.propTypes = {};

export default View;
