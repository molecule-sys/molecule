import { connect } from 'react-redux';
import User from '../components/sys-manager/User';
import {
  activateUserOrganizations,
  deactivateUserOrganizations,
  loginAs,
} from '../actions/user';

const mapDispatchToProps = (dispatch, { user }) => ({
  activateUser: () => {
    dispatch(activateUserOrganizations(user.id));
  },
  deactivateUser: () => {
    dispatch(deactivateUserOrganizations(user.id));
  },
  onLoginAs: (params) => {
    dispatch(loginAs(params));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(User);
