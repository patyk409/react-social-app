import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../tools/CreateContext'
import './CloserLink.css'

const CloserLink = () => {
  // GLOBAL CONTEXT
  const { loginDisplay, setLoginDisplay } = useContext(GlobalContext)

  // LOGIN POPUP CLOSER - METHOD
  const loginDisplayCloser = () => {
    if (loginDisplay) {
      setLoginDisplay(false)
    }
  }

  //JSX
  return (
    <div className="closer-box">
      <Link
        className="closer-box__closer-link"
        to="/"
        onClick={loginDisplayCloser}
      >
        <i className="fas fa-times closer-box__closer"></i>
      </Link>
    </div>
  )
}

export default CloserLink
