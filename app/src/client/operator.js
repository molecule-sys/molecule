import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import SettingsContainer from './containers/settings-container';
import ClientsContainer from './containers/clients-container';
import FeedbackContainer from './containers/feedback-container';
import OrdersContainer from './containers/orders-container';
import ProfileContainer from './containers/profile-container';
import SignContainer from './containers/sign-container';
import StatisticContainer from './containers/statistic-container';
import NoMatch from './components/NoMatch';
import reducer from './reducers/operator-reducer';
import isLogged from './helpers/isLogged';

const middlewares = applyMiddleware(
  thunkMiddleware,
);

const store = createStore(
  combineReducers({
    reducer,
    routing: routerReducer,
  }),
  { reducer: {
    data: {
      loading: 0,
      project: 'operator',
      isLogged: isLogged(),
      apiCallback: {
        clients: {},
        orders: {},
        newOperation: {},
        feedback: {},
        settings: {},
        confirmOrder: {},
        editUser: {},
      },
    },
    acts: [],
    actToPrint: '',
    clients: {},
    orders: [],
    ordersPagination: {},
    profile: {},
    filterOrganizationList: [],
    filterDriversList: [],
    filterVehiclesList: [],
    serviceList: [],
  } },
  middlewares,
);

const HISTORY = syncHistoryWithStore(browserHistory, store);

function initApp() {
  const container = document.getElementById('app');

  ReactDOM.render(
    <Provider store={store}>
      <Router history={HISTORY}>
        <Route path="/" component={ClientsContainer} />
        <Route path="orders" component={OrdersContainer} />
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
