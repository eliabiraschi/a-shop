/* global localStorage */

import { firebase } from '../config'

const statusGenerator = name => ({ name, timeStamp: Date.now() })
const initNewStatus = () => ([ statusGenerator('new') ])
const getNewDbKey = collection => firebase.database().ref(collection).push().key
const assignOrderToUser = (userId, orderDbKey) => firebase.database().ref(`users/${userId}/orders/${orderDbKey}`).set(true)
const persistOrderInDb = (dbKey, data) => firebase.database().ref(`orders/${dbKey}`).update(data)
const isAnonymous = uid => uid === null
const saveOrderLocally = orderDbKey => {
  const orders = JSON.parse(localStorage.getItem('orders')) || []
  orders.push(orderDbKey)
  localStorage.setItem('orders', JSON.stringify(orders))
  return true
}

export const submitOrder = ({ orderData, ...rest }) => {
  orderData.status = initNewStatus()
  const dbKey = getNewDbKey('orders')
  return Promise.all([
    persistOrderInDb(dbKey, orderData),
    isAnonymous(orderData.uid)
      ? saveOrderLocally(dbKey)
      : assignOrderToUser(orderData.uid, dbKey)
  ])
    .then(response => ({ status: 'success', dbKey, orderData, response, ...rest }))
    .catch(error => Promise.reject(new Error({
      status: 'failed',
      message: 'failed to submit order',
      payload: error
    })))
}
