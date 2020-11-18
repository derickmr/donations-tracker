import React from 'react'
import { Link } from 'react-router-dom'

import menu from '../../assets/menu.svg'
import logo from '../../assets/logoName.png'
import donation from '../../assets/donation.svg'
import home from '../../assets/home.svg'
import user from '../../assets/user.svg'

import './index.css'

export function Header() {
  return (
    <header>
      <div className='header'>
        <label htmlFor='menu' className='menu-icon'>
          <img src={menu} alt='menu' className='menu-icon' />
        </label>
        <input type='checkbox' id='menu' />
        <img src={logo} alt='donations tracker' className='logo' />
        <ul>
          <li>
            <Link className='link' to='/'>
              <img src={home} alt='home' />
            </Link>
          </li>
          <li>
            <Link className='link' to='/donations'>
              <img src={donation} alt='donation' />
            </Link>
          </li>
          <li>
            <Link className='link' to='/profile'>
              <img src={user} alt='user' />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}
