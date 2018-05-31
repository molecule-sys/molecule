import { connect } from 'react-redux';
import Statistic from '../components/Statistic';
import {
  getStatistic,
  getFilterOrganizationsList,
  getFilterVehiclesList,
  getFilterDriversList,
} from '../actions/organizations';
import { getProfile } from '../actions/user';
import { getActs, getActPrint } from '../actions/exchange';

const mapStateToProps = ({ reducer }, ownProps) => ({
  statistic: reducer.statistic,
  profile: reducer.profile,
  filterOrganizationList: reducer.filterOrganizationList,
  filterDriversList: reducer.filterDriversList,
  filterVehiclesList: reducer.filterVehiclesList,
  acts: reducer.acts,
  actToPrint: reducer.actToPrint,
  loading: reducer.data.loading,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  fetchStatistic: (params) => {
    dispatch(getStatistic(params));
  },
  fetchProfile: () => {
    dispatch(getProfile());
  },
  fetchFilterOrganizations: (type) => {
    dispatch(getFilterOrganizationsList(type));
  },
  fetchFilterVehicles: (params) => {
    dispatch(getFilterVehiclesList(params));
  },
  fetchFilterDrivers: (params) => {
    dispatch(getFilterDriversList(params));
  },
  clearStatistic: () => {
    dispatch({
      type: 'CLEAR_STATISTIC',
    });
  },
  fetchActs: (params) => {
    dispatch(getActs(params));
  },
  fetchActPrint: (params) => {
    dispatch(getActPrint(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Statistic);
