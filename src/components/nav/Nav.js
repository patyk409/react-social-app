import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Nav.css'

import { GlobalContext } from '../../tools/CreateContext'

const Nav = () => {
  // LOCAL STATE
  const [scrollPosition, setScrollPosition] = useState(0)
  const [navClassName, setNavClassName] = useState('nav')

  // GLOBAL CONTEXT
  const {
    isLogged,
    setIsLogged,
    headerConfigAuth,
    setDownbarContent,
    setDownbarDisplay,
    setPostBrowserValue,
    setSearchedPostResult,
    setSearchedUserTrigger,
    setSearchedPostTrigger,
    followToggler,
    setFollowToggler,
  } = useContext(GlobalContext)

  // CHECK NAV POSITION AND ADD SPECIFIC CLASSES
  const navOnScroll = () => {
    const position = window.pageYOffset
    setScrollPosition(position)

    if (position > 122 && window.location.href.endsWith('/')) {
      setNavClassName('nav nav-sticky nav-on-scroll')
    } else {
      setNavClassName('nav')
    }
  }

  // NAV EFFECT ON SCROLL
  useEffect(() => {
    window.addEventListener('scroll', navOnScroll)
    return () => {
      window.removeEventListener('scroll', navOnScroll)
    }
  }, [scrollPosition])

  // LOG OUT - FUNCTION
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
        setIsLogged(localStorage.getItem('jwt_token'))
        setDownbarDisplay(true)
        setDownbarContent('Logged out')
        windowCloseAndRefresh()
        console.log('log out response: ', res)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  // CLOSE ALL ACTIVE WINDOWS / REFRESH RECOMMENDATIONS AND POST LIST
  const windowCloseAndRefresh = () => {
    setSearchedUserTrigger(false)
    setSearchedPostTrigger(false)
    setSearchedPostResult([])
    setPostBrowserValue('')
    setFollowToggler(!followToggler)
  }

  // JSX
  return (
    <nav className={navClassName}>
      <ul className="nav-list">
        {/* HOME LINK */}
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

        {/* SIGN UP FORM */}
        {!isLogged && (
          <li className="nav-list__list-item">
            <Link className="list-item__link" to="/signup">
              <i className="fas fa-user-plus list-item__link-icon"></i>
              Sign up
            </Link>
          </li>
        )}

        {/* LOG IN FORM */}
        {!isLogged && (
          <li className="nav-list__list-item">
            <Link className="list-item__link" to="/login">
              <i className="fas fa-sign-in-alt list-item__link-icon"></i>
              Log in
            </Link>
          </li>
        )}

        {/* ALL FOLLOWED LINK */}
        {isLogged && (
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

        {/* LOG OUT */}
        {isLogged && (
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
