import { connect } from 'react-redux';
import EditVehicleModel from '../components/Modals/EditVehicleModel';
import { editModel } from '../actions/vehicles';
import clear from '../actions/apiCallback';

const mapStateToProps = ({ reducer }, ownProps) => ({
  apiCallback: reducer.data.apiCallback.editModel,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  editModel: (params) => {
    dispatch(editModel(params));
  },
  clearCallbackResponse: (key) => {
    dispatch(clear(key));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditVehicleModel);
