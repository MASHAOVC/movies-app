import { Component } from 'react';
import './search-panel.css';
import { Input } from 'antd';

export default class SearchPanel extends Component {
  render() {
    const { label, onInputChange } = this.props;

    return (
      <Input
        className="search-panel"
        placeholder="Type to search..."
        style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px' }}
        value={label}
        onChange={(e) => {
          onInputChange(e.target.value);
        }}
      ></Input>
    );
  }
}
