import React, { useState, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import './LoginForm.css'

import { GlobalContext } from '../../tools/CreateContext'

const LoginForm = (props) => {
  // LOCAL STATE
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [nameWarning, setNameWarning] = useState('')
  const [passwordWarning, setPasswordWarning] = useState('')
  const [redirection, setRedirection] = useState(false)

  // GLOBAL CONTEXT
  const {
    setIsLogged,
    headerConfig,
    setDownbarContent,
    setDownbarDisplay,
    setLoginDisplay,
  } = useContext(GlobalContext)

  // LOGIN FORM - VALIDATION
  const formValidation = (event) => {
    let nameValidation = new RegExp('^(?=.{4,})')
    let passwordValidation = new RegExp('^(?=.*[0-9])(?=.{4,})')

    if (!nameValidation.test(name)) {
      event.preventDefault()
      setNameWarning(
        `There is no user with that name, please sign up or check the username again`,
      )
    } else {
      setNameWarning('')
    }
    if (!passwordValidation.test(password)) {
      event.preventDefault()
      setPasswordWarning(`Invalid password, check it again`)
    } else {
      setPasswordWarning('')
    }
  }

  // LOGIN - FUNCTION
  const logUserDataIn = (event) => {
    event.preventDefault()
    let userData = {
      username: name,
      password: password,
      ttl: 3600,
    }

    axios
      .post(
        'https://akademia108.pl/api/social-app/user/login',
        JSON.stringify(userData),
        headerConfig,
      )
      .then((res) => {
        localStorage.setItem('name', res.data.username)
        localStorage.setItem('jwt_token', res.data.jwt_token)
        setIsLogged(res.data.jwt_token)
        setDownbarDisplay(true)
        setDownbarContent('Logged in')
      })
      .catch((err) => {
        console.error(err)
      })
    setLoginDisplay(false)
    setRedirection(true)
  }

  // REDIRECT TO MAIN PAGE AFTER LOGIN
  if (redirection) {
    return <Redirect to="/" />
  }

  // JSX
  return (
    <form className="login-form" onSubmit={logUserDataIn}>
      <label className="login-form__label" htmlFor="Name">
        Name:
      </label>
      <input
        id="Name"
        type="text"
        placeholder="Username"
        autoComplete="new-password"
        onChange={(event) => setName(event.target.value)}
        className={
          nameWarning
            ? 'login-form__text-input warning'
            : 'login-form__text-input'
        }
      />

      <label className="login-form__label" htmlFor="Password">
        Password:
      </label>
      <input
        id="Password"
        type="password"
        placeholder="Password"
        onChange={(event) => setPassword(event.target.value)}
        className={
          passwordWarning
            ? 'login-form__text-input warning'
            : 'login-form__text-input'
        }
      />

      <input
        type="submit"
        value="Log in"
        onClick={formValidation}
        className="login-form__submit-input"
      />

      <ul className="login-form__warning-list">
        <li className="warning-list__warning-item">
          {!(nameWarning || passwordWarning)
            ? "Don't have an account yet? Create it now and enjoy..."
            : null}
        </li>
        <li className="warning-list__warning-item">{nameWarning}</li>
        <li className="warning-list__warning-item">{passwordWarning}</li>
      </ul>

      {/* SIGNUP LINK */}
      <Link
        className="login-form__redirection-link"
        to="/signup"
        onClick={() => setLoginDisplay(false)}
      >
        Sign up
      </Link>
    </form>
  )
}

export default LoginForm
