import React from 'react'
import { Link } from 'react-router-dom'

import menu from '../../assets/menu.svg'
import logo from '../../assets/logoName.png'

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
              Home
            </Link>
          </li>
          <li>
            <Link className='link' to='/donations'>
              Minhas Doações
            </Link>
          </li>
          <li>
            <Link className='link' to='/'>
              Link 3
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}
