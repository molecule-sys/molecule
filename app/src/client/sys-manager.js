import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import SettingsContainer from './containers/settings-container';
import CustomersContainer from './containers/customers-container';
import ExecutivesContainer from './containers/executives-container';
import NewOrganizationContainer from './containers/new-organization-container';
import VehicleModelsContainer from './containers/vehicle-models-container';
import ProfileContainer from './containers/profile-container';
import FeedbackContainer from './containers/feedback-container';
import StatisticContainer from './containers/statistic-container';
import UsersContainer from './containers/users-container';
import SignContainer from './containers/sign-container';
import NoMatch from './components/NoMatch';
import reducer from './reducers/sys-manager-reducer';
import isLogged from './helpers/isLogged';

const middlewares = applyMiddleware(
  thunkMiddleware,
);

const store = createStore(
  combineReducers({
    reducer,
    routing: routerReducer,
  }),
  {
    reducer: {
      data: {
        loading: 0,
        project: 'sys-manager',
        isLogged: isLogged(),
        apiCallback: {
          feedback: {},
          executives: {},
          customers: {},
          vehicleModel: {},
          settings: {},
          addVendor: {},
          editVendor: {},
          addModel: {},
          addUser: {},
          editModel: {},
          editUser: {},
          addOrganization: {},
          editOrganization: {},
        },
      },
      acts: [],
      actToPrint: '',
      users: [],
      usersPagination: {},
      roleId: '',
      customers: [],
      customersPagination: {},
      executives: [],
      executivesPagination: {},
      vehicleTypes: [],
      vehicleTypesPagination: {},
      vehicleVendors: [],
      vehicleModels: [],
      vehicleModelsPagination: {},
      types: [],
      profile: {},
      filterOrganizationList: [],
      filterDriversList: [],
      filterVehiclesList: [],
      organizationList: [],
      organizationCategory: [],
    },
  },
  middlewares,
);

const HISTORY = syncHistoryWithStore(browserHistory, store);

function initApp() {
  const container = document.getElementById('app');

  ReactDOM.render(
    <Provider store={store}>
      <Router history={HISTORY}>
        <Route path="/" component={CustomersContainer} />
        <Route path="executives" component={ExecutivesContainer} />
        <Route path="new-organization" component={NewOrganizationContainer} />
        <Route path="vehicle-models" component={VehicleModelsContainer} />
        <Route path="profile" component={ProfileContainer} />
        <Route path="settings" component={SettingsContainer} />
        <Route path="feedback" component={FeedbackContainer} />
        <Route path="statistic" component={StatisticContainer} />
        <Route path="users" component={UsersContainer} />
        <Route path="sign/**" component={SignContainer} />
        <Route path="*" component={NoMatch} status={404} />
      </Router>
    </Provider>,
    container,
  );
}

initApp();
