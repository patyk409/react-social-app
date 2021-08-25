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
      
        <li className="Nav-list-item">
          <Link to="/" onClick={props.searchWindowCloser}>
            <i className="fas fa-home"></i>
            Home
          </Link>
        </li>

        {!props.userToken &&
          <li className="Nav-list-item">
            <Link to="/signup">
              <i className="fas fa-user-plus"></i>
              Sign up
            </Link>
          </li>}

        {!props.userToken &&
          <li className="Nav-list-item">
            <Link to="/login">
              <i className="fas fa-sign-in-alt"></i>
              Log in
            </Link>
          </li>}

        {props.userToken &&
          <li className="Nav-list-item">
            <Link to="/followed" onClick={props.searchWindowCloser}>
              <i className="fas fa-user-friends"></i>
              Followed
            </Link>
          </li>}

        {props.userToken &&
          <li className="Nav-list-item">
            <Link to="/" onClick={props.logUserDataOut}>
              <i className="fas fa-sign-out-alt"></i>
              Log out
            </Link>
          </li>}

      </ul>
    </nav>
  );
};

export default Nav;
