import { connect } from 'react-redux';
import Profile from '../components/Profile/Profile';
import { getProfile } from '../actions/user';

const mapStateToProps = ({ reducer }, ownProps) => ({
  profile: reducer.profile,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  setSearchResults: ({ searchResults, key }) => {
    dispatch(setSearchResultsAction(searchResults, key));
  },
  fetchProfile: () => {
    dispatch(getProfile());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
