import { Component } from 'react';
import './movie-list.css';
import { Spin, Alert } from 'antd';
import Movie from '../movie';

export default class MovieList extends Component {
  render() {
    const { moviesData, loading, error } = this.props;

    const elements = moviesData.map((el) => {
      const { id } = el;

      return (
        <li key={id} className="movie-list__item">
          <Movie {...el} />
        </li>
      );
    });

    if (error)
      return (
        <ul className="movie-list">
          {' '}
          <Alert
            message="Something's gone terribly wrong!"
            type="error"
            style={{ fontFamily: "'Inter', sans-serif" }}
          />{' '}
        </ul>
      );

    if (loading)
      return (
        <ul className="movie-list">
          {' '}
          <Spin size="large" />{' '}
        </ul>
      );

    return <ul className="movie-list">{elements}</ul>;
  }
}
