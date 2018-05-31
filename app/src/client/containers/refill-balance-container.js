import { connect } from 'react-redux';
import RefillBalance from '../components/Modals/RefillBalance';
import { invoice } from '../actions/exchange';
import clear from '../actions/apiCallback';

const mapStateToProps = ({ reducer }, ownProps) => ({
  refillFile: reducer.refillFile,
  apiCallback: reducer.data.apiCallback.refillBalance,
  loading: reducer.data.loading,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  onInvoice: (params) => {
    dispatch(invoice(params));
  },
  clearCallbackResponse: (key) => {
    dispatch(clear(key));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RefillBalance);
