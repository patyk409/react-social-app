import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Signup.css";
import axios from "axios";

const Signup = props => {
  /*
   * useState
   */
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [signupNameWarning, setSignupNameWarning] = useState("");
  const [signupEmailWarning, setSignupEmailWarning] = useState("");
  const [signupPasswordWarning, setSignupPasswordWarning] = useState("");
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  /*
   *
   * sign up -> validation
   *
   */
  const formValidation = event => {
    let nameValidation = new RegExp("^(?=.{4,})");
    let emailValidation = new RegExp("^(?=.{2,})(?=.*[@])");
    let passwordValidation = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})");

    if (!(nameValidation.test(signupName)) || /\s/.test(signupName)) {
      event.preventDefault();
      setSignupNameWarning("Name field cannot be empty, cannot include white spaces and should have min. 4 chars");
    }
    else {
      setSignupNameWarning("");
    };

    if (!(emailValidation.test(signupEmail)) || /\s/.test(signupEmail)) {
      event.preventDefault();
      setSignupEmailWarning("Email address cannot be empty, cannot include white spaces - should be like: name@domain.com");
    }
    else {
      setSignupEmailWarning("");
    };

    if (!(passwordValidation.test(signupPassword)) || signupPassword !== signupConfirm) {
      event.preventDefault();
      setSignupPasswordWarning("Password field cannot be empty, should have min. 6 chars, at least 1 digit and at least 1 of special chars: ! @ # $ % ^ & *");
    }
    else {
      setSignupPasswordWarning("");
    };
  };

  /*
   *
   * sign up
   * 
   */
  const signUserDataUp = event => {
    event.preventDefault();
    let userData = {
      username: signupName,
      email: signupEmail,
      password: signupPassword
    };

    axios.post(
      "https://akademia108.pl/api/social-app/user/signup",
      JSON.stringify(userData),
      props.headerConfig)
      .then(res => {
        localStorage.setItem("name", res.data.user.username);
        console.log("sign up response: ", res);
      })
      .catch(err => {
        console.error(err);
      });
    setRedirectToLogin(true);
  };

  /*
   *
   * redirect to login page
   *
   */
  if (redirectToLogin) {
    return <Redirect to="/login" />;
  };

  /*
   * jsx
   */
  return (
    <div className="Signup">

      <h3>Sign up
        <i className="fas fa-user-plus"></i>
      </h3>

      <form onSubmit={signUserDataUp}>
        <label htmlFor="Name">Name:</label>
        <input
          id="Name"
          type="text"
          placeholder="Username"
          onChange={event => { setSignupName(event.target.value) }}
          className={(signupNameWarning) ? "Warning" : null} />

        <label htmlFor="Email">Email:</label>
        <input
          id="Email"
          type="email"
          placeholder="User e-mail"
          onChange={event => { setSignupEmail(event.target.value) }}
          className={(signupEmailWarning) ? "Warning" : null} />

        <label htmlFor="Password">Password:</label>
        <input
          id="Password"
          type="password"
          placeholder="Password"
          onChange={event => { setSignupPassword(event.target.value) }}
          className={(signupPasswordWarning) ? "Warning" : null} />

        <label htmlFor="Confirm">Confirm:</label>
        <input
          id="Confirm"
          type="password"
          placeholder="Confirm password"
          onChange={event => { setSignupConfirm(event.target.value) }}
          className={(signupPasswordWarning) ? "Warning" : null} />

        <input
          type="submit"
          value="Sign up"
          onClick={formValidation} />

        <ul>
          <li>{!(signupNameWarning || signupEmailWarning || signupPasswordWarning) ?
              "Already registered? Log in now and enjoy..." : null}</li>
          <li>{signupNameWarning}</li>
          <li>{signupEmailWarning}</li>
          <li>{signupPasswordWarning}</li>
        </ul>

        <Link
          to="/login">
          Log in
        </Link>
      </form>

      <div className="Closer">
        <Link
          to="/">
          <i className="fas fa-times"></i>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
