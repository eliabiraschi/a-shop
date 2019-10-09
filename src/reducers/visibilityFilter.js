const visibilityFilter = (state = 'SHOW_ALL', action) => {
  return (
    action.type === 'SET_VISIBILITY_FILTER' ? action.filter
      : action.type === 'NEW_ORDER_SUCCESS' ? 'SHOW_ALL'
        : state
  )
}

export default visibilityFilter
