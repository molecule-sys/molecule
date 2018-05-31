import { connect } from 'react-redux';
import Settings from '../components/Profile/Settings';
import { changePassword } from '../actions/user';
import clear from '../actions/apiCallback';

const mapStateToProps = ({ reducer }, ownProps) => ({
  apiCallback: reducer.data.apiCallback.settings,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  onChangePassword: (params) => {
    dispatch(changePassword(params));
  },
  clearCallbackResponse: (key) => {
    dispatch(clear(key));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
