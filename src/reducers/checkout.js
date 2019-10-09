/* global alert */

const inform = message => {
  alert(message)
  return []
}

const checkout = (state = [], action) => {
  return (
    action.type === 'NEW_ORDER_SUCCESS' ? inform('Order created successfully')
      : action.type === 'NEW_ORDER_FAIL' ? inform('Failed to submit the order :(')
        : []
  )
}

export default checkout
