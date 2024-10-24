import { Component } from 'react';
import './app.css';

import Header from '../header';
import MovieList from '../movie-list';
import Footer from '../footer';
import MoviesService from '../../services/movies-service';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      moviesData: [
        {
          title: 'The Lobster',
          date: 'May 15, 2015',
          description: 'A',
          poster: 'https://poster4.me/wp-content/uploads/2020/05/lobster_2-768x1152.jpg',
          id: 1,
        },
        {
          title: 'The Lobster',
          date: 'May 15, 2015',
          description: 'A',
          poster: 'https://poster4.me/wp-content/uploads/2020/05/lobster_2-768x1152.jpg',
          id: 2,
        },
        {
          title: 'The Lobster',
          date: 'May 15, 2015',
          description: 'A',
          poster: 'https://poster4.me/wp-content/uploads/2020/05/lobster_2-768x1152.jpg',
          id: 3,
        },
        {
          title: 'The Lobster',
          date: 'May 15, 2015',
          description: 'A',
          poster: 'https://poster4.me/wp-content/uploads/2020/05/lobster_2-768x1152.jpg',
          id: 4,
        },
        {
          title: 'The Lobster',
          date: 'May 15, 2015',
          description: 'A',
          poster: 'https://poster4.me/wp-content/uploads/2020/05/lobster_2-768x1152.jpg',
          id: 5,
        },
        {
          title: 'The Lobster',
          date: 'May 15, 2015',
          description: 'A',
          poster: 'https://poster4.me/wp-content/uploads/2020/05/lobster_2-768x1152.jpg',
          id: 6,
        },
      ],
    };
  }

  render() {
    const { moviesData } = this.state;

    return (
      <section className="app">
        <Header />
        <MovieList moviesData={moviesData} />
        <Footer />
      </section>
    );
  }
}

const s = new MoviesService();
s.getAllMovies();
