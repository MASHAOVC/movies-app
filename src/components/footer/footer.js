import { Component } from 'react';
import './footer.css';
import { Pagination } from 'antd';

export default class Footer extends Component {
  render() {
    const { onPaginationChange, page, totalPages } = this.props;

    return (
      <div className="footer">
        {totalPages > 1 ? (
          <Pagination
            defaultCurrent={page}
            total={totalPages}
            onChange={(page, pageSize) => {
              onPaginationChange(page);
            }}
          />
        ) : null}
      </div>
    );
  }
}
