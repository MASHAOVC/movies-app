import { Component } from 'react';
import './app.css';

import Header from '../header';
import MovieList from '../movie-list';
import Footer from '../footer';

export default class App extends Component {
  render() {
    return (
      <section className="app">
        <Header />
        <MovieList />
        <Footer />
      </section>
    );
  }
}
