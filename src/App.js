import React, { useState, useEffect, useContext } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import './App.css'

// COMPONENTS
import Nav from './components/nav/Nav'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import AllFollowed from './components/all-followed/AllFollowed'
import Dashboard from './Dashboard'
import PostList from './components/post-list/PostList'
import ScrollToTop from './ScrollToTop'
import DownbarInfo from './DownbarInfo'

// import { ContextProvider } from './CreateContext'
import { GlobalContext } from './CreateContext'

// CUSTOM HOOK - USE ON SCREEN
const useOnScreen = (options) => {
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
  const [setRef, isVisible] = useOnScreen({ threshold: 0.9 })

  const [
    userToken,
    setLoginPopup,
    downbarDisplay,
    setDownbarDisplay,
    loginPopup,
  ] = useContext(GlobalContext)

  // // LOACAL STATE
  // const [userToken, setUserToken] = useState(localStorage.getItem('jwt_token'))
  // const [loginPopup, setLoginPopup] = useState(false)

  // const [followToggler, setFollowToggler] = useState(false)

  // const [postBrowserByDate, setPostBrowserByDate] = useState('')

  // const [searchedPostResult, setSearchedPostResult] = useState([])
  // const [searchedUserTrigger, setSearchedUserTrigger] = useState(false)
  // const [searchedPostTrigger, setSearchedPostTrigger] = useState(false)
  // const [postTrigger, setPostTrigger] = useState(false)

  // // downbar modal display and content
  // const [downbarDisplay, setDownbarDisplay] = useState(false)
  // const [downbarContent, setDownbarContent] = useState('')
  // // confirmation popup handler
  // const [confirmationPopup, setConfirmationPopup] = useState(false)
  // // id of post to delete
  // const [postId, setPostId] = useState(null)

  // // AXIOS HEADER CONFIGURATION
  // const headerConfig = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //   },
  // }

  // // AXIOS HEADER CONFIGURATION WITH AUTHENTICATION
  // const headerConfigAuth = {
  //   headers: {
  //     headerConfig,
  //     Authorization: 'Bearer ' + localStorage.getItem('jwt_token'),
  //   },
  // }

  // LOGIN POPUP TIMEOUT - TRIGGER
  useEffect(() => {
    const loginPopupTimeout = setTimeout(() => {
      if (!userToken && window.location.href.endsWith('/')) {
        setLoginPopup(true)
      }
    }, 5000)
    return () => clearTimeout(loginPopupTimeout)
  }, [userToken])

  // DOWNBAR MODAL TIMEOUT - CLOSER
  useEffect(() => {
    const messageCloser = setTimeout(() => {
      if (downbarDisplay) {
        setDownbarDisplay(false)
      }
    }, 1500)
    return () => clearTimeout(messageCloser)
  }, [downbarDisplay])

  /*
   * jsx
   */
  return (
    <div className="app-social">
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
        <Route exact path="/">
          <Nav />
          {userToken && <Dashboard />}
          <PostList isVisible={isVisible} />
        </Route>

        <Route path="/login" component={Login}>
          <Nav />
          <Login />
        </Route>

        <Route path="/signup" component={Signup}>
          <Nav />
          <Signup />
        </Route>

        <Route path="/followed" component={AllFollowed}>
          <Nav />
          <AllFollowed />
        </Route>
      </Switch>

      {loginPopup && (
        <aside className="app-popup-bg">
          <Login />
        </aside>
      )}

      <footer className="app-social__app-footer" ref={setRef}>
        <p className="app-footer__content">
          Social Club<i className="far fa-copyright app-footer__icon"></i>2021
        </p>
      </footer>

      {downbarDisplay && <DownbarInfo />}
    </div>
  )
}

export default App
