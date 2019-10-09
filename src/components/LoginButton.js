import React from 'react'
import PropTypes from 'prop-types'

import Icon from './ui/Icon'
import style from '../style/loginButton.scss'

const LoginButton = ({ isLoggedIn, loginFn, logoutFn, className, displayName, ...ownProps }) => (
  <a
    href='#'
    onClick={isLoggedIn ? logoutFn : loginFn}
    className={`${className} ${style.root}`}
    {...ownProps}
  >
    <span
      className={style.label}
    >
      {isLoggedIn ? displayName : 'Login with'}
    </span>
    <Icon
      size='1.4em'
      name={isLoggedIn ? 'logout' : 'facebook'}
    />
  </a>
)

LoginButton.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  loginFn: PropTypes.func.isRequired,
  logoutFn: PropTypes.func.isRequired,
  className: PropTypes.string,
  displayName: PropTypes.string
}

export default LoginButton
