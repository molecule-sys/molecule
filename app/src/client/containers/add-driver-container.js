import { connect } from 'react-redux';
import AddDriver from '../components/Modals/AddDriver';
import { saveDriver } from '../actions/drivers';
import { getVehiclesList } from '../actions/vehicles';
import clear from '../actions/apiCallback';

const mapStateToProps = ({ reducer }, ownProps) => ({
  vehicle: reducer.vehicleList,
  apiCallback: reducer.data.apiCallback.addDriver,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  fetchVehicles: () => {
    dispatch(getVehiclesList());
  },
  addDriver: (params) => {
    dispatch(saveDriver(params));
  },
  clearCallbackResponse: (key) => {
    dispatch(clear(key));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddDriver);
