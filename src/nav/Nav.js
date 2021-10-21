import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'
import axios from 'axios'

const Nav = (props) => {
  /*
   * function that removes user name and token from local storage and closes all active windows so user is logged out
   */
  const logUserDataOut = () => {
    axios
      .post(
        'https://akademia108.pl/api/social-app/user/logout',
        JSON.stringify(),
        props.headerConfigAuth,
      )
      .then((res) => {
        localStorage.removeItem('name')
        localStorage.removeItem('jwt_token')
        props.setUserToken(localStorage.getItem('jwt_token'))
        props.setSearchedUserTrigger(false)
        props.setSearchedPostTrigger(false)
        props.setSearchedPostResult([])
        props.setPostBrowserByDate('')
        // props.setMessageTrigger(true)
        // props.setMessage('Logged out')
        console.log('log out response: ', res)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  /*
   * function that closes all active windows and refreshes post and recommendations list
   */
  const windowCloseAndRefresh = () => {
    props.setSearchedUserTrigger(false)
    props.setSearchedPostTrigger(false)
    props.setSearchedPostResult([])
    props.setPostBrowserByDate('')
    props.setPostTrigger(!props.postTrigger)
  }

  /*
   * jsx
   */
  return (
    <nav
      className={window.location.href.endsWith('/') ? 'nav nav-sticky' : 'nav'}
    >
      <ul className='nav-list'>
        <li className='nav-list__list-item'>
          <Link
            className='list-item__link'
            to='/'
            onClick={windowCloseAndRefresh}
          >
            <i className='fas fa-home list-item__link-icon'></i>
            Home
          </Link>
        </li>
        {!props.userToken && (
          <li className='nav-list__list-item'>
            <Link className='list-item__link' to='/signup'>
              <i className='fas fa-user-plus list-item__link-icon'></i>
              Sign up
            </Link>
          </li>
        )}
        {!props.userToken && (
          <li className='nav-list__list-item'>
            <Link className='list-item__link' to='/login'>
              <i className='fas fa-sign-in-alt list-item__link-icon'></i>
              Log in
            </Link>
          </li>
        )}
        {props.userToken && (
          <li className='nav-list__list-item'>
            <Link
              className='list-item__link'
              to='/followed'
              onClick={windowCloseAndRefresh}
            >
              <i className='fas fa-user-friends list-item__link-icon'></i>
              Followed
            </Link>
          </li>
        )}
        {props.userToken && (
          <li className='nav-list__list-item'>
            <Link className='list-item__link' to='/' onClick={logUserDataOut}>
              <i className='fas fa-sign-out-alt list-item__link-icon'></i>
              Log out
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Nav
