import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { clone } from 'ramda'
import { isLoaded, isEmpty } from 'react-redux-firebase'

import ProductsList from '../components/ProductsList'
import CheckoutForm from '../components/CheckoutForm'

import { submitOrder } from '../services/checkout'
import { updateShippingDetails } from '../services/user'

import { newOrderSuccess, newOrderFail, shippingDetailsUpdateSuccess, shippingDetailsUpdateFail } from '../actions'
import { mapStateToProps as mapProducts } from './VisibleProductsList'

import style from '../style/checkoutView.scss'

const blankShipping = {
  fullName: '',
  streetName: '',
  buildingN: '',
  zipCode: '',
  extras: '',
  phone: ''
}

const mapStateToProps = (state, ownProps) => {
  const { products, cartTotal, visibilityFilter } = mapProducts(state, ownProps)

  let shipping = isLoaded(state.firebase.profile) && !isEmpty(state.firebase.profile) ? clone(state.firebase.profile.shipping) : blankShipping
  shipping.comments = ''

  const order = {
    products: products.map(product => {
      return {
        name: product.name,
        price: product.price,
        quantity: product.quantity
      }
    }),
    total: cartTotal
  }

  return {
    productsList: {
      products,
      cartTotal,
      visibilityFilter
    },
    checkoutForm: {
      order,
      shipping,
      uid: isLoaded(state.firebase.auth) && !isEmpty(state.firebase.auth) ? state.firebase.auth.uid : null,
      isLoggedIn: state.firebase.auth.isLoaded && !state.firebase.auth.isEmpty
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmitOrder: data => {
      submitOrder(data)
        .then(({ dbKey }) => dispatch(newOrderSuccess(dbKey)))
        .catch(error => dispatch(newOrderFail(error)))
    },
    onUpdateShippingDetails: data => {
      updateShippingDetails(data)
        .then(() => dispatch(shippingDetailsUpdateSuccess()))
        .catch(error => dispatch(shippingDetailsUpdateFail(error)))
    }
  }
}

const CheckoutView = props => {
  if (Object.keys(props.productsList.products).length > 0) {
    return (
      <div className={style.root}>
        <ProductsList {...props.productsList} {...props} />
        <CheckoutForm {...props.checkoutForm} {...props} />
      </div>
    )
  } else {
    return (<Redirect to={{ pathname: '/v1/' }} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutView)
