import React from 'react'
import { Link } from 'react-router-dom'

import menu from '../../assets/menu.svg'

import './index.css'

export function Header() {
  return (
    <header>
      <div className='header'>
        <label htmlFor='menu' className='menu-icon'>
          <img src={menu} alt='menu' className='menu-icon' />
        </label>
        <input type='checkbox' id='menu' />
        <h1>Donations Tracker</h1>
        <ul>
          <li>
            <Link className='link' to='/'>
              Link 1
            </Link>
          </li>
          <li>
            <Link className='link' to='/'>
              Link 2
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
