import { Component } from 'react';
import './movie-list.css';
import { Spin, Alert } from 'antd';
import Movie from '../movie';

export default class MovieList extends Component {
  render() {
    const { moviesData, loading, error, inputLabel, moviesDataLoaded, network, onRatingChange, activeTabKey } =
      this.props;

    const elements = moviesData.map((el) => {
      const { id } = el;

      return (
        <li key={id} className="movie-list__item">
          <Movie {...el} onRatingChange={onRatingChange} activeTabKey={activeTabKey} />
        </li>
      );
    });

    if (!network)
      return (
        <Alert
          message={"You're offline! Check the connection."}
          type="info"
          style={{
            fontFamily: "'Inter', sans-serif",
            width: '275px',
            height: '39.6px',
            marginBottom: '36px',
            display: 'flex',
            justifySelf: 'center',
          }}
        />
      );

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

    if (moviesDataLoaded && inputLabel && moviesData.length === 0)
      return (
        <Alert
          message="Sorry, we don't have such movies :("
          type="info"
          style={{
            fontFamily: "'Inter', sans-serif",
            width: '265px',
            height: '39.6px',
            marginBottom: '36px',
            display: 'flex',
            justifySelf: 'center',
          }}
        ></Alert>
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
