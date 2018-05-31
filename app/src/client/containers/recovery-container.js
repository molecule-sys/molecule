import { connect } from 'react-redux';
import Recovery from '../components/Recovery';
import { recovery } from '../actions/user';
import clear from '../actions/apiCallback';

const mapStateToProps = ({ reducer }, ownProps) => ({
  apiCallback: reducer.data.apiCallback.recovery,
  profile: reducer.profile,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  onRecovery: (email) => {
    dispatch(recovery(email));
  },
  clearCallbackResponse: (key) => {
    dispatch(clear(key));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Recovery);
