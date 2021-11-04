import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'
import axios from 'axios'
import { GlobalContext } from '../../CreateContext'

const Nav = () => {
  const [scrollPosition, setScrollPosition] = useState(0)

  const {
    userToken,
    setUserToken,
    headerConfigAuth,
    setDownbarContent,
    setDownbarDisplay,
    setPostBrowserByDate,
    setSearchedPostResult,
    setSearchedUserTrigger,
    setSearchedPostTrigger,
    followToggler,
    setFollowToggler,
  } = useContext(GlobalContext)

  const navOnScroll = () => {
    const position = window.pageYOffset
    setScrollPosition(position)

    if (position > 122 && window.location.href.endsWith('/')) {
      document.querySelector('.nav').classList.add('nav-on-scroll')
    } else {
      document.querySelector('.nav').classList.remove('nav-on-scroll')
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', navOnScroll)

    return () => {
      window.removeEventListener('scroll', navOnScroll)
    }
  }, [scrollPosition])

  const logUserDataOut = () => {
    axios
      .post(
        'https://akademia108.pl/api/social-app/user/logout',
        JSON.stringify(),
        headerConfigAuth,
      )
      .then((res) => {
        localStorage.removeItem('name')
        localStorage.removeItem('jwt_token')
        setUserToken(localStorage.getItem('jwt_token'))
        setDownbarDisplay(true)
        setDownbarContent('Logged out')
        windowCloseAndRefresh()
        console.log('log out response: ', res)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const windowCloseAndRefresh = () => {
    setSearchedUserTrigger(false)
    setSearchedPostTrigger(false)
    setSearchedPostResult([])
    setPostBrowserByDate('')
    setFollowToggler(!followToggler)
  }

  /*
   * jsx
   */
  return (
    <nav
      className={window.location.href.endsWith('/') ? 'nav nav-sticky' : 'nav'}
    >
      <ul className="nav-list">
        <li className="nav-list__list-item">
          <Link
            className="list-item__link"
            to="/"
            onClick={windowCloseAndRefresh}
          >
            <i className="fas fa-home list-item__link-icon"></i>
            Home
          </Link>
        </li>
        {!userToken && (
          <li className="nav-list__list-item">
            <Link className="list-item__link" to="/signup">
              <i className="fas fa-user-plus list-item__link-icon"></i>
              Sign up
            </Link>
          </li>
        )}
        {!userToken && (
          <li className="nav-list__list-item">
            <Link className="list-item__link" to="/login">
              <i className="fas fa-sign-in-alt list-item__link-icon"></i>
              Log in
            </Link>
          </li>
        )}
        {userToken && (
          <li className="nav-list__list-item">
            <Link
              className="list-item__link"
              to="/followed"
              onClick={windowCloseAndRefresh}
            >
              <i className="fas fa-user-friends list-item__link-icon"></i>
              Followed
            </Link>
          </li>
        )}
        {userToken && (
          <li className="nav-list__list-item">
            <Link className="list-item__link" to="/" onClick={logUserDataOut}>
              <i className="fas fa-sign-out-alt list-item__link-icon"></i>
              Log out
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Nav
