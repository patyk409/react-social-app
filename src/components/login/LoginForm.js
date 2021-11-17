import React, { useState, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import '../../styles/components/login/LoginForm.scss'

import { GlobalContext } from '../../context/CreateContext'

const LoginForm = () => {
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
    return <Redirect to="/react-social-app/" />
  }

  // JSX
  return (
    <form className="login-form" onSubmit={logUserDataIn}>
      <label className="form-label" htmlFor="name">
        Name:
      </label>
      <input
        id="name"
        type="text"
        placeholder="Username"
        autoComplete="new-password"
        onChange={(event) => setName(event.target.value)}
        className={nameWarning ? 'form-text-input warning' : 'form-text-input'}
      />

      <label className="form-label" htmlFor="password">
        Password:
      </label>
      <input
        id="password"
        type="password"
        placeholder="Password"
        onChange={(event) => setPassword(event.target.value)}
        className={
          passwordWarning ? 'form-text-input warning' : 'form-text-input'
        }
      />

      <input
        type="submit"
        value="Log in"
        onClick={formValidation}
        className="form-submit-input"
      />

      <ul className="form-warning-list">
        <li className="warning-item">
          {!(nameWarning || passwordWarning) &&
            "Don't have an account yet? Create it now and enjoy..."}
        </li>
        <li className="warning-item">{nameWarning}</li>
        <li className="warning-item">{passwordWarning}</li>
      </ul>

      {/* SIGNUP LINK */}
      <Link
        className="form-redirection-link"
        to="/react-social-app/signup"
        onClick={() => setLoginDisplay(false)}
      >
        Sign up
      </Link>
    </form>
  )
}

export default LoginForm
