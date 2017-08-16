import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import RootReducer from './reducers/reducers'; 

import Main from './components/Main';
import Admin from './components/Admin';

// create browserHistory from react-router
const history = createHistory();

// Builds middleware for navigation actions (ie. changing routes)
const middleware = routerMiddleware(history);

// added a logger so you can see the previous state, action, and next state in the console
const store = createStore(
  RootReducer(),
  applyMiddleware(thunk, logger, middleware)
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Route exact path="/" component={() => <Main push={history.push} />} />
            <Route path="/admin" component={() => <Admin push={history.push} /> } />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
);

