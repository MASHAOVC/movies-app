import { Component } from 'react';
import './footer.css';
import { Pagination } from 'antd';

export default class Footer extends Component {
  render() {
    const { onPaginationChange, page, totalResults } = this.props;

    return (
      <div className="footer">
        <Pagination
          defaultCurrent={page}
          total={totalResults}
          onChange={(page, pageSize) => {
            onPaginationChange(page);
          }}
        />
      </div>
    );
  }
}
