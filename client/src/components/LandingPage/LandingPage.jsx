import React from 'react'
import { NavLink } from 'react-router-dom'
import './LandingPage.css'

export default function landingPage() {
  return (
    <div className="landing">
      <div className='title'>
        <h1>Welcome to the Countries App</h1>
        </div>
        <div className='linkTo'>
        <NavLink to="/countries">
            <button>Get Started</button>
        </NavLink>
        </div>
        </div>
  )
}
