import React from 'react'
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import ToolBar from '../containers/ToolBar'
import VisibleProductsList from '../containers/VisibleProductsList'
import CheckoutView from '../containers/CheckoutView'
import OrdersView from '../containers/OrdersView'

import style from '../style/appView.scss'

const AppView = state => (
  <Router>
    <div className={style.root}>
      <ToolBar />
      <Switch>
        <Route exact path='/v1' component={VisibleProductsList} />
        <Route path='/v1/f/:filter?' component={VisibleProductsList} />
        <Route path='/v1/checkout' component={CheckoutView} />
        <Route path='/v1/orders' component={OrdersView} />
      </Switch>
    </div>
  </Router>
)

export default compose(
  firebaseConnect(props => (['products', 'orders', 'tags']))
)(AppView)
