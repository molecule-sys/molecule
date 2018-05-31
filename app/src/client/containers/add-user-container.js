import { connect } from 'react-redux';
import AddUser from '../components/Modals/AddUser';
import {
  saveUser,
} from '../actions/user';
import clear from '../actions/apiCallback';

const mapStateToProps = ({ reducer }, ownProps) => ({
  apiCallback: reducer.data.apiCallback.addUser,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  addUser: (params) => {
    dispatch(saveUser(params));
  },
  clearCallbackResponse: (key) => {
    dispatch(clear(key));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddUser);
