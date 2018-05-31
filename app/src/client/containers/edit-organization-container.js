import { connect } from 'react-redux';
import EditOrganization from '../components/Modals/EditOrganization';
import { editOrganization, getCategory } from '../actions/organizations';
import clear from '../actions/apiCallback';

const mapStateToProps = ({ reducer }, ownProps) => ({
  organizationCategory: reducer.organizationCategory,
  apiCallback: reducer.data.apiCallback.editOrganization,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  editOrganization: (params) => {
    dispatch(editOrganization(params));
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
)(EditOrganization);
