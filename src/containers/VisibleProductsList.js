import { connect } from 'react-redux'
import {
  clone,
  assoc,
  pipe,
  findIndex,
  propEq
} from 'ramda'

import { addProduct, removeProduct } from '../actions'
import ProductsList from '../components/ProductsList'

const mapObjectToArray = (input = {}) => Object.keys(input).map(key => assoc('dbKey', key, input[key]))

const addCartInfo = ({cart}) => input => {
  return input.map(item => {
    const index = findIndex(propEq('dbKey', item.dbKey))(cart)
    if (index > -1) {
      item['quantity'] = cart[index].quantity
      item.price.subTotal = item.price.value * item.quantity
    }
    return item
  })
}

const applyFilter = ({visibilityFilter}) => state => {
  if (visibilityFilter === 'SHOW_CART' || visibilityFilter === 'SHOW_CHECKOUT') {
    return state.filter(el => Boolean(el.quantity))
  } else {
    return state
  }
}

const calculateTotal = state => {
  if (state.length > 0) {
    const value = state.reduce((acc, cur) => {
      return acc + (cur.price.subTotal || 0)
    }, 0)
    return {
      value,
      currency: state[0].price.currency
    }
  } else {
    return {}
  }
}

const getFilterFromUrl = ({match}) => state => {
  state.visibilityFilter = 'SHOW_ALL'
  if (match) {
    if (match.params.filter === 'cart') {
      state.visibilityFilter = 'SHOW_CART'
    } else if (match.url === '/v1/checkout') {
      state.visibilityFilter = 'SHOW_CHECKOUT'
    }
  }
  return state
}

export const mapStateToProps = (state, ownProps) => {
  const clonedState = getFilterFromUrl(ownProps)(clone(state))
  const mappedData = pipe(mapObjectToArray, addCartInfo(clonedState))(clonedState.firebase.data.products)
  return {
    cartTotal: calculateTotal(mappedData),
    products: applyFilter(clonedState)(mappedData),
    visibilityFilter: clonedState.visibilityFilter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddOne: key => {
      dispatch(addProduct(key))
    },
    onRemoveOne: key => {
      dispatch(removeProduct(key))
    }
  }
}

const VisibleProductsList = connect(mapStateToProps, mapDispatchToProps)(ProductsList)

export default VisibleProductsList
