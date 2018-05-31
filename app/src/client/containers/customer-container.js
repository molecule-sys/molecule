import { connect } from 'react-redux';
import Customer from '../components/sys-manager/Customer';
import {
  activateOrganization,
  deactivateOrganization,
} from '../actions/organizations';

const mapDispatchToProps = (dispatch, { customer }) => ({
  activateCustomer: () => {
    dispatch(
      activateOrganization(customer.id, 'customer')
    );
  },
  deactivateCustomer: () => {
    dispatch(
      deactivateOrganization(customer.id, 'customer')
    );
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Customer);
