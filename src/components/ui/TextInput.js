import React from 'react'
import PropTypes from 'prop-types'

import style from '../../style/ui/textInput.scss'

const TextInput = ({ label, type, value, placeholder, className, onChange, ...restOfTheProps }) => (
  <div className={style.root}>
    <label className={style.label}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${className} ${style.textInput}`}
      {...restOfTheProps}
    />
  </div>
)

TextInput.propTypes = {
  type: PropTypes.oneOf(['text', 'password', 'email']),
  value: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func
}

TextInput.defaultProps = {
  type: 'text',
  value: '',
  label: '',
  placeholder: '',
  className: '',
  onChange () {}
}

export default TextInput
