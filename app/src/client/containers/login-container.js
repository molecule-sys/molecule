import { connect } from 'react-redux';
import Login from '../components/Login';
import { auth } from '../actions/user';
import clear from '../actions/apiCallback';

const mapStateToProps = ({ reducer }, ownProps) => ({
  apiCallback: reducer.data.apiCallback.login,
  profile: reducer.profile,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  login: ({ username, password }) => {
    dispatch(
      auth(username, password),
    );
  },
  clearCallbackResponse: (key) => {
    dispatch(clear(key));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
