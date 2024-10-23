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
    const description =
      'A love story set in a dystopian near future where single people are arrested and transferred to a creepy hotel. There they are obliged to find a matching mate in 45 days. If they fail, they are transformed into an animal and released into the woods. A love story set in a dystopian near future where single people are arrested and transferred to a creepy hotel. There they are obliged to find a matching mate in 45 days. If they fail, they are transformed into an animal and released into the woods.';

    return (
      <Flex className="movie">
        <img
          className="movie__poster"
          src="https://poster4.me/wp-content/uploads/2020/05/lobster_2-768x1152.jpg"
          alt="Poster"
        />
        <div className="movie__content-wrapper">
          <header>
            <h1 className="movie__title">The Lobster</h1>
            <div className="movie__rating">Rating</div>
          </header>
          <main>
            <div className="movie__date">May 15, 2015</div>
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
