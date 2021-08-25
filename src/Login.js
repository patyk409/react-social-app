import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const Login = props => {
  /*
   * useState
   */
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginNameWarning, setLoginNameWarning] = useState("");
  const [loginPasswordWarning, setLoginPasswordWarning] = useState("");
  const [redirectToMain, setRedirectToMain] = useState(false);

  /*
   *
   * log in -> validation
   *
   */
  const formValidation = event => {
    let nameValidation = new RegExp("^(?=.{4,})");
    let passwordValidation = new RegExp("^(?=.*[0-9])(?=.{4,})");

    if (!(nameValidation.test(loginName))) {
      event.preventDefault();
      setLoginNameWarning(`There is no user with that name, please sign up or check the username again`);
    }
    else {
      setLoginNameWarning("");
    };

    if (!(passwordValidation.test(loginPassword))) {
      event.preventDefault();
      setLoginPasswordWarning(`Invalid password, check it again`);
    }
    else {
      setLoginPasswordWarning("");
    };
  };

  /*
   *
   * log in
   *
   */
  const logUserDataIn = event => {
    event.preventDefault();
    let userData = {
      username: loginName,
      password: loginPassword,
      ttl: 3600
    };

    axios.post(
      "https://akademia108.pl/api/social-app/user/login",
      JSON.stringify(userData),
      props.headerConfig)
      .then(res => {
        localStorage.setItem("name", res.data.username);
        localStorage.setItem("jwt_token", res.data.jwt_token);
        props.setUserToken(res.data.jwt_token);
        props.setLoginPopup(false);
        console.log("log in response: ", res);
      })
      .catch(err => {
        console.error(err);
      });
    setRedirectToMain(true);
  };

  /*
   *
   * redirect to main page
   *
   */
  if (redirectToMain) {
    return <Redirect to="/" />;
  };

  /*
   * jsx
   */
  return (
    <div className={(props.loginPopup) ? "Login Login-popup" : "Login"}>

      <h3>Log in
        <i className="fas fa-sign-in-alt"></i>
      </h3>

      <form onSubmit={logUserDataIn}>
        <label htmlFor="Name">Name:</label>
        <input
          id="Name"
          type="text"
          placeholder="Username"
          autoComplete="new-password"
          onChange={event => setLoginName(event.target.value)}
          className={(loginNameWarning) ? "Warning" : null} />

        <label htmlFor="Password">Password:</label>
        <input
          id="Password"
          type="password"
          placeholder="Password"
          onChange={event => setLoginPassword(event.target.value)}
          className={(loginPasswordWarning) ? "Warning" : null} />

        <input
          type="submit"
          value="Log in"
          onClick={formValidation} />

        <ul>
          <li>{!(loginNameWarning || loginPasswordWarning) ?
            "Don't have an account yet? Create it now and enjoy..." : null}</li>
          <li>{loginNameWarning}</li>
          <li>{loginPasswordWarning}</li>
        </ul>

        <Link
          to="/signup"
          onClick={() => props.setLoginPopup(false)}>
          Sign up
        </Link>
      </form>

      <div className="Closer">
        <Link
          to="/"
          onClick={() => props.setLoginPopup(false)}>
          <i className="fas fa-times"></i>
        </Link>
      </div>
    </div>
  );
};

export default Login;
