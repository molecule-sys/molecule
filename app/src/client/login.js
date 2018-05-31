import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import FeedbackContainer from './containers/feedback-container';
import RecoveryContainer from './containers/recovery-container';
import LoginContainer from './containers/login-container';
import RecoverySuccess from './components/RecoverySuccess';
import RecoveryFail from './components/RecoveryFail';
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
      project: 'login',
      isLogged: isLogged(),
      apiCallback: {
        login: {},
        feedback: {},
        recovery: {},
      },
    },
    acts: [],
    actToPrint: '',
    profile: {},
  } },
  middlewares,
);

const HISTORY = syncHistoryWithStore(browserHistory, store);

function initApp() {
  const container = document.getElementById('app');

  ReactDOM.render(
    <Provider store={store}>
      <Router history={HISTORY}>
        <Route path="/" component={LoginContainer} />
        <Route path="feedback" component={FeedbackContainer} />
        <Route path="recovery" component={RecoveryContainer} />
        <Route path="recovery-success" component={RecoverySuccess} />
        <Route path="recovery-failed" component={RecoveryFail} />
        <Route path="*" component={NoMatch} status={404} />
      </Router>
    </Provider>,
    container,
  );
}

initApp();
