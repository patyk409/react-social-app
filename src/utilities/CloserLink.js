import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import '../styles/utilities/CloserLink.scss'

import { GlobalContext } from '../context/CreateContext'

const CloserLink = () => {
  // GLOBAL CONTEXT
  const { loginDisplay, setLoginDisplay } = useContext(GlobalContext)

  // LOGIN POPUP CLOSER - FUNCTION
  const loginDisplayCloser = () => {
    if (loginDisplay) {
      setLoginDisplay(false)
    }
  }

  //JSX
  return (
    <>
      <Link
        className="closer-link"
        to="/react-social-app/"
        onClick={loginDisplayCloser}
      >
        <i className="fas fa-times"></i>
      </Link>
    </>
  )
}

export default CloserLink
