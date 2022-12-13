import React, { Component } from 'react';
import propTypes from 'prop-types';
import style from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  static defaultProps = { imageLink: ' ', imageAlt: ' ' };

  static propTypes = {
    imageLink: propTypes.string,
    imageAlt: propTypes.string,
    largeImageURL: propTypes.string,
    modalFn: propTypes.func,
  };

  render() {
    return (
      <li className={style.ImageGalleryItem}>
        <img
          onClick={e => {
            this.props.modalFn(e.target.attributes[2].value);
            console.log(e);
          }}
          src={this.props.imageLink}
          alt={this.props.imageAlt}
          data-large={this.props.largeImageURL}
          className={style.ImageGalleryItemImage}
        />
      </li>
    );
  }
}
export default ImageGalleryItem;
