import React from 'react'
import { Link } from 'react-router-dom'
import './CloserLink.css'

const CloserLink = () => {
  /*
   * jsx
   */
  return (
    <div className="closer-box">
      <Link className="closer-box__closer-link" to="/">
        <i className="fas fa-times closer-box__closer"></i>
      </Link>
    </div>
  )
}

export default CloserLink
