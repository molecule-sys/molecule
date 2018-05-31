import { connect } from 'react-redux';
import Driver from '../components/org-manager/Driver';
import {
  activateDriver,
  deactivateDriver,
} from '../actions/drivers';


const mapDispatchToProps = (dispatch, { driver }) => ({
  onActivateDriver: () => {
    dispatch(
      activateDriver(driver.id)
    );
  },
  onDeactivateDriver: () => {
    dispatch(
      deactivateDriver(driver.id)
    );
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Driver);
