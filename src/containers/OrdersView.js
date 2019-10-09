/* global localStorage */

import { connect } from 'react-redux'
import React from 'react'

import Order from '../components/Order'

const mapOrders = (orders = [], uid) =>
  orders
    .reduce((acc, { key, value }) => {
      if ((value || {}).uid === uid) {
        acc.push({
          dbKey: key,
          ...value
        })
      }
      return acc
    }, [])

const mapAnonymousOrders = (orders = [], localList = []) =>
  orders
    .reduce((acc, { key, value }) => {
      if (localList.includes(key)) {
        acc.push({
          dbKey: key,
          ...value
        })
      }
      return acc
    }, [])

const mapStateToProps = (state, ownProps) => {
  return {
    orders: state.firebase.auth.uid
      ? mapOrders(state.firebase.ordered.orders, state.firebase.auth.uid)
      : mapAnonymousOrders(state.firebase.ordered.orders, JSON.parse(localStorage.getItem('orders')) || [])
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const OrdersView = props => {
  const { orders } = props
  if (Object.keys(orders).length > 0) {
    return (
      <div id='orders-list'>
        {orders.map(order => (
          <Order key={order.dbKey} {...order} />
        ))}
      </div>
    )
  } else {
    return (
      <div id='orders-list' className='empty'>
        <span id='orders-list-empty'>you have no orders</span>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersView)
