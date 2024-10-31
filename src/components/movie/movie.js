import { Component } from 'react';
import './movie.css';
import { Flex, Tag, Image } from 'antd';
import { posterFallback } from './poster-fallback';

export default class Movie extends Component {
  shortenText = (description) => {
    const maxLength = 150;

    if (description.length <= maxLength) {
      return description;
    }

    const words = description.split(' ');
    let resultString = '';

    for (let i = 0; i < words.length; i++) {
      if ((resultString + words[i]).length + 1 <= maxLength) {
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
        <Image
          className="movie__poster"
          style={{ width: '183px', height: '100%', objectFit: 'cover' }}
          fallback={posterFallback}
          preview={Boolean(poster)}
          src={poster}
          alt="Poster"
        />
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
