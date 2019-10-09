import React from 'react'
import PropTypes from 'prop-types'

import Button from './ui/Button'
import Icon from './ui/Icon'
import style from '../style/product.scss'

const Product = ({ dbKey, name, description, imageSrc, price, category, tags, quantity, onAddOne, onRemoveOne, visibilityFilter }) => (
  <div className={style.root}>
    <h2 className={style.productName}>{name} {/*
      visibilityFilter === 'SHOW_ALL' && (
        <small className='product-category'>{category}</small>
      )  */}
    </h2>
    <p className={style.productPrice}>{price.value}{price.currency}</p>
    {
      visibilityFilter !== 'SHOW_ALL' && (
        <p className='product-sub-total'>subTotal: {price.subTotal}{price.currency}</p>
      )
    }
    {
      visibilityFilter === 'SHOW_ALL' && (
        <div className={style.productImage}>
          <img alt={description} src={imageSrc} />
        </div>
      )
    }
    {
      visibilityFilter === 'SHOW_ALL' && (
        <p className={style.productDescription}>{description}</p>
      )
    }
    {/* <div className='product-tags-container'>
      {tags.map((tag, i) => (<label key={i} className='product-tag'>{tag} </label>))}
    </div> */}
    <div>
      <div className={style.productQuantity}>
        <label>Quantity: </label>{quantity || 0}
      </div>
      {
        visibilityFilter !== 'SHOW_CHECKOUT' && (
          <div className={style.buttonsContainer}>
            <Button onClick={() => onAddOne(dbKey)} className={style.productButton}>
              <Icon name='add' size='2em' />
            </Button>
            <Button onClick={() => onRemoveOne(dbKey)} className={style.productButton}>
              <Icon name='remove' size='2em' />
            </Button>
          </div>
        )
      }
    </div>
  </div>
)

Product.propTypes = {
  dbKey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  imageSrc: PropTypes.string,
  price: PropTypes.shape({
    value: PropTypes.number,
    currency: PropTypes.string
  }),
  category: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  quantity: PropTypes.number,
  onAddOne: PropTypes.func,
  onRemoveOne: PropTypes.func,
  visibilityFilter: PropTypes.string
}

export default Product
