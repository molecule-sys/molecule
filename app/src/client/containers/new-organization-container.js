import { connect } from 'react-redux';
import NewOrganization from '../components/sys-manager/NewOrganization';
import { getOrganizationTypes, saveOrganization, getCategory } from '../actions/organizations';
import clear from '../actions/apiCallback';

const mapStateToProps = ({ reducer }, ownProps) => ({
  types: reducer.types,
  organizationCategory: reducer.organizationCategory,
  apiCallback: reducer.data.apiCallback.addOrganization,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  addOrganization: (params) => {
    dispatch(saveOrganization(params));
  },
  fetchOrganizationTypes: () => {
    dispatch(getOrganizationTypes());
  },
  clearCallbackResponse: (key) => {
    dispatch(clear(key));
  },
  fetchOrganizationCategory: () => {
    dispatch(getCategory());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewOrganization);
