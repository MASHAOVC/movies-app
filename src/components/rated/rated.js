import { Component } from 'react';
import './rated.css';

import MoviesService from '../../services/movies-service';

export default class Rated extends Component {
  MoviesService = new MoviesService();

  componentDidMount() {
    const { onError } = this.props;

    this.MoviesService.getRatedMovies()
      .then((res) => {})
      .catch(onError);
  }

  render() {
    return <div className="rated"></div>;
  }
}
