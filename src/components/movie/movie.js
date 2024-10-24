import { Component } from 'react';
import './movie.css';
import { Flex, Tag } from 'antd';

export default class Movie extends Component {
  shortenText = (description) => {
    if (description.length <= 200) {
      return description;
    }

    const words = description.split(' ');
    let resultString = '';

    for (let i = 0; i < words.length; i++) {
      if (resultString.length <= 200 - words[i].length) {
        resultString += words[i] + ' ';
      } else {
        break;
      }
    }

    return resultString + ' ...';
  };

  render() {
    const { title, date, description, poster } = this.props;

    return (
      <Flex className="movie">
        <img className="movie__poster" src={poster} alt="Poster" />
        <div className="movie__content-wrapper">
          <header>
            <h1 className="movie__title">{title}</h1>
            <div className="movie__rating">Rating</div>
          </header>
          <main>
            <div className="movie__date">{date}</div>
            <div className="movie__genre-wrapper">
              <Tag
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, color: '#000000A6' }}
                className="movie__genre-item"
              >
                Drama
              </Tag>
              <Tag
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, color: '#000000A6' }}
                className="movie__genre-item"
              >
                Romance
              </Tag>
            </div>
            <p className="movie__description">{this.shortenText(description)}</p>
          </main>
          <div className="movie__stars"></div>
        </div>
      </Flex>
    );
  }
}
