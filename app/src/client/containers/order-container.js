import { connect } from 'react-redux';
import Order from '../components/operator/Order';
import {
  confirmOrder,
  getDeleteOrder,
  getRenewCode,
} from '../actions/orders';
import clear from '../actions/apiCallback';

const mapStateToProps = ({ reducer }, ownProps) => ({
  apiCallback: reducer.data.apiCallback.confirmOrder,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  setConfirm: (params) => {
    dispatch(confirmOrder(params));
  },
  renewCode: (id) => {
    dispatch(getRenewCode(id));
  },
  deleteOrder: (id) => {
    dispatch(getDeleteOrder(id));
  },
  clearCallbackResponse: (key) => {
    dispatch(clear(key));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Order);
