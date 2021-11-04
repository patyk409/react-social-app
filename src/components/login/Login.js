import React from 'react'
import './Login.css'
import LoginForm from './LoginForm'
import CloserLink from '../../CloserLink'

const Login = (props) => {
  /*
   * jsx
   */
  return (
    <div className={props.loginPopup ? 'login login-popup' : 'login'}>
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
