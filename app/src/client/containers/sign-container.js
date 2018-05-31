import { connect } from 'react-redux';
import Sign from '../components/Sign';

const mapDispatchToProps = dispatch => ({
  login: () => {
    dispatch({
      type: 'LOGIN_SUCCESS',
    });
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Sign);
