import { Component } from 'react';
import './app.css';

import Header from '../header';
import MovieList from '../movie-list';
import Footer from '../footer';
import MoviesService from '../../services/movies-service';

import { format } from 'date-fns';
import { Online, Offline } from 'react-detect-offline';
import debounce from 'lodash/debounce';

export default class App extends Component {
  constructor() {
    super();
    this.updateMovieList();
    this.state = {
      moviesData: [],
      loading: true,
      error: false,
      inputLabel: '',
    };
  }

  MoviesService = new MoviesService();
  debouncedUpdateMovieList = debounce(this.updateMovieList, 500);

  updateMovieList(text) {
    this.MoviesService.getAllMovies(text)
      .then((arr) => {
        let newArr = arr.map((el) => {
          return {
            poster: el.poster_path ? 'https://image.tmdb.org/t/p/original/' + el.poster_path : '',
            title: el.title,
            date: el.release_date ? format(new Date(el.release_date), 'MMMM d, yyyy') : el.release_date,
            description: el.overview,
            id: el.id,
          };
        });
        this.onMovieListLoaded(newArr);
      })
      .catch(this.onError);
  }

  onMovieListLoaded(newArr) {
    this.setState({
      moviesData: newArr,
      loading: false,
    });
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  onInputChange = (text) => {
    this.setState({
      inputLabel: text,
    });

    this.debouncedUpdateMovieList(text);
  };

  render() {
    const { moviesData, loading, error, inputLabel } = this.state;

    return (
      <section className="app">
        <Online>
          <Header label={inputLabel} onInputChange={this.onInputChange} />
          <MovieList moviesData={moviesData} loading={loading} error={error} />
          <Footer />
        </Online>
        <Offline>You're offline right now. Check your connection.</Offline>
      </section>
    );
  }
}
