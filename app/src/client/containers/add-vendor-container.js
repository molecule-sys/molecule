import { connect } from 'react-redux';
import AddVendor from '../components/Modals/AddVendor';
import {
  saveVendor,
} from '../actions/vehicles';
import clear from '../actions/apiCallback';

const mapStateToProps = ({ reducer }, ownProps) => ({
  apiCallback: reducer.data.apiCallback.addVendor,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  addVendor: (params) => {
    dispatch(saveVendor(params));
  },
  clearCallbackResponse: (key) => {
    dispatch(clear(key));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddVendor);
