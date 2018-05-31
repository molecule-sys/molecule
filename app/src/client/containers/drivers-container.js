import { connect } from 'react-redux';
import Drivers from '../components/org-manager/Drivers';
import {
  getDrivers,
  findDrivers,
  changePageDrivers,
} from '../actions/drivers';

const mapStateToProps = ({ reducer }, ownProps) => ({
  drivers: reducer.drivers,
  pagination: reducer.driversPagination,
  loading: reducer.data.loading,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  fetchDrivers: (params) => {
    dispatch(getDrivers(params));
  },
  onSearchRequest: (params) => {
    dispatch(findDrivers(params));
  },
  onChangePage: (params) => {
    dispatch(changePageDrivers(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Drivers);
