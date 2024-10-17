import { Component } from 'react';
import './header.css';

import Tabs from '../tabs';
import SearchPanel from '../search-panel';

export default class Header extends Component {
  render() {
    return (
      <header>
        <Tabs />
        <SearchPanel />
      </header>
    );
  }
}
