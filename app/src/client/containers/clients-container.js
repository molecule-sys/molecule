import { connect } from 'react-redux';
import Clients from '../components/operator/Clients';
import { findDriver } from '../actions/drivers';
import { getServiceList } from '../actions/orders';

const mapStateToProps = ({ reducer }, ownProps) => ({
  clients: reducer.clients,
  serviceList: reducer.serviceList,
  loading: reducer.data.loading,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  onSearchRequest: (searchText) => {
    dispatch(findDriver(searchText));
  },
  fetchServiceList: () => {
    dispatch(getServiceList());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Clients);
