import { Component } from 'react';
import './header.css';

import SearchPanel from '../search-panel';

export default class Header extends Component {
  render() {
    const { label, onInputChange } = this.props;

    return (
      <header>
        <SearchPanel label={label} onInputChange={onInputChange} />
      </header>
    );
  }
}
