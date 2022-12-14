import React, { Component } from 'react';
import style from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
  state = {
    searchData: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchData);
  };

  handleChange = evt => {
    const { value } = evt.target;
    this.setState({ searchData: value });
  };

  render() {
    const { handleChange, handleSubmit } = this;

    return (
      <header className={style.Searchbar}>
        <form className={style.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={style.SearchFormButton}>
            <span className={style.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={style.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
          />
        </form>
      </header>
    );
  }
}
