import { Component } from 'react';
import './app.css';

import Search from '../search';
import Rated from '../rated';
import MoviesService from '../../services/movies-service';

import { Tabs, ConfigProvider } from 'antd';

export default class App extends Component {
  MoviesService = new MoviesService();

  componentDidMount() {
    this.MoviesService.initGuestSession().catch(this.onError);
  }

  render() {
    const tabs = [
      {
        key: '1',
        label: 'Search',
        children: <Search />,
      },
      {
        key: '2',
        label: 'Rated',
        children: <Rated />,
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
          <Tabs defaultActiveKey="1" items={tabs} centered></Tabs>
        </ConfigProvider>
      </div>
    );
  }
}
