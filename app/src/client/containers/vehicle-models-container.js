import { connect } from 'react-redux';
import VehicleModels from '../components/sys-manager/VehicleModels';
import {
  getVehiclesVendors,
  getVehiclesModelsPaginate,
  changePageVehicleModels,
} from '../actions/vehicles';

const mapStateToProps = ({ reducer }, ownProps) => ({
  vehicleVendors: reducer.vehicleVendors,
  vehicleModels: reducer.vehicleModels,
  pagination: reducer.vehicleModelsPagination,
  loading: reducer.data.loading,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  fetchVehiclesVendors: (params) => {
    dispatch(getVehiclesVendors(params));
  },
  fetchVehiclesModels: (params) => {
    dispatch(getVehiclesModelsPaginate(params));
  },
  onChangePage: (params) => {
    dispatch(changePageVehicleModels(params));
  },
  clearModelsList: () => {
    dispatch({
      type: 'CLEAR_VEHICLE_MODELS_LIST',
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VehicleModels);
