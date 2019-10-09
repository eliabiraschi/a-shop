import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import {
  createStore,
  compose
} from 'redux'
import { reactReduxFirebase } from 'react-redux-firebase'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import aShopApp from './reducers'
import AppView from './views/AppView'
import LandingPage from './views/Landing'
import { firebase } from './config'

import style from './style/index.scss'

// react-redux-firebase options
const config = {
  userProfile: 'users', // firebase root where user profiles are stored
  enableLogging: false, // enable/disable Firebase's database logging
  perserveOnLogout: ['products']
}

// Add redux Firebase to compose
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, config),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)(createStore)

// Create store with reducers and initial state
const store = createStoreWithFirebase(aShopApp, {})

render(
  <div className={style.root}>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/v1' component={AppView} />
        </Switch>
      </Router>
    </Provider>
  </div>,
  document.getElementById('root')
)
