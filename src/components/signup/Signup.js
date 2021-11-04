import React from 'react'
import './Signup.css'
import SignupForm from './SignupForm'
import CloserLink from '../../CloserLink'

const Signup = () => {
  return (
    <div className="signup">
      <h3 className="signup__header">
        Sign up
        <i className="fas fa-user-plus signup__header-icon"></i>
      </h3>
      <SignupForm />
      <CloserLink />
    </div>
  )
}

export default Signup
