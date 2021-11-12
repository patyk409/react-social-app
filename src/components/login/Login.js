import React, { useContext } from 'react'
import '../../styles/components/login/Login.scss'

// COMPONENTS
import LoginForm from './LoginForm'

import CloserLink from '../../utilities/CloserLink'
import { GlobalContext } from '../../tools/CreateContext'

const Login = () => {
  // GLOBAL CONTEXT
  const { loginDisplay } = useContext(GlobalContext)

  // JSX
  return (
    <div className={loginDisplay ? 'login login-popup' : 'login'}>
      <h3 className="login-header">
        Log in
        <i className="fas fa-sign-in-alt login-header-icon"></i>
      </h3>
      {/* LOGIN FORM */}
      <LoginForm />

      {/* CLOSER LINK */}
      <CloserLink />
    </div>
  )
}

export default Login
