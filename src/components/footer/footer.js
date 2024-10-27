import { Component } from 'react';
import './footer.css';
import { Pagination } from 'antd';

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        {' '}
        <Pagination defaultCurrent={1} total={50} />{' '}
      </div>
    );
  }
}
