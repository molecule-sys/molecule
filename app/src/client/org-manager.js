import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import SettingsContainer from './containers/settings-container';
import VehiclesContainer from './containers/vehicles-container';
import DriversContainer from './containers/drivers-container';
import ProfileContainer from './containers/profile-container';
import FeedbackContainer from './containers/feedback-container';
import StatisticContainer from './containers/statistic-container';
import SignContainer from './containers/sign-container';
import NoMatch from './components/NoMatch';
import reducer from './reducers/org-manager-reducer';
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
        project: 'org-manager',
        isLogged: isLogged(),
        apiCallback: {
          refillBalance: {},
          vehicle: {},
          feedback: {},
          drivers: {},
          addDriver: {},
          editDriver: {},
          addVehicle: {},
          editVehicle: {},
          settings: {},
          editUser: {},
          addVehicleRequest: {},
        },
      },
      refillFile: '',
      acts: [],
      actToPrint: '',
      balance: -1,
      exchangeWaiting: 0,
      drivers: [],
      driversPagination: {},
      vehicle: [],
      vehicleList: [],
      vehiclePagination: {},
      vehicleVendors: [],
      vehicleModels: [],
      driversList: [],
      profile: {},
      filterOrganizationList: [],
      filterDriversList: [],
      filterVehiclesList: [],
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
        <Route path="/" component={VehiclesContainer} />
        <Route path="drivers" component={DriversContainer} />
        <Route path="profile" component={ProfileContainer} />
        <Route path="settings" component={SettingsContainer} />
        <Route path="feedback" component={FeedbackContainer} />
        <Route path="statistic" component={StatisticContainer} />
        <Route path="sign/**" component={SignContainer} />
        <Route path="*" component={NoMatch} status={404} />
      </Router>
    </Provider>,
    container,
  );
}

initApp();
