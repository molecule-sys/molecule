import { connect } from 'react-redux';
import Customers from '../components/sys-manager/Customers';
import {
  getCustomers,
  getOrganizationTypes,
  findOrganization,
  changePageOrganization,
} from '../actions/organizations';

const mapStateToProps = ({ reducer }, ownProps) => ({
  customers: reducer.customers,
  pagination: reducer.customersPagination,
  types: reducer.types,
  loading: reducer.data.loading,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  fetchCustomers: (params) => {
    dispatch(getCustomers(params));
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
)(Customers);
