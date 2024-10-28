import { Component } from 'react';
import './app.css';

import Header from '../header';
import MovieList from '../movie-list';
import Footer from '../footer';
import MoviesService from '../../services/movies-service';
import { debounce } from 'lodash';

import { format } from 'date-fns';

export default class App extends Component {
  constructor() {
    super();
    this.debouncedUpdateMovieList();
    this.state = {
      moviesData: [],
      loading: true,
      error: false,
      inputLabel: '',
      moviesDataLoaded: false,
    };
  }

  MoviesService = new MoviesService();
  debouncedUpdateMovieList = debounce((text) => this.updateMovieList(text), 500);

  updateMovieList(text) {
    this.setState({ loading: true, error: false });

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
        this.onMovieListLoaded(newArr, text);
      })
      .catch(this.onError);
  }

  onMovieListLoaded(newArr, text) {
    this.setState({
      moviesData: newArr,
      loading: false,
      moviesDataLoaded: true,
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
    const { moviesData, loading, error, inputLabel, moviesDataLoaded } = this.state;

    return (
      <section className="app">
        <Header label={inputLabel} onInputChange={this.onInputChange} />
        <MovieList
          moviesData={moviesData}
          loading={loading}
          error={error}
          inputLabel={inputLabel}
          moviesDataLoaded={moviesDataLoaded}
        />
        <Footer />
      </section>
    );
  }
}
