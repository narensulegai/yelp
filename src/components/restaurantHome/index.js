import React, { Component } from 'react';
import {
  addImages, deleteImage, getDishes, getImages,
  getRestaurantProfile, updateDish, updateRestaurantProfile,
  createDish,
} from '../../util/fetch/api';
import RestaurantProfile from './RestaurantProfile';
import Dishes from '../Dishes';

class RestaurantHome extends Component {
  constructor(props) {
    super(props);
    this.state = { images: [], profile: {}, dishes: [] };
    this.handleOnProfileImageAdd = this.handleOnProfileImageAdd.bind(this);
    this.handleOnProfileImageDelete = this.handleOnProfileImageDelete.bind(this);
    this.handleOnProfileSave = this.handleOnProfileSave.bind(this);
    this.handleOnDishUpdate = this.handleOnDishUpdate.bind(this);
    this.handleOnDishAdd = this.handleOnDishAdd.bind(this);
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

  render() {
    const { images, profile, dishes } = this.state;
    return (
      <div>
        {/* <RestaurantProfile */}
        {/*  images={images} */}
        {/*  profile={profile} */}
        {/*  onSave={this.handleOnProfileSave} */}
        {/*  onProfileImageAdd={this.handleOnProfileImageAdd} */}
        {/*  onProfileImageDelete={this.handleOnProfileImageDelete} */}
        {/* /> */}
        <Dishes
          dishes={dishes}
          onDishUpdate={this.handleOnDishUpdate}
          onDishAdd={this.handleOnDishAdd}
        />
      </div>
    );
  }
}

export default RestaurantHome;
