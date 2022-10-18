import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
        <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            Home
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            Contact
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            Login
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            Dashboard
          </NavLink>
    </nav>
  )
}

export default Navbar