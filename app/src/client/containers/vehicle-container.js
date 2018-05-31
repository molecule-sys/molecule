import { connect } from 'react-redux';
import Vehicle from '../components/org-manager/Vehicle';
import {
  activateVehicle,
  deactivateVehicle,
} from '../actions/vehicles';

const mapDispatchToProps = (dispatch, { vehicle }) => ({
  onActivateVehicle: () => {
    dispatch(activateVehicle(vehicle.id));
  },
  onDeactivateVehicle: () => {
    dispatch(deactivateVehicle(vehicle.id));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Vehicle);
