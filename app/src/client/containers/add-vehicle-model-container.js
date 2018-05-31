import { connect } from 'react-redux';
import AddVehicleModel from '../components/Modals/AddVehicleModel';
import {
  saveModel,
} from '../actions/vehicles';
import clear from '../actions/apiCallback';

const mapStateToProps = ({ reducer }, ownProps) => ({
  apiCallback: reducer.data.apiCallback.addModel,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  addModel: (params) => {
    dispatch(saveModel(params));
  },
  clearCallbackResponse: (key) => {
    dispatch(clear(key));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddVehicleModel);
