import React, { useState, useEffect, useContext } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import './App.css'

// COMPONENTS
import Nav from './components/nav/Nav'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import AllFollowed from './components/all-followed/AllFollowed'
import Dashboard from './components/dashboard/Dashboard'
import PostList from './components/post-list/PostList'

import DownbarInfo from './utilities/DownbarInfo'
import ScrollToTop from './tools/ScrollToTop'
import { GlobalContext } from './tools/CreateContext'

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
    <div className="app-social">
      {/* HEADER */}
      <header className="app-social__app-header">
        <h1 className="app-header__content">
          <Link className="app-header__link" to="/">
            Social Club
            <i className="fas fa-icons app-header__link-icon"></i>
          </Link>
        </h1>
      </header>

      <ScrollToTop />

      <Switch>
        {/* HOME PAGE */}
        <Route exact path="/">
          <Nav />
          {/* DASHBOARD */}
          {isLogged && <Dashboard />}
          {/* POST LIST */}
          <PostList isVisible={isVisible} />
        </Route>

        {/* LOGIN PAGE */}
        <Route path="/login" component={Login}>
          <Nav />
          <Login />
        </Route>

        {/* SIGNUP PAGE */}
        <Route path="/signup" component={Signup}>
          <Nav />
          <Signup />
        </Route>

        {/* ALL FOLLOWED PAGE */}
        <Route path="/followed" component={AllFollowed}>
          <Nav />
          <AllFollowed />
        </Route>
      </Switch>

      {/* LOGIN POPUP */}
      {loginDisplay && (
        <aside className="app-popup-bg">
          <Login />
        </aside>
      )}

      {/* FOOTER */}
      <footer className="app-social__app-footer" ref={setRef}>
        <p className="app-footer__content">
          Social Club<i className="far fa-copyright app-footer__icon"></i>2021
        </p>
      </footer>

      {/* DOWNBAR INFO */}
      {downbarDisplay && <DownbarInfo />}
    </div>
  )
}

export default App
