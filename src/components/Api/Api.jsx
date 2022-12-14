import PropTypes from 'prop-types';
import axios from 'axios';

export default function fetchImagesWithQuery(searchQuery, page) {
  const response = axios.get(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=30805136-5107e54db1ae50bd847caa337&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response;
}

fetchImagesWithQuery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
