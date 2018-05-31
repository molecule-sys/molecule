import { connect } from 'react-redux';
import Feedback from '../components/Feedback';
import { feedback } from '../actions/user';
import clear from '../actions/apiCallback';

const mapStateToProps = ({ reducer }, ownProps) => ({
  apiCallback: reducer.data.apiCallback.feedback,
  project: reducer.data.project,
  loading: reducer.data.loading,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  onFeedback: (params) => {
    dispatch(feedback(params));
  },
  clearCallbackResponse: (key) => {
    dispatch(clear(key));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Feedback);
