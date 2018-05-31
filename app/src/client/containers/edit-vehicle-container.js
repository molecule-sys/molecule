import { connect } from 'react-redux';
import EditVehicle from '../components/Modals/EditVehicle';
import {
  getVehiclesVendors,
  getVehiclesModels,
  editVehicle,
} from '../actions/vehicles';
import { getDriversList } from '../actions/drivers';
import clear from '../actions/apiCallback';

const mapStateToProps = ({ reducer }, ownProps) => ({
  vehicleVendors: reducer.vehicleVendors,
  vehicleModels: reducer.vehicleModels,
  drivers: reducer.driversList,
  apiCallback: reducer.data.apiCallback.editVehicle,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  fetchVehiclesVendors: (params) => {
    dispatch(getVehiclesVendors(params));
  },
  fetchVehiclesModels: (id) => {
    dispatch(getVehiclesModels(id));
  },
  fetchDriversList: () => {
    dispatch(getDriversList());
  },
  editVehicle: (params) => {
    dispatch(editVehicle(params));
  },
  clearCallbackResponse: (key) => {
    dispatch(clear(key));
  },
  clearVehicleVendors: () => {
    dispatch({
      type: 'CLEAR_VEHICLE_VENDORS',
    });
  },
  clearVehicleModels: () => {
    dispatch({
      type: 'CLEAR_VEHICLE_MODELS',
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditVehicle);
