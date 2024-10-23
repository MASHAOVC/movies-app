import { Component } from 'react';
import './movie-list.css';

import Movie from '../movie';

export default class MovieList extends Component {
  render() {
    return (
      <ul className="movie-list">
        <li className="movie-list__item">
          <Movie />
        </li>
        <li className="movie-list__item">
          <Movie />
        </li>
        <li className="movie-list__item">
          <Movie />
        </li>
        <li className="movie-list__item">
          <Movie />
        </li>
        <li className="movie-list__item">
          <Movie />
        </li>
        <li className="movie-list__item">
          <Movie />
        </li>
      </ul>
    );
  }
}
