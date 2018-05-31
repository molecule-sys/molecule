import { connect } from 'react-redux';
import EditUser from '../components/Modals/EditUser';
import {
  setUser,
} from '../actions/user';
import clear from '../actions/apiCallback';

const mapStateToProps = ({ reducer }, ownProps) => ({
  apiCallback: reducer.data.apiCallback.editUser,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  editUser: (params) => {
    dispatch(setUser(params));
  },
  clearCallbackResponse: (key) => {
    dispatch(clear(key));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditUser);
