import { connect } from 'react-redux';
import Executives from '../components/sys-manager/Executives';
import {
  getExecutives,
  getOrganizationTypes,
  findOrganization,
  changePageOrganization,
} from '../actions/organizations';

const mapStateToProps = ({ reducer }, ownProps) => ({
  executives: reducer.executives,
  pagination: reducer.executivesPagination,
  types: reducer.types,
  loading: reducer.data.loading,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  fetchExecutives: (params) => {
    dispatch(getExecutives(params));
  },
  fetchOrganizationTypes: () => {
    dispatch(getOrganizationTypes());
  },
  onSearchRequest: (params) => {
    dispatch(findOrganization(params));
  },
  onChangePage: (params) => {
    dispatch(changePageOrganization(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Executives);
