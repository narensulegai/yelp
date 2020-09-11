import React, { Component } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import {
  addImages, deleteImage, getDishes, getImages,
  getRestaurantProfile, updateDish, updateRestaurantProfile,
  createDish, deleteDish,
} from '../util/fetch/api';
import RestaurantProfile from './RestaurantProfile';
import Dishes from './Dishes';
import RestaurantEvents from './RestaurantEvents';

class RestaurantHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [], profile: {}, dishes: [], currentTab: 'events',
    };
    this.handleOnProfileImageAdd = this.handleOnProfileImageAdd.bind(this);
    this.handleOnProfileImageDelete = this.handleOnProfileImageDelete.bind(this);
    this.handleOnProfileSave = this.handleOnProfileSave.bind(this);
    this.handleOnDishUpdate = this.handleOnDishUpdate.bind(this);
    this.handleOnDishAdd = this.handleOnDishAdd.bind(this);
    this.handleOnDishDelete = this.handleOnDishDelete.bind(this);
    this.handleOnDishImageAdd = this.handleOnDishImageAdd.bind(this);
    this.handleOnDishImageDelete = this.handleOnDishImageDelete.bind(this);
  }

  async componentDidMount() {
    const images = await getImages();
    const profile = await getRestaurantProfile();
    const dishes = await getDishes();
    this.setState({ images, profile, dishes });
  }

  async handleOnProfileImageAdd(fileIds) {
    await addImages({ fileIds: fileIds.files, type: 'profile', typeId: null });
    this.setState({ images: await getImages() });
  }

  async handleOnProfileImageDelete(id) {
    await deleteImage(id);
    this.setState({ images: await getImages() });
  }

  async handleOnDishImageAdd(fileIds, typeId) {
    await addImages({ fileIds: fileIds.files, type: 'dish', typeId });
    this.setState({ images: await getImages() });
  }

  async handleOnDishImageDelete(id) {
    await deleteImage(id);
    this.setState({ images: await getImages() });
  }

  async handleOnProfileSave(p) {
    updateRestaurantProfile(p)
      .then(async () => {
        const profile = await getRestaurantProfile();
        this.setState({ profile });
      });
  }

  async handleOnDishUpdate(id, dish) {
    return updateDish(id, dish)
      .then(async () => {
        this.setState({ dishes: await getDishes() });
      });
  }

  async handleOnDishAdd(dish) {
    return createDish(dish)
      .then(async () => {
        this.setState({ dishes: await getDishes() });
      });
  }

  async handleOnDishDelete(id) {
    return deleteDish(id)
      .then(async () => {
        this.setState({ dishes: await getDishes() });
      });
  }

  render() {
    const {
      images, profile, dishes, currentTab,
    } = this.state;
    return (
      <div className="container-fluid">
        <nav className="navbar clearfix">
          <Link to="/logout">Logout</Link>
        </nav>
        <div className="row">

          <div className="col-2">
            <button className={classNames({ 'font-weight-bold': currentTab === 'profile', 'btn btn-link d-block': true })}
              onClick={() => this.setState({ currentTab: 'profile' })}>
              Profile
            </button>
            <button className={classNames({ 'font-weight-bold': currentTab === 'dishes', 'btn btn-link d-block': true })}
              onClick={() => this.setState({ currentTab: 'dishes' })}>
              Dishes
            </button>
            <button className={classNames({ 'font-weight-bold': currentTab === 'events', 'btn btn-link d-block': true })}
              onClick={() => this.setState({ currentTab: 'events' })}>
              Events
            </button>
          </div>

          <div className="col-10">

            {currentTab === 'profile' && (
              <RestaurantProfile
                images={images.filter((i) => i.type === 'profile')}
                profile={profile}
                onSave={this.handleOnProfileSave}
                onProfileImageAdd={this.handleOnProfileImageAdd}
                onProfileImageDelete={this.handleOnProfileImageDelete}
              />
            )}

            {currentTab === 'dishes' && (
              <Dishes
                images={images.filter((i) => i.type === 'dish')}
                dishes={dishes}
                onDishUpdate={this.handleOnDishUpdate}
                onDishAdd={this.handleOnDishAdd}
                onDishDelete={this.handleOnDishDelete}
                onDishImageAdd={this.handleOnDishImageAdd}
                onDishImageDelete={this.handleOnDishImageDelete}
              />
            )}

            {currentTab === 'events' && <RestaurantEvents />}
          </div>
        </div>
      </div>
    );
  }
}

export default RestaurantHome;
