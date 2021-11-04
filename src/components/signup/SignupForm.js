import React, { useState, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import './SignupForm.css'
import { GlobalContext } from '../../CreateContext'

const SignupForm = () => {
  // states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nameWarning, setNameWarning] = useState('')
  const [emailWarning, setEmailWarning] = useState('')
  const [passwordWarning, setPasswordWarning] = useState('')
  const [redirection, setRedirection] = useState(false)
  // context
  const { headerConfig, setDownbarContent, setDownbarDisplay } = useContext(
    GlobalContext,
  )
  // sign up function
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
        console.log('sign up response: ', res)
      })
      .catch((err) => {
        console.error(err)
      })
    setRedirection(true)
  }

  /*
   * sign up -> validation
   */
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

  /*
   * redirect to login page
   */
  if (redirection) {
    return <Redirect to="/login" />
  }

  return (
    <form className="signup-form" onSubmit={signUserDataUp}>
      <label className="signup-form__label" htmlFor="name">
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
            ? 'signup-form__text-input warning'
            : 'signup-form__text-input'
        }
      />

      <label className="signup-form__label" htmlFor="email">
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
            ? 'signup-form__text-input warning'
            : 'signup-form__text-input'
        }
      />

      <label className="signup-form__label" htmlFor="password">
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
            ? 'signup-form__text-input warning'
            : 'signup-form__text-input'
        }
      />

      <label className="signup-form__label" htmlFor="confirm">
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
            ? 'signup-form__text-input warning'
            : 'signup-form__text-input'
        }
      />

      <input
        type="submit"
        value="Sign up"
        onClick={formValidation}
        className="signup-form__submit-input"
      />

      <ul className="signup-form__warning-list">
        <li className="warning-list__warning-item">
          {!(nameWarning || emailWarning || passwordWarning)
            ? 'Already registered? Log in now and enjoy...'
            : null}
        </li>
        <li className="warning-list__warning-item">{nameWarning}</li>
        <li className="warning-list__warning-item">{emailWarning}</li>
        <li className="warning-list__warning-item">{passwordWarning}</li>
      </ul>

      <Link className="signup-form__redirection-link" to="/login">
        Log in
      </Link>
    </form>
  )
}

export default SignupForm
