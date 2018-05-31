import { connect } from 'react-redux';
import AddVehicle from '../components/Modals/AddVehicle';
import {
  getVehiclesVendors,
  getVehiclesModels,
  saveVehicle,
} from '../actions/vehicles';
import { getDriversList } from '../actions/drivers';
import clear from '../actions/apiCallback';

const mapStateToProps = ({ reducer }, ownProps) => ({
  vehicleVendors: reducer.vehicleVendors,
  vehicleModels: reducer.vehicleModels,
  drivers: reducer.driversList,
  apiCallback: reducer.data.apiCallback.addVehicle,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  fetchVehiclesVendors: (params) => {
    dispatch(getVehiclesVendors(params));
  },
  fetchVehiclesModels: (params) => {
    dispatch(getVehiclesModels(params));
  },
  fetchDriversList: () => {
    dispatch(getDriversList());
  },
  addVehicle: (params) => {
    dispatch(saveVehicle(params));
  },
  clearCallbackResponse: (key) => {
    dispatch(clear(key));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddVehicle);
