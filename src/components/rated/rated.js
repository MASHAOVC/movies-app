import { Component } from 'react';
import './rated.css';

import MoviesService from '../../services/movies-service';
import { format } from 'date-fns';
import MovieList from '../movie-list';
import Footer from '../footer';

export default class Rated extends Component {
  constructor() {
    super();
    this.state = {
      moviesData: [],
      loading: false,
      error: false,
      network: true,
      page: 1,
      totalResults: 0,
    };
  }

  MoviesService = new MoviesService();

  componentDidMount() {
    const { page } = this.state;

    this.updateRatedMovieList(page);
  }

  updateRatedMovieList(page) {
    const { onError } = this.props;

    this.MoviesService.getRatedMovies(page)
      .then((res) => {
        const totalResults = res.total_results;

        let newArr = (res.results || []).map((el) => {
          return {
            poster: el.poster_path ? 'https://image.tmdb.org/t/p/original/' + el.poster_path : '',
            title: el.title,
            date: el.release_date ? format(new Date(el.release_date), 'MMMM d, yyyy') : el.release_date,
            description: el.overview,
            id: el.id,
            rating: el.rating,
            votes: el.vote_average,
          };
        });

        this.onRatedMovieListLoaded(newArr, totalResults);
      })
      .catch(onError);
  }

  onRatedMovieListLoaded(newArr, totalResults) {
    this.setState({
      moviesData: newArr,
      loading: false,
      totalResults,
    });
  }

  onPaginationChange = (page) => {
    this.updateRatedMovieList(page);

    this.setState({
      page,
    });
  };

  onRatingChangeWrapper = async (value, id) => {
    const { onRatingChange } = this.props;

    await onRatingChange(value, id);

    this.setState(({ moviesData }) => {
      let newArr = moviesData.map((el) => {
        if (el.id === id) {
          const newItem = { ...el, rating: value };
          return newItem;
        }

        return el;
      });

      return { moviesData: newArr };
    });
  };

  render() {
    const { moviesData, loading, error, network, page, totalResults } = this.state;

    return (
      <div className="rated">
        <MovieList
          moviesData={moviesData}
          loading={loading}
          error={error}
          network={network}
          onRatingChange={this.onRatingChangeWrapper}
        />
        <Footer
          onPaginationChange={this.onPaginationChange}
          page={page}
          totalResults={totalResults}
          moviesData={moviesData}
          loading={loading}
          inputLabel
        />
      </div>
    );
  }
}
