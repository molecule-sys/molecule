import { connect } from 'react-redux';
import VehicleModel from '../components/sys-manager/VehicleModel';
import {
  activateVehicleModel,
  deactivateVehicleModel,
} from '../actions/vehicles';

const mapDispatchToProps = (dispatch, { vehicleModel }) => ({
  activateModel: () => {
    dispatch(
      activateVehicleModel(vehicleModel.id)
    );
  },
  deactivateModel: () => {
    dispatch(
      deactivateVehicleModel(vehicleModel.id)
    );
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(VehicleModel);
