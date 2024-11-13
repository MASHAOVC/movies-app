import { Component } from 'react';
import './app.css';

import Search from '../search';
import Rated from '../rated';
import MoviesService from '../../services/movies-service';

import { Tabs, ConfigProvider } from 'antd';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      activeTabKey: '1',
    };
  }

  MoviesService = new MoviesService();

  componentDidMount() {
    this.MoviesService.initGuestSession().catch(this.onError);
  }

  onError = (err) => {
    console.error(err);

    this.setState({
      error: true,
      loading: false,
    });
  };

  onRatingChange = async (value, id) => {
    await this.MoviesService.postRating(value, id).catch(this.onError);
  };

  onTabChange = (key) => {
    this.setState({ activeTabKey: key });
  };

  render() {
    const { activeTabKey } = this.state;

    const tabs = [
      {
        key: '1',
        label: 'Search',
        children: <Search activeTabKey={activeTabKey} onError={this.onError} onRatingChange={this.onRatingChange} />,
      },
      {
        key: '2',
        label: 'Rated',
        children: <Rated onError={this.onError} onRatingChange={this.onRatingChange} />,
      },
    ];

    return (
      <div className="app">
        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                itemSelectedColor: '#1890FF',
                itemColor: '#000000A6',
                inkBarColor: '#1890FF',
                fontFamily: "'Inter', sans-serif",
                lineWidth: 0,
                lineHeight: 2,
              },
            },
          }}
        >
          <Tabs
            onChange={this.onTabChange}
            activeKey={activeTabKey}
            destroyInactiveTabPane
            defaultActiveKey="1"
            items={tabs}
            centered
          ></Tabs>
        </ConfigProvider>
      </div>
    );
  }
}
