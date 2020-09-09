import React, { Component } from 'react';
import { addImages, deleteImage, getImages } from '../../util/fetch/api';
import RestaurantProfile from './RestaurantProfile';

class RestaurantHome extends Component {
  constructor(props) {
    super(props);
    this.state = { images: [] };
    this.handleOnProfileImageAdd = this.handleOnProfileImageAdd.bind(this);
    this.handleOnProfileImageDelete = this.handleOnProfileImageDelete.bind(this);
  }

  async componentDidMount() {
    const images = await getImages();
    this.setState({ images });
  }

  async handleOnProfileImageAdd(fileIds) {
    await addImages({ fileIds: fileIds.files, type: 'profile', typeId: null });
    this.setState({ images: await getImages() });
  }

  async handleOnProfileImageDelete(id) {
    await deleteImage(id);
    this.setState({ images: await getImages() });
  }

  render() {
    const { images } = this.state;
    return (
      <div>
        <RestaurantProfile
          images={images}
          onProfileImageAdd={this.handleOnProfileImageAdd}
          onProfileImageDelete={this.handleOnProfileImageDelete}
        />
      </div>
    );
  }
}

export default RestaurantHome;
