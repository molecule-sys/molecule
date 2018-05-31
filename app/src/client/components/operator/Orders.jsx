import React from 'react';
import HeaderContainer from '../../containers/header-container';
import Pagination from '../../components/Shared/Pagination';
import OrderContainer from '../../containers/order-container';
import isLogged from '../../decorators/isLogged';

@isLogged
export default class Orders extends React.PureComponent {

  static propTypes = {
    orders: React.PropTypes.instanceOf(Array).isRequired,
    pagination: React.PropTypes.instanceOf(Object).isRequired,
    loading: React.PropTypes.number.isRequired,
    fetchOrders: React.PropTypes.func,
    onChangePage: React.PropTypes.func,
  }

  componentWillMount = () => {
    this.props.fetchOrders();
  }

  changePage = ({ page }) => {
    this.props.onChangePage({
      page,
    });
  }

  render() {
    const { orders, pagination, loading } = this.props;
    return (
      <div>
        <HeaderContainer />
        <div className="Container">
          <div className="PageTitle">
            <h2>Operations</h2>
          </div>
          <div className="Operations">
            {orders.length > 0 && loading === 0 &&
              orders
                .filter(item => item.status !== 'ARCHIVED')
                .map((item, i) =>
                  <OrderContainer key={`${item.id}${i}`} order={item} />
                )
            }
            {orders.length === 0 && loading === 0 &&
              <span className="Message-error">Nothing found.</span>
            }
            {loading > 0 &&
              <span className="SearchResults-loading">Loading. Wait...</span>
            }
          </div>
          {pagination.pagesCount > 1 &&
            <Pagination
              pagination={pagination}
              onChangePage={this.changePage}
            />
          }
        </div>
      </div>
    );
  }

}
