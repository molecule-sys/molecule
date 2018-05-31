import { connect } from 'react-redux';
import Orders from '../components/operator/Orders';
import { getOrders, changePageOrders } from '../actions/orders';

const mapStateToProps = ({ reducer }, ownProps) => ({
  orders: reducer.orders,
  pagination: reducer.ordersPagination,
  loading: reducer.data.loading,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  fetchOrders: () => {
    dispatch(getOrders());
  },
  onChangePage: (params) => {
    dispatch(changePageOrders(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Orders);
