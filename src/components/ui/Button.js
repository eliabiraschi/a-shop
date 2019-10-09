import React from 'react'
import PropTypes from 'prop-types'

import style from '../../style/ui/button.scss'

const Button = ({ className, children, ...restOfProps }) => {
  const combinedClassNames = [className, style.root].join(' ')
  return (
    <button className={combinedClassNames} {...restOfProps}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

Button.defaultProps = {
  children: undefined,
  className: ''
}

export default Button
