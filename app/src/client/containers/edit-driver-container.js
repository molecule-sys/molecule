import { connect } from 'react-redux';
import EditDriver from '../components/Modals/EditDriver';
import { getVehiclesList } from '../actions/vehicles';
import { editDriver } from '../actions/drivers';
import clear from '../actions/apiCallback';

const mapStateToProps = ({ reducer }, ownProps) => ({
  vehicle: reducer.vehicleList,
  apiCallback: reducer.data.apiCallback.editDriver,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  fetchVehicles: () => {
    dispatch(getVehiclesList());
  },
  editDriver: (params) => {
    dispatch(editDriver(params));
  },
  clearCallbackResponse: (key) => {
    dispatch(clear(key));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditDriver);
