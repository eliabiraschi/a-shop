import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import Button from './ui/Button'
import Icon from './ui/Icon'
import Product from './Product'
import style from '../style/productsList.scss'

const ProductsList = ({ products, onAddOne, onRemoveOne, visibilityFilter, cartTotal }) => {
  if (Object.keys(products).length > 0) {
    return (
      <div className={style.root}>
        {
          (visibilityFilter === 'SHOW_CART' || visibilityFilter === 'SHOW_CHECKOUT') && (
            <div id='cart-total'>
              <h1>Total: {cartTotal.value} <small>{cartTotal.currency}</small></h1>
            </div>
          )
        }
        <div className={style.productsContainer}>
          {products.map(product => (
            <Product key={product.dbKey} visibilityFilter={visibilityFilter} {...product} onAddOne={onAddOne} onRemoveOne={onRemoveOne} />
          ))}
        </div>
        {
          visibilityFilter !== 'SHOW_CHECKOUT' && (
            <div className={style.checkoutButtonContainer}>
              <NavLink to='/v1/checkout' className={style.checkoutLink}>
                <Button className={style.checkoutButton}>
                  <Icon name='payment' size='2.3em' />
                  <span>Checkout</span>
                </Button>
              </NavLink>
            </div>
          )
        }
      </div>
    )
  } else {
    return (
      <div className={style.root2}>
        {
          visibilityFilter === 'SHOW_CART' && (
            <span className={style.cartEmpty}>
              <i className={`${style.bigIcon} material-icons`}>remove_shopping_cart</i>
            </span>
          )
        }
        {
          visibilityFilter === 'SHOW_ALL' && (
            <span className={style.productsListEmpty}>
              <i className={`${style.bigIcon} material-icons`}>cached</i>
            </span>
          )
        }
      </div>
    )
  }
}
ProductsList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      dbKey: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imageSrc: PropTypes.string.isRequired,
      price: PropTypes.shape({
        value: PropTypes.number,
        currency: PropTypes.string
      }),
      category: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      quantity: PropTypes.number
    }).isRequired
  ),
  onAddOne: PropTypes.func,
  onRemoveOne: PropTypes.func
}

export default ProductsList
