import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../../styles/components/nav/Nav.scss'

import { GlobalContext } from '../../context/CreateContext'

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

    if (position > 122 && window.location.href.endsWith('react-social-app/')) {
      setNavClassName('nav nav-sticky nav-on-scroll')
    } else if (
      position > 122 &&
      window.location.href.endsWith('react-social-app')
    ) {
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

  // LOGOUT - FUNCTION
  const logUserDataOut = () => {
    axios
      .post(
        'https://akademia108.pl/api/social-app/user/logout',
        JSON.stringify(),
        headerConfigAuth,
      )
      .then(() => {
        localStorage.removeItem('name')
        localStorage.removeItem('jwt_token')
        setIsLogged(localStorage.getItem('jwt_token'))
        setDownbarDisplay(true)
        setDownbarContent('Logged out')
        windowCloseAndRefresh()
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
        <li className="nav-list-item">
          <Link
            className="nav-link"
            to="/react-social-app/"
            onClick={windowCloseAndRefresh}
          >
            <i className="fas fa-home nav-link-icon"></i>
            Home
          </Link>
        </li>

        {/* SIGNUP FORM */}
        {!isLogged && (
          <li className="nav-list-item">
            <Link className="nav-link" to="/react-social-app/signup">
              <i className="fas fa-user-plus nav-link-icon"></i>
              Sign up
            </Link>
          </li>
        )}

        {/* LOGIN FORM */}
        {!isLogged && (
          <li className="nav-list-item">
            <Link className="nav-link" to="/react-social-app/login">
              <i className="fas fa-sign-in-alt nav-link-icon"></i>
              Log in
            </Link>
          </li>
        )}

        {/* ALL FOLLOWED LINK */}
        {isLogged && (
          <li className="nav-list-item">
            <Link
              className="nav-link"
              to="/react-social-app/followed"
              onClick={windowCloseAndRefresh}
            >
              <i className="fas fa-user-friends nav-link-icon"></i>
              Followed
            </Link>
          </li>
        )}

        {/* LOGOUT */}
        {isLogged && (
          <li className="nav-list-item">
            <Link
              className="nav-link"
              to="/react-social-app/"
              onClick={logUserDataOut}
            >
              <i className="fas fa-sign-out-alt nav-link-icon"></i>
              Log out
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Nav
