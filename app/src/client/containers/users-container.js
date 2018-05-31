import { connect } from 'react-redux';
import Users from '../components/sys-manager/Users';
import {
  getProfile,
  getUsers,
  changePageUsers,
  findUsers,
} from '../actions/user';
import { getOrganizationsList } from '../actions/organizations';

const mapStateToProps = ({ reducer }, ownProps) => ({
  profile: reducer.profile,
  users: reducer.users,
  organizationList: reducer.organizationList,
  pagination: reducer.usersPagination,
  roleId: reducer.roleId,
  loading: reducer.data.loading,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: (params) => {
    dispatch(getUsers(params));
  },
  onSearchRequest: (params) => {
    dispatch(findUsers(params));
  },
  fetchFilterOrganizations: (type) => {
    dispatch(getOrganizationsList(type));
  },
  onChangePage: (params) => {
    dispatch(changePageUsers(params));
  },
  fetchProfile: () => {
    dispatch(getProfile());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users);
