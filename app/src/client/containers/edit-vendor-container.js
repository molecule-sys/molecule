import { connect } from 'react-redux';
import EditVendor from '../components/Modals/EditVendor';
import {
  editVendor,
} from '../actions/vehicles';
import clear from '../actions/apiCallback';

const mapStateToProps = ({ reducer }, ownProps) => ({
  apiCallback: reducer.data.apiCallback.editVendor,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  editVendor: (params) => {
    dispatch(editVendor(params));
  },
  clearCallbackResponse: (key) => {
    dispatch(clear(key));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditVendor);
