import React from 'react';
import { times, identity } from 'ramda';

export default class Pagination extends React.PureComponent {

  static propTypes = {
    pagination: React.PropTypes.instanceOf(Object).isRequired,
    onChangePage: React.PropTypes.func.isRequired,
  }

  isActive = (number) => {
    const { pagination } = this.props;
    return number === pagination.currentPage ?
      'ButtonPrimary--active' : '';
  }

  render() {
    const { pagination } = this.props;
    return (
      <nav className="Pagination">
        {pagination.pagesCount > 6 ?
          <div>
            {pagination.currentPage !== 1 &&
              <div>
                <button
                  className="Button ButtonPrimary"
                  onClick={() => {
                    this.props.onChangePage({
                      page: 1,
                    });
                  }}
                >
                  {'<<'}
                </button>
              </div>
            }
            {pagination.currentPage !== 1 &&
              <div>
                <button
                  className="Button ButtonPrimary"
                  onClick={() => {
                    this.props.onChangePage({
                      page: pagination.currentPage - 1 < 1 ? 1 : pagination.currentPage - 1,
                    });
                  }}
                >
                  {'<'}
                </button>
              </div>
            }
            <div>
              <button
                className={`Button ButtonPrimary ${pagination.currentPage <= pagination.pagesCount - 2 ? 'ButtonPrimary--active' : ''}`}
                onClick={() => {
                  this.props.onChangePage({
                    page: pagination.currentPage >= pagination.pagesCount - 2 ? pagination.pagesCount - 2 : pagination.currentPage,
                  });
                }}
              >
                {pagination.currentPage >= pagination.pagesCount - 2 ? pagination.pagesCount - 2 : pagination.currentPage}
              </button>
            </div>
            <div>
              <button
                className={`Button ButtonPrimary ${pagination.currentPage === pagination.pagesCount - 1 ? 'ButtonPrimary--active' : ''}`}
                onClick={() => {
                  this.props.onChangePage({
                    page: pagination.currentPage >= pagination.pagesCount - 2 ? pagination.pagesCount - 1 : pagination.currentPage + 1,
                  });
                }}
              >
                {pagination.currentPage >= pagination.pagesCount - 2 ? pagination.pagesCount - 1 : pagination.currentPage + 1}
              </button>
            </div>
            <div>
              <button
                className={`Button ButtonPrimary ${pagination.currentPage === pagination.pagesCount ? 'ButtonPrimary--active' : ''}`}
                onClick={() => {
                  this.props.onChangePage({
                    page: pagination.currentPage >= pagination.pagesCount - 2 ? pagination.pagesCount : pagination.currentPage + 2,
                  });
                }}
              >
                {pagination.currentPage >= pagination.pagesCount - 2 ? pagination.pagesCount : pagination.currentPage + 2}
              </button>
            </div>
            {pagination.currentPage <= pagination.pagesCount - 3 &&
              <div>
                <button
                  className="Button ButtonPrimary"
                  onClick={() => {
                    this.props.onChangePage({
                      page: pagination.currentPage + 1 > pagination.pagesCount ? pagination.pagesCount : pagination.currentPage + 1,
                    });
                  }}
                >
                  {'>'}
                </button>
              </div>
            }
            {pagination.currentPage <= pagination.pagesCount - 3 &&
              <div>
                <button
                  className="Button ButtonPrimary"
                  onClick={() => {
                    this.props.onChangePage({
                      page: pagination.pagesCount,
                    });
                  }}
                >
                  {'>>'}
                </button>
              </div>
            }
          </div>
        :
          <div>
            {times(identity, pagination.pagesCount).map((item, i) =>
              <div key={i}>
                <button
                  className={`Button ButtonPrimary ${this.isActive(i + 1)}`}
                  onClick={() => {
                    this.props.onChangePage({
                      page: i + 1,
                    });
                  }}
                >
                  {i + 1}
                </button>
              </div>
            )}
          </div>
        }
      </nav>
    );
  }

}
