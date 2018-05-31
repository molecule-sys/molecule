import { connect } from 'react-redux';
import Executive from '../components/sys-manager/Executive';
import {
  activateOrganization,
  deactivateOrganization,
} from '../actions/organizations';

const mapDispatchToProps = (dispatch, { executive }) => ({
  activateExecutive: () => {
    dispatch(
      activateOrganization(executive.id, 'executive')
    );
  },
  deactivateExecutive: () => {
    dispatch(
      deactivateOrganization(executive.id, 'executive')
    );
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Executive);
