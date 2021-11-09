import React, { useContext } from 'react'
import './Login.css'
import LoginForm from './LoginForm'
import CloserLink from '../../utilities/CloserLink'
import { GlobalContext } from '../../tools/CreateContext'

const Login = () => {
  const { loginDisplay } = useContext(GlobalContext)
  /*
   * jsx
   */
  return (
    <div className={loginDisplay ? 'login login-popup' : 'login'}>
      <h3 className="login__header">
        Log in
        <i className="fas fa-sign-in-alt login__header-icon"></i>
      </h3>
      <LoginForm />
      <CloserLink />
    </div>
  )
}

export default Login
