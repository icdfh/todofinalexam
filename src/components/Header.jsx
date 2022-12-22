import React from 'react'
import './Header.css'
import dark from '../images/icon-moon.svg'
import light from '../images/icon-sun.svg'

function Header({handleTheme,theme}) {
  return (
    <div className='Header'>
        <h1>TODO</h1>
        {theme ? 
        <button onClick={handleTheme}>
            <img src={light} alt='sun'></img></button>
        :
        <button onClick={handleTheme}>
            <img src={dark} alt='moon'></img></button>
        }
    </div>
  )
}

export default Header