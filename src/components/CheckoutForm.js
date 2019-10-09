/* global alert */

import React from 'react'
import PropTypes from 'prop-types'

import TextInput from './ui/TextInput'
import Button from './ui/Button'

import style from '../style/checkoutForm.scss'

class CheckoutForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = props.shipping

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUpdateShippingDetails = this.handleUpdateShippingDetails.bind(this)
  }

  handleChange (event) {
    this.setState({[event.target.id]: event.target.value})
  }

  handleSubmit (event) {
    event.preventDefault()
    const orderData = {
      ...this.props.order,
      shipping: this.state,
      uid: this.props.uid
    }
    this.props.onSubmitOrder({ orderData })
  }

  handleUpdateShippingDetails (event) {
    this.props.onUpdateShippingDetails({ shippingDetails: this.state })
  }

  render () {
    return (
      <div className={style.root}>
        <div className={style.shippingDetails}>
          <h2>Shipping Details</h2>
          <div className={style.inputsList}>
            <TextInput
              label='Full name:'
              type='text'
              id='fullName'
              value={this.state.fullName}
              onChange={this.handleChange}
            />
            <TextInput
              label='Street name:'
              type='text'
              id='streetName'
              value={this.state.streetName}
              onChange={this.handleChange}
            />
            <TextInput
              label='Building n:'
              type='text'
              id='buildingN'
              value={this.state.buildingN}
              onChange={this.handleChange}
            />
            <TextInput
              label='ZIP code:'
              type='text'
              id='zipCode'
              value={this.state.zipCode}
              onChange={this.handleChange}
            />
            <TextInput
              label='Extras:'
              type='text'
              id='extras'
              value={this.state.extras}
              onChange={this.handleChange}
            />
            <TextInput
              label='Phone:'
              type='text'
              id='phone'
              value={this.state.phone}
              onChange={this.handleChange}
            />
            <TextInput
              label='Comments:'
              type='text'
              id='comments'
              value={this.state.comments}
              onChange={this.handleChange}
            />
          </div>
          <div className={style.buttons}>
            <Button className={style.submitButton} onClick={this.handleSubmit}>Submit order</Button>
            {
              this.props.isLoggedIn && <Button className={style.saveDetailsButton} onClick={this.handleUpdateShippingDetails}>Save shipping details</Button>
            }
          </div>
        </div>
      </div>
    )
  }
}

CheckoutForm.propTypes = {
  shipping: PropTypes.object,
  order: PropTypes.object,
  onSubmitOrder: PropTypes.func,
  onUpdateShippingDetails: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  uid: PropTypes.string
}

export default CheckoutForm
