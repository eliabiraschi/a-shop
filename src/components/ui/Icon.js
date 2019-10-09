import React from 'react'
import PropTypes from 'prop-types'

import style from '../../style/ui/icon.scss'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/fontawesome-free-brands'
import {
  faSignInAlt,
  faSignOutAlt,
  faUserCircle,
  faExclamationTriangle
} from '@fortawesome/fontawesome-free-solid'

const materialCollection = {
  profile: 'account_circle',
  add: 'add_circle',
  remove: 'remove_circle',
  payment: 'payment',
  menu: 'restaurant_menu',
  cart: 'shopping_cart',
  list: 'list'
}

const faCollection = {
  facebook: faFacebook,
  login: faSignInAlt,
  logout: faSignOutAlt,
  user: faUserCircle,
  error: faExclamationTriangle
}

const iconsENUM = [...Object.keys(materialCollection), ...Object.keys(faCollection)]

const isValidIcon = collection => value => Object.keys(collection).includes(value)
const isMaterial = isValidIcon(materialCollection)
const isFontAwesome = isValidIcon(faCollection)

const getMaterialIcon = (value, fontSize) => (<i style={{ fontSize }} className={`${style.root} material-icons`}>{ materialCollection[value] }</i>)
const getFontAwesomeIcon = (value, fontSize) => (<FontAwesomeIcon style={{ fontSize }} className={style.root} icon={faCollection[value]} />)

const Icon = ({ name, size }) =>
  isFontAwesome(name) ? getFontAwesomeIcon(name, size)
    : isMaterial(name) ? getMaterialIcon(name, size)
      : getFontAwesomeIcon('error', size)

Icon.propTypes = {
  name: PropTypes.oneOf(iconsENUM).isRequired,
  size: PropTypes.string
}

Icon.defaultProps = {
  size: '1em'
}

export default Icon
