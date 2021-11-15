import React, { useState, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import '../../styles/components/signup/SignupForm.scss'

import { GlobalContext } from '../../context/CreateContext'

const SignupForm = () => {
  // LOCAL STATE
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [nameWarning, setNameWarning] = useState('')
  const [emailWarning, setEmailWarning] = useState('')
  const [passwordWarning, setPasswordWarning] = useState('')

  const [redirection, setRedirection] = useState(false)

  // GLOBAL CONTEXT
  const { headerConfig, setDownbarContent, setDownbarDisplay } = useContext(
    GlobalContext,
  )

  // SIGNUP - FUNCTION
  const signUserDataUp = (event) => {
    event.preventDefault()
    let userData = {
      username: name,
      email: email,
      password: password,
    }

    axios
      .post(
        'https://akademia108.pl/api/social-app/user/signup',
        JSON.stringify(userData),
        headerConfig,
      )
      .then((res) => {
        localStorage.setItem('name', res.data.user.username)
        setDownbarDisplay(true)
        setDownbarContent('Signed up')
      })
      .catch((err) => {
        console.error(err)
      })
    setRedirection(true)
  }

  // SIGNUP FORM - VALIDATION
  const formValidation = (event) => {
    let nameValidation = new RegExp('^(?=.{4,})')
    let emailValidation = new RegExp('^(?=.{2,})(?=.*[@])')
    let passwordValidation = new RegExp(
      '^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})',
    )

    if (!nameValidation.test(name) || /\s/.test(name)) {
      event.preventDefault()
      setNameWarning(
        'Name field cannot be empty, cannot include white spaces and should have min. 4 chars',
      )
    } else {
      setNameWarning('')
    }
    if (!emailValidation.test(email) || /\s/.test(email)) {
      event.preventDefault()
      setEmailWarning(
        'Email address cannot be empty, cannot include white spaces - should be like: name@domain.com',
      )
    } else {
      setEmailWarning('')
    }
    if (!passwordValidation.test(password) || password !== confirmPassword) {
      event.preventDefault()
      setPasswordWarning(
        'Password field cannot be empty, should have min. 6 chars, at least 1 digit and at least 1 of special chars: ! @ # $ % ^ & *',
      )
    } else {
      setPasswordWarning('')
    }
  }

  // REDIRECT TO LOGIN PAGE AFTER SIGNUP
  if (redirection) {
    return <Redirect to="/login" />
  }

  // JSX
  return (
    <form className="signup-form" onSubmit={signUserDataUp}>
      <label className="form-label" htmlFor="name">
        Name:
      </label>
      <input
        id="name"
        type="text"
        placeholder="Username"
        onChange={(event) => {
          setName(event.target.value)
        }}
        className={
          nameWarning
            ? 'form-text-input warning'
            : 'form-text-input'
        }
      />

      <label className="form-label" htmlFor="email">
        Email:
      </label>
      <input
        id="email"
        type="email"
        placeholder="User e-mail"
        onChange={(event) => {
          setEmail(event.target.value)
        }}
        className={
          emailWarning
            ? 'form-text-input warning'
            : 'form-text-input'
        }
      />

      <label className="form-label" htmlFor="password">
        Password:
      </label>
      <input
        id="password"
        type="password"
        placeholder="Password"
        onChange={(event) => {
          setPassword(event.target.value)
        }}
        className={
          passwordWarning
            ? 'form-text-input warning'
            : 'form-text-input'
        }
      />

      <label className="form-label" htmlFor="confirm">
        Confirm:
      </label>
      <input
        id="confirm"
        type="password"
        placeholder="Confirm password"
        onChange={(event) => {
          setConfirmPassword(event.target.value)
        }}
        className={
          passwordWarning
            ? 'form-text-input warning'
            : 'form-text-input'
        }
      />

      <input
        type="submit"
        value="Sign up"
        onClick={formValidation}
        className="form-submit-input"
      />

      <ul className="form-warning-list">
        <li className="warning-item">
          {!(nameWarning || emailWarning || passwordWarning)
            ? 'Already registered? Log in now and enjoy...'
            : null}
        </li>
        <li className="warning-item">{nameWarning}</li>
        <li className="warning-item">{emailWarning}</li>
        <li className="warning-item">{passwordWarning}</li>
      </ul>

      {/* LOGIN LINK */}
      <Link className="form-redirection-link" to="/login">
        Log in
      </Link>
    </form>
  )
}

export default SignupForm
