import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import fetchImagesWithQuery from './Api/Api';
import Modal from './Modal/Modal';
import Button from './Button/Button';
// import Loader from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from './App.module.css';
import { BallTriangle } from 'react-loader-spinner';

export class App extends Component {
  state = {
    searchData: '',
    images: [],
    page: 0,
    largeImage: '',
    showModal: false,
    isLoading: false,
    error: null,
    totalHits: 0,
    total: 0,
    renderBtn: false,
    totPages: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevPage = prevState.page;
    const prevSearchData = prevState.searchData;
    const { searchData, page } = this.state;

    if (prevPage !== page || prevSearchData !== searchData) {
      try {
        this.setState({ isLoading: true });
        const response = fetchImagesWithQuery(searchData, page);
        response.then(data => {
          data.data.hits.length === 0
            ? this.setState({ renderBtn: false })
            : this.setState(prevState => ({
                images: [...prevState.images, ...data.data.hits],
                renderBtn: true,
              }));
          this.setState({ isLoading: false });
        });
      } catch (error) {
        this.setState({ error, isLoading: false });
      } finally {
      }
    }
  }

  onSubmit = searchData => {
    if (searchData.trim() === '') {
      return toast.error('Enter the meaning for search');
    } else if (searchData === this.state.searchData) {
      return;
    }
    this.setState({
      searchData: searchData,
      page: 1,
      images: [],
    });
  };

  nextPage = page => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  openModal = index => {
    this.setState(({ images }) => ({
      showModal: true,
      largeImage: images[index].largeImageURL,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  // showLoadMore = () => {
  //   this.setState({ totPages: Math.ceil(this.state.totalHits / 12) });
  // };

  render() {
    const { toggleModal, openModal, nextPage, onSubmit } = this;
    const { images, isLoading, largeImage, showModal, renderBtn } = this.state;
    // const showLoadMore = this.showLoadMore();

    return (
      <div className={style.App}>
        <Searchbar onSubmit={onSubmit} />
        {images.length !== 0 && (
          <ImageGallery images={images} openModal={openModal} />
        )}
        {showModal && (
          <Modal toggleModal={toggleModal} largeImage={largeImage} />
        )}
        {isLoading && (
          <BallTriangle
            className={style.spin}
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
          />
        )}
        <ToastContainer autoClose={2500} />
        {images.length >= 12 && renderBtn && <Button nextPage={nextPage} />}
      </div>
    );
  }
}
