import {
  clone,
  inc,
  dec,
  findIndex,
  propEq
} from 'ramda'

const changeQuantityFactory = (dbKey, state = []) => handler => {
  if (handler && dbKey) {
    const index = findIndex(propEq('dbKey', dbKey))(state)
    index > -1
      ? state[index].quantity = handler(state[index].quantity || 0)
      : state.push({ dbKey, quantity: handler(0) })
  }
  return state.filter(cartItem => (cartItem.quantity > 0))
}

const cart = (state = [], action) => {
  const changeQuantity = changeQuantityFactory(action.dbKey, clone(state))
  return (
    action.type === 'ADD_PRODUCT' ? changeQuantity(inc)
      : action.type === 'REMOVE_PRODUCT' ? changeQuantity(dec)
        : action.type === 'NEW_ORDER_SUCCESS' ? []
          : action.type === 'USER_LOGGED_OUT' ? []
            : []
  )
}

export default cart
