import { connect } from 'react-redux';
import Header from '../components/Shared/Header';
import { logout } from '../actions/user';
import { waiting } from '../actions/exchange';
import { getBalance } from '../actions/organizations';

const mapStateToProps = ({ reducer }, ownProps) => ({
  isLogged: reducer.data.isLogged,
  project: reducer.data.project,
  balance: reducer.balance,
  exchangeWaiting: reducer.exchangeWaiting,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout());
  },
  onWaiting: () => {
    dispatch(waiting());
  },
  fetchBalance: () => {
    dispatch(getBalance());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
