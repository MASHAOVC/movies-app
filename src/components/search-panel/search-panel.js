import { Component } from 'react';
import './search-panel.css';
import { Input } from 'antd';

export default class SearchPanel extends Component {
  render() {
    return <Input className="search-panel" placeholder="Type to search..."></Input>;
  }
}
