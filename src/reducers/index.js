import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'

import cart from './cart'
import checkout from './checkout'
import visibilityFilter from './visibilityFilter'

const aShopApp = combineReducers({
  cart,
  visibilityFilter,
  checkout,
  firebase: firebaseReducer
})

export default aShopApp
