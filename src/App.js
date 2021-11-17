import React, { useState, useEffect, useContext } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import './App.scss'

// COMPONENTS
import Nav from './components/nav/Nav'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import AllFollowed from './components/all-followed/AllFollowed'
import Dashboard from './components/dashboard/Dashboard'
import PostList from './components/post-list/PostList'

import DownbarInfo from './utilities/DownbarInfo'
import ScrollToTop from './utilities/ScrollToTop'
import { GlobalContext } from './context/CreateContext'

// CUSTOM HOOK - USE ON SCREEN
const useOnScreen = (options) => {
  // LOCAL STATES
  const [ref, setRef] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, options)
    if (ref) {
      observer.observe(ref)
    }
    return () => {
      if (ref) {
        observer.unobserve(ref)
      }
    }
  }, [ref, options])
  return [setRef, isVisible]
}

const App = () => {
  // LOCAL STATES
  const [setRef, isVisible] = useOnScreen({ threshold: 0.9 })

  // GLOBAL CONTEXT
  const {
    isLogged,
    loginDisplay,
    setLoginDisplay,
    downbarDisplay,
    setDownbarDisplay,
  } = useContext(GlobalContext)

  // LOGIN POPUP TIMEOUT - TRIGGER
  useEffect(() => {
    const loginDisplayTimeout = setTimeout(() => {
      if (!isLogged && window.location.href.endsWith('/')) {
        setLoginDisplay(true)
      }
    }, 5000)
    return () => clearTimeout(loginDisplayTimeout)
  }, [isLogged])

  // DOWNBAR MODAL TIMEOUT - CLOSER
  useEffect(() => {
    const messageCloser = setTimeout(() => {
      if (downbarDisplay) {
        setDownbarDisplay(false)
      }
    }, 1500)
    return () => clearTimeout(messageCloser)
  }, [downbarDisplay])

  // JSX
  return (
    <div className="social-app-container">
      {/* HEADER */}
      <header className="header-container">
        <h1 className="header">
          <Link className="header-link" to="/react-social-app/">
            Social Club
            <i className="fas fa-icons header-link-icon"></i>
          </Link>
        </h1>
      </header>

      <ScrollToTop />

      <Switch>
        {/* HOME PAGE */}
        <Route exact path="/react-social-app/">
          <Nav />
          {/* DASHBOARD */}
          {isLogged && <Dashboard />}
          {/* POST LIST */}
          <PostList isVisible={isVisible} />
        </Route>

        {/* LOGIN PAGE */}
        <Route path="/react-social-app/login" component={Login}>
          <Nav />
          <Login />
        </Route>

        {/* SIGNUP PAGE */}
        <Route path="/react-social-app/signup" component={Signup}>
          <Nav />
          <Signup />
        </Route>

        {/* ALL FOLLOWED PAGE */}
        <Route path="/react-social-app/followed" component={AllFollowed}>
          <Nav />
          <AllFollowed />
        </Route>
      </Switch>

      {/* LOGIN POPUP */}
      {loginDisplay && (
        <aside className="popup-background">
          <Login />
        </aside>
      )}

      {/* FOOTER */}
      <footer className="footer-container" ref={setRef}>
        <p>
          Social Club<i className="far fa-copyright footer-icon"></i>2021
        </p>
      </footer>

      {/* DOWNBAR INFO */}
      {downbarDisplay && <DownbarInfo />}
    </div>
  )
}

export default App
