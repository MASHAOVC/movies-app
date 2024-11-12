import { Component } from 'react';
import './search.css';

import Header from '../header';
import MovieList from '../movie-list';
import Footer from '../footer';
import MoviesService from '../../services/movies-service';
import NetworkState from '../network-state/network-state';

import { debounce } from 'lodash';
import { format } from 'date-fns';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      moviesData: [],
      loading: false,
      error: false,
      inputLabel: '',
      moviesDataLoaded: false,
      network: true,
      page: 1,
      totalResults: 0,
    };
  }

  MoviesService = new MoviesService();
  debouncedUpdateMovieList = debounce((text, page) => this.updateMovieList(text, page), 500);

  updateMovieList(text, page) {
    const { onError } = this.props;

    this.setState({ loading: true, error: false });

    this.MoviesService.getAllMovies(text, page)
      .then((res) => {
        const totalResults = res.total_results;

        let newArr = (res.results || []).map((el) => {
          return {
            poster: el.poster_path ? 'https://image.tmdb.org/t/p/original/' + el.poster_path : '',
            title: el.title,
            date: el.release_date ? format(new Date(el.release_date), 'MMMM d, yyyy') : el.release_date,
            description: el.overview,
            id: el.id,
          };
        });
        this.onMovieListLoaded(newArr, text, totalResults);
      })
      .catch(onError);
  }

  onMovieListLoaded(newArr, text, totalResults) {
    this.setState({
      moviesData: newArr,
      loading: false,
      moviesDataLoaded: Boolean(text),
      totalResults,
    });
  }

  onInputChange = (text) => {
    const { page } = this.state;

    this.setState((state) => ({
      inputLabel: text,
      moviesDataLoaded: !text ? false : state.moviesDataLoaded,
      page: 1,
    }));

    this.debouncedUpdateMovieList(text, page);
  };

  onNetworkState = () => {
    this.setState((prevState) => ({ network: !prevState.network }));
  };

  onPaginationChange = (page) => {
    const { inputLabel } = this.state;

    this.updateMovieList(inputLabel, page);

    this.setState({
      page,
    });
  };

  render() {
    const { moviesData, loading, error, inputLabel, moviesDataLoaded, network, page, totalResults } = this.state;

    return (
      <section className="search">
        <NetworkState onNetworkState={this.onNetworkState} />
        <Header label={inputLabel} onInputChange={this.onInputChange} />
        <MovieList
          moviesData={moviesData}
          loading={loading}
          error={error}
          inputLabel={inputLabel}
          moviesDataLoaded={moviesDataLoaded}
          network={network}
        />
        <Footer
          onPaginationChange={this.onPaginationChange}
          page={page}
          totalResults={totalResults}
          moviesData={moviesData}
          inputLabel={inputLabel}
          loading={loading}
        />
      </section>
    );
  }
}
