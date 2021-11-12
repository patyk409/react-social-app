import React from 'react'
import '../../styles/components/signup/Signup.scss'

// COMPONENTS
import SignupForm from './SignupForm'
import CloserLink from '../../utilities/CloserLink'

const Signup = () => {
  return (
    <div className="signup">
      <h3 className="signup-header">
        Sign up
        <i className="fas fa-user-plus signup-header-icon"></i>
      </h3>
      {/* SIGNUP FORM */}
      <SignupForm />

      {/* CLOSER LINK */}
      <CloserLink />
    </div>
  )
}

export default Signup
