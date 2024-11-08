import { Component } from 'react';
import './app.css';

import Search from '../search';
import Rated from '../rated';
import MoviesService from '../../services/movies-service';

export default class App extends Component {
  MoviesService = new MoviesService();

  componentDidMount() {
    this.MoviesService.initGuestSession().catch(this.onError);
  }

  render() {
    return (
      <div>
        <Search />
        <Rated />
      </div>
    );
  }
}
