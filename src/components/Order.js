import React from 'react'
import PropTypes from 'prop-types'

const convertDate = unixTimeStamp => {
  const date = new Date(unixTimeStamp)
  return date.toDateString()
}

const Order = ({ products, status, dbKey }) => (
  <div className='single-order'>
    <ul> {products.map((product, i) => <li key={i}>{product.name}</li>)} </ul>
    <div>
      <span>Status: {status[0].name}</span><br />
      <span>Last update: {convertDate(status[0].timeStamp)}</span>
    </div>
  </div>
)

Order.propTypes = {
  products: PropTypes.array,
  status: PropTypes.array,
  dbKey: PropTypes.string
}

export default Order
