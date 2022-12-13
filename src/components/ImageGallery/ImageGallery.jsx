import React, { Component } from 'react';
import propTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import style from './ImageGallery.module.css';

class ImageGallery extends Component {
  static defaultProps = { imagesArray: propTypes.array };
  static propTypes = {
    loader: propTypes.func,
    imagesArray: propTypes.array,
    modalFn: propTypes.func,
  };
  componentDidMount() {
    this.props.loader(true);
  }
  render() {
    return (
      <ul className={style.ImageGallery}>
        {this.props.imagesArray.map((image, idx) => {
          return (
            <ImageGalleryItem
              key={image.id}
              imageLink={image.webformatURL}
              imagAlt={image.tags}
              largeImageURL={image.largeImageURL}
              modalFn={this.props.modalFn}
            />
          );
        })}
      </ul>
    );
  }
}

export default ImageGallery;
