import { Component } from 'react';
import './movie-list.css';

import Movie from '../movie';

export default class MovieList extends Component {
  render() {
    const { moviesData } = this.props;

    const elements = moviesData.map((el) => {
      const { id } = el;
      console.log(el);
      return (
        <li key={id} className="movie-list__item">
          <Movie {...el} />
        </li>
      );
    });
    return <ul className="movie-list">{elements}</ul>;
  }
}
