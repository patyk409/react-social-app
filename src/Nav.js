import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = props => {
  /*
   * jsx
   */
  return (
    <nav className={window.location.href.endsWith("/") ? "Nav Nav-sticky" : "Nav"}>

      <ul className="Nav-list">
        <li className="Nav-listItem">
          <Link
            className="Nav-listItem-link"
            to="/"
            onClick={props.searchWindowCloser}>
            <i className="fas fa-home Nav-listItem-linkIcon"></i>
            Home
          </Link>
        </li>

        {!props.userToken &&
          <li className="Nav-listItem">
            <Link
              className="Nav-listItem-link"
              to="/signup">
              <i className="fas fa-user-plus Nav-listItem-linkIcon"></i>
              Sign up
            </Link>
          </li>}

        {!props.userToken &&
          <li className="Nav-listItem">
            <Link
              className="Nav-listItem-link"
              to="/login">
              <i className="fas fa-sign-in-alt Nav-listItem-linkIcon"></i>
              Log in
            </Link>
          </li>}

        {props.userToken &&
          <li className="Nav-listItem">
            <Link
              className="Nav-listItem-link"
              to="/followed"
              onClick={props.searchWindowCloser}>
              <i className="fas fa-user-friends Nav-listItem-linkIcon"></i>
              Followed
            </Link>
          </li>}

        {props.userToken &&
          <li className="Nav-listItem">
            <Link
              className="Nav-listItem-link"
              to="/"
              onClick={props.logUserDataOut}>
              <i className="fas fa-sign-out-alt Nav-listItem-linkIcon"></i>
              Log out
            </Link>
          </li>}
      </ul>

    </nav>
  );
};

export default Nav;
