import { connect } from 'react-redux';
import AddVehicleRequest from '../components/Modals/AddVehicleRequest';
import {
  addVehicleRequest,
} from '../actions/vehicles';
import clear from '../actions/apiCallback';

const mapStateToProps = ({ reducer }, ownProps) => ({
  apiCallback: reducer.data.apiCallback.addVehicleRequest,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  onAddVehicleRequest: (params) => {
    dispatch(addVehicleRequest(params));
  },
  clearCallbackResponse: (key) => {
    dispatch(clear(key));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddVehicleRequest);
