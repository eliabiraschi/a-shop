import { dissoc } from 'ramda'
import { firebase } from '../config'

const loginProviders = {
  'facebook': new firebase.auth.FacebookAuthProvider(),
  'twitter': new firebase.auth.TwitterAuthProvider(),
  'google': new firebase.auth.GoogleAuthProvider(),
  'github': new firebase.auth.GithubAuthProvider()
}

const isValidProvider = provider => Object.keys(loginProviders).includes(provider)
const hasUserId = shippingDetails => Boolean(shippingDetails.id)
const sanitizeShippingDetails = shippingDetails => (shippingDetails.comments ? dissoc('comments', shippingDetails) : shippingDetails)
const updateData = (userId, shippingDetails) => firebase.database().ref(`users/${userId}/shipping`).update(shippingDetails)

export const updateShippingDetails = ({ shippingDetails, ...rest }) => new Promise((resolve, reject) =>
  hasUserId(shippingDetails.id)
    ? updateData(shippingDetails.uid, sanitizeShippingDetails(shippingDetails))
      .then(response => resolve({ status: 'success', shippingDetails, response, ...rest }))
    : reject(new Error({ status: 'failed', message: 'missing user id' }))
)

export const loginUser = provider =>
  isValidProvider(provider)
    ? firebase.auth().signInWithPopup(loginProviders[provider])
    : Promise.reject(new Error({ status: 'failed', message: `Invalid provider: ${provider}` }))

export const logoutUser = () => firebase.auth().signOut()
