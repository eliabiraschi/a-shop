export const addProduct = dbKey => {
  return {
    type: 'ADD_PRODUCT',
    dbKey
  }
}

export const removeProduct = dbKey => {
  return {
    type: 'REMOVE_PRODUCT',
    dbKey
  }
}

export const setVisibilityFilter = filter => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

export const newOrderSuccess = dbKey => {
  return {
    type: 'NEW_ORDER_SUCCESS',
    dbKey
  }
}

export const newOrderFail = error => {
  return {
    type: 'NEW_ORDER_FAIL',
    error
  }
}

export const shippingDetailsUpdateFail = error => {
  return {
    type: 'SHIPPING_DETAILS_UPDATE_FAIL',
    error
  }
}

export const shippingDetailsUpdateSuccess = error => {
  return {
    type: 'SHIPPING_DETAILS_UPDATE_SUCCESS',
    error
  }
}

export const authFail = error => {
  return {
    type: 'AUTH_FAIL',
    error
  }
}

export const userLoggedIn = () => {
  return {
    type: 'USER_LOGGED_IN'
  }
}

export const userLoggedOut = () => {
  return {
    type: 'USER_LOGGED_OUT'
  }
}
