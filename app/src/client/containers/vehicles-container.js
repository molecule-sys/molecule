import { connect } from 'react-redux';
import Vehicles from '../components/org-manager/Vehicles';
import {
  getVehicles,
  findVehicle,
  changePageVehicles,
} from '../actions/vehicles';

const mapStateToProps = ({ reducer }, ownProps) => ({
  vehicle: reducer.vehicle,
  pagination: reducer.vehiclePagination,
  loading: reducer.data.loading,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  fetchVehicles: (params) => {
    dispatch(getVehicles(params));
  },
  onSearchRequest: (params) => {
    dispatch(findVehicle(params));
  },
  onChangePage: (params) => {
    dispatch(changePageVehicles(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Vehicles);
