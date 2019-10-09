import React from 'react'
import { NavLink } from 'react-router-dom'

import style from '../style/landingPage.scss'
import logo from '../images/logo-and-name.png'
import background from '../images/background.jpg'

const LandingPage = () => (
  <div className={style.root}>
    <div className={style.top}>
      <div className={style.topLeft}>
        <img className={style.logo} src={logo} />
      </div>
      <div className={style.topRight}>
        <NavLink to='/v1' className={style.link}><h1 className={style.CTO}>order now!</h1></NavLink>
      </div>
    </div>
    <div className={style.centralWide}>
      <img className={style.background} src={background} />
    </div>
    <div className={style.centralSmall}>
      text 1
    </div>
    <div className={style.bottomWide}>
      <div className={style.bottomLeft}>
        text 2
      </div>
      <div className={style.bottomCenter}>
        text 3
      </div>
      <div className={style.bottomRight}>
        text 4
      </div>
    </div>
  </div>
)

export default LandingPage
