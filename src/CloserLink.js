import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalContext } from './CreateContext'
import './CloserLink.css'

const CloserLink = () => {
  // GLOBAL CONTEXT
  const { loginPopup, setLoginPopup } = useContext(GlobalContext)

  // LOGIN POPUP CLOSER - METHOD
  const loginPopupCloser = () => {
    if (loginPopup) {
      setLoginPopup(false)
    }
  }

  //JSX
  return (
    <div className="closer-box">
      <Link
        className="closer-box__closer-link"
        to="/"
        onClick={loginPopupCloser}
      >
        <i className="fas fa-times closer-box__closer"></i>
      </Link>
    </div>
  )
}

export default CloserLink
