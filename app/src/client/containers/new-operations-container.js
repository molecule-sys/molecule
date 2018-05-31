import { connect } from 'react-redux';
import NewOperations from '../components/Modals/NewOperations';
import { addOrder } from '../actions/orders';
import clear from '../actions/apiCallback';

const mapStateToProps = ({ reducer }, ownProps) => ({
  apiCallback: reducer.data.apiCallback.newOperation,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  addNewOperations: (params) => {
    dispatch(addOrder(params));
  },
  clearCallbackResponse: (key) => {
    dispatch(clear(key));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewOperations);
