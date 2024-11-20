import { Component } from 'react';
import './movie.css';

import { posterFallback } from './poster-fallback';

import { Flex, Tag, Image, Rate } from 'antd';

export default class Movie extends Component {
  constructor() {
    super();
    this.state = {
      windowWidth: window.innerWidth,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({ windowWidth: window.innerWidth });
  };

  shortenText = (description) => {
    const maxLength = 175;

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

  selectGenres = () => {
    const { genreIds, genres } = this.props;

    return genreIds.map((id) => {
      return genres.find((genre) => id === genre.id);
    });
  };

  render() {
    const { title, date, description, poster, onRatingChange, id, activeTabKey, rating, votes } = this.props;
    const { windowWidth } = this.state;

    const isMobile = windowWidth <= 420;
    let votesColor = '';

    if (votes <= 3) {
      votesColor = '#E90000';
    } else if (votes > 3 && votes <= 5) {
      votesColor = '#E97E00';
    } else if (votes > 5 && votes <= 7) {
      votesColor = '#E9D100';
    } else {
      votesColor = '#66E900';
    }

    return (
      <Flex className="movie">
        <div className="movie__mobile-poster-wrapper">
          <Image
            className="movie__poster"
            height={isMobile ? '91px' : '279px'}
            width={isMobile ? '60px' : '183px'}
            fallback={posterFallback}
            preview={Boolean(poster)}
            src={poster}
            alt="Poster"
          />
        </div>
        <div className="movie__content-wrapper">
          <div className="movie__mobile-wrapper">
            <div className="movie__mobile-header-wrapper">
              <h1 className="movie__title">{title}</h1>
              {Boolean(votes) && (
                <div className="movie__rating" style={{ borderColor: votesColor }}>
                  {votes.toFixed(1)}
                </div>
              )}
              <div className="movie__date">{date}</div>
              <div className="movie__genre-wrapper">
                {this.selectGenres().map((genre) => {
                  return (
                    <Tag
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, color: '#000000A6' }}
                      className="movie__genre-item"
                      key={genre.id}
                    >
                      {genre.name}
                    </Tag>
                  );
                })}
              </div>
            </div>
          </div>
          <p className="movie__description">{this.shortenText(description)}</p>
          <div className="movie__stars-container">
            {activeTabKey === '1' ? (
              <Rate
                className="movie__stars"
                allowHalf
                count={10}
                onChange={(value) => {
                  onRatingChange(value, id);
                }}
              ></Rate>
            ) : (
              <Rate
                className="movie__stars"
                allowHalf
                count={10}
                value={rating}
                onChange={(value) => {
                  onRatingChange(value, id);
                }}
              ></Rate>
            )}
          </div>
        </div>
      </Flex>
    );
  }
}
