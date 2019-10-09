import React from 'react'
import { NavLink } from 'react-router-dom'

import UserAccessToggle from './UserAccessToggle'
import Icon from '../components/ui/Icon'
import style from '../style/toolBar.scss'

const ToolBar = () => {
  return (
    <div className={style.root}>
      <span className={style.brand}>a-shop</span>
      <NavLink to='/v1/' className={style.link}>
        <Icon name='menu' size='1.5em' /><span className={style.label}>Menu</span>
      </NavLink>
      <NavLink to='/v1/f/cart' className={style.link}>
        <Icon name='cart' size='1.5em' /><span className={style.label}>Cart</span>
      </NavLink>
      <NavLink to='/v1/orders' className={style.link}>
        <Icon name='list' size='2em' /><span className={style.label}>Orders</span>
      </NavLink>
      <UserAccessToggle className={style.link} />
      {/* <NavLink to='/v1/profile' className={style.link}>
        <Icon name='user' size='1.5em' /><span className={style.label}>Profile</span>
      </NavLink> */}
    </div>
  )
}

export default ToolBar
