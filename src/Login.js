import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import './Login.css'
import axios from 'axios'

const Login = (props) => {
  /*
   * useState
   */
  const [loginName, setLoginName] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginNameWarning, setLoginNameWarning] = useState('')
  const [loginPasswordWarning, setLoginPasswordWarning] = useState('')
  const [redirectToMain, setRedirectToMain] = useState(false)

  /*
   * log in
   */
  const logUserDataIn = (event) => {
    event.preventDefault()
    let userData = {
      username: loginName,
      password: loginPassword,
      ttl: 3600,
    }

    axios
      .post(
        'https://akademia108.pl/api/social-app/user/login',
        JSON.stringify(userData),
        props.headerConfig,
      )
      .then((res) => {
        localStorage.setItem('name', res.data.username)
        localStorage.setItem('jwt_token', res.data.jwt_token)
        props.setUserToken(res.data.jwt_token)
        props.setLoginPopup(false)
        // props.setMessageTrigger(true)
        // props.setMessage('Logged in')
        console.log('log in response: ', res)
      })
      .catch((err) => {
        console.error(err)
      })
    setRedirectToMain(true)
  }

  /*
   * log in -> validation
   */
  const formValidation = (event) => {
    let nameValidation = new RegExp('^(?=.{4,})')
    let passwordValidation = new RegExp('^(?=.*[0-9])(?=.{4,})')

    if (!nameValidation.test(loginName)) {
      event.preventDefault()
      setLoginNameWarning(
        `There is no user with that name, please sign up or check the username again`,
      )
    } else {
      setLoginNameWarning('')
    }

    if (!passwordValidation.test(loginPassword)) {
      event.preventDefault()
      setLoginPasswordWarning(`Invalid password, check it again`)
    } else {
      setLoginPasswordWarning('')
    }
  }

  /*
   * redirect to main page
   */
  if (redirectToMain) {
    return <Redirect to="/" />
  }

  /*
   * jsx
   */
  return (
    <div className={props.loginPopup ? 'Login Login-popup' : 'Login'}>
      <h3 className="Login-header">
        Log in
        <i className="fas fa-sign-in-alt Login-headerIcon"></i>
      </h3>

      <form className="Login-form" onSubmit={logUserDataIn}>
        <label className="Login-form-label" htmlFor="Name">
          Name:
        </label>
        <input
          id="Name"
          type="text"
          placeholder="Username"
          autoComplete="new-password"
          onChange={(event) => setLoginName(event.target.value)}
          className={
            loginNameWarning
              ? 'Login-form-textInput Warning'
              : 'Login-form-textInput'
          }
        />

        <label className="Login-form-label" htmlFor="Password">
          Password:
        </label>
        <input
          id="Password"
          type="password"
          placeholder="Password"
          onChange={(event) => setLoginPassword(event.target.value)}
          className={
            loginPasswordWarning
              ? 'Login-form-textInput Warning'
              : 'Login-form-textInput'
          }
        />

        <input
          type="submit"
          value="Log in"
          onClick={formValidation}
          className="Login-form-submitInput"
        />

        <ul className="Login-form-warningList">
          <li className="Login-form-warningItem">
            {!(loginNameWarning || loginPasswordWarning)
              ? "Don't have an account yet? Create it now and enjoy..."
              : null}
          </li>
          <li className="Login-form-warningItem">{loginNameWarning}</li>
          <li className="Login-form-warningItem">{loginPasswordWarning}</li>
        </ul>

        <Link
          className="Login-form-redirectionLink"
          to="/signup"
          onClick={() => props.setLoginPopup(false)}
        >
          Sign up
        </Link>
      </form>

      <div className="Closer">
        <Link
          className="Closer-link"
          to="/"
          onClick={() => props.setLoginPopup(false)}
        >
          <i className="fas fa-times Closer-linkIcon"></i>
        </Link>
      </div>
    </div>
  )
}

export default Login
