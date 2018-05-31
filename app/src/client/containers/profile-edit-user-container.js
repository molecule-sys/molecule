import { connect } from 'react-redux';
import ProfileEditUser from '../components/Modals/ProfileEditUser';
import {
  setUser,
  getProfile,
} from '../actions/user';
import clear from '../actions/apiCallback';

const mapStateToProps = ({ reducer }, ownProps) => ({
  apiCallback: reducer.data.apiCallback.editUser,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  fetchProfile: () => {
    dispatch(getProfile());
  },
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
)(ProfileEditUser);
