import { Component } from 'react';
import './footer.css';
import { Pagination } from 'antd';

export default class Footer extends Component {
  render() {
    const { onPaginationChange, page, totalResults, moviesData, inputLabel, loading } = this.props;

    return (
      <div className="footer">
        {moviesData.length > 0 && inputLabel && !loading && (
          <Pagination
            current={page}
            total={totalResults}
            pageSize={20}
            hideOnSinglePage={true}
            showSizeChanger={false}
            onChange={(page, pageSize) => {
              onPaginationChange(page);
            }}
          />
        )}
      </div>
    );
  }
}
