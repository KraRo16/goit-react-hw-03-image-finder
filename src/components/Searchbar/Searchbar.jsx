import React, { Component } from 'react';
import style from './Searchbar.module.css';
import propTypes from 'prop-types';

class Searchbar extends Component {
  static propTypes = { onSubmit: propTypes.func };
  render() {
    return (
      <header className={style.Searchbar}>
        <form
          className={style.SearchForm}
          onSubmit={event => this.props.onSubmit(event)}
        >
          <button type="submit" className={style.SearchFormButton}>
            <span className={style.SearchFormButtonLabel}></span>
          </button>

          <input
            className={style.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
