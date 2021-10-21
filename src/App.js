import React, { useState, useEffect } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import './App.css'

import axios from 'axios'

import Nav from './nav/Nav'
import Login from './Login'
import Signup from './Signup'
import AllFollowed from './all-followed/AllFollowed'
import Dashboard from './Dashboard'
import PostList from './post-list/PostList'
import ScrollToTop from './ScrollToTop'
import DownbarInfo from './DownbarInfo'

/*
 * custom hook -> useOnScreen
 */
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
  /*
   * useState
   */
  const [userToken, setUserToken] = useState(localStorage.getItem('jwt_token'))
  const [loginPopup, setLoginPopup] = useState(false)
  // const [latestPosts, setLatestPosts] = useState([])
  const [message, setMessage] = useState('')

  const [profileAvatar, setProfileAvatar] = useState('')
  const [profileName, setProfileName] = useState('')
  const [profileEmail, setProfileEmail] = useState('')

  const [recommendedUsers, setRecommendedUsers] = useState([])
  // const [allFollowed, setAllFollowed] = useState([])
  const [followTrigger, setFollowTrigger] = useState(false)
  const [followToggler, setFollowToggler] = useState(false)

  const [friendBrowserByName, setFriendBrowserByName] = useState('')
  const [friendBrowserByEmail, setFriendBrowserByEmail] = useState('')
  const [postBrowserByDate, setPostBrowserByDate] = useState('')

  const [searchedName, setSearchedName] = useState('')
  const [searchedEmail, setSearchedEmail] = useState('')
  const [searchedAvatar, setSearchedAvatar] = useState('')
  const [searchedPostResult, setSearchedPostResult] = useState([])
  const [searchedUserId, setSearchedUserId] = useState('')
  const [searchedUserInfo, setSearchedUserInfo] = useState('')
  const [searchedPostInfo, setSearchedPostInfo] = useState('')

  const [postContent, setPostContent] = useState('')
  // const [postId, setPostId] = useState('')
  // const [confirmationPopup, setConfirmationPopup] = useState(false)

  const [postTrigger, setPostTrigger] = useState(false)
  const [likeTrigger, setLikeTrigger] = useState(false)
  const [searchedUserTrigger, setSearchedUserTrigger] = useState(false)
  const [searchedPostTrigger, setSearchedPostTrigger] = useState(false)
  const [searchPostButtonTrigger, setSearchPostButtonTrigger] = useState(false)
  const [messageTrigger, setMessageTrigger] = useState(false)

  // ZOSTAJE !!! - NIE USUWAĆ
  const [scrollPosition, setScrollPosition] = useState(0)
  const [setRef, isVisible] = useOnScreen({ threshold: 0.9 })

  // const [messageContent, setMessageContent] = useState('')
  // const [messageDisplay, setMessageDisplay] = useState(false)

  // /*
  //  * closes modal with action info
  //  */
  // useEffect(() => {
  //   const messageCloser = setTimeout(() => {
  //     if (messageDisplay) {
  //       setMessageDisplay(false)
  //     }
  //   }, 1500)
  //   return () => clearTimeout(messageCloser)
  // }, [messageDisplay])

  /*
   * axios header configuraton
   */
  const headerConfig = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }

  /*
   * axios header configuraton with authentication
   */
  const headerConfigAuth = {
    headers: {
      headerConfig,
      Authorization: 'Bearer ' + localStorage.getItem('jwt_token'),
    },
  }

  /*
   * useEffect
   */
  useEffect(() => {
    // login popup timeout
    const loginPopupTimeout = setTimeout(() => {
      if (!userToken && window.location.href.endsWith('/')) {
        setLoginPopup(true)
      }
    }, 5000)
    return () => clearTimeout(loginPopupTimeout)
  }, [userToken])

  // useEffect(() => {
  //   // latest posts
  //   axios
  //     .post(
  //       'https://akademia108.pl/api/social-app/post/latest',
  //       JSON.stringify(),
  //       headerConfigAuth,
  //     )
  //     .then((res) => {
  //       setLatestPosts(res.data)
  //       // console.log('latest posts response: ', res)
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })
  // }, [postTrigger, likeTrigger, userToken, allFollowed])

  useEffect(() => {
    if (userToken) {
      // profile data
      axios
        .post(
          'https://akademia108.pl/api/social-app/user/profile',
          JSON.stringify(),
          headerConfigAuth,
        )
        .then((res) => {
          setProfileName(res.data.username)
          setProfileEmail(res.data.email)
          setProfileAvatar(res.data.avatar_url)
          // console.log("profile response: ", res);
        })
        .catch((err) => {
          console.error(err)
        })

      // recommended users
      axios
        .post(
          'https://akademia108.pl/api/social-app/follows/recommendations',
          JSON.stringify(),
          headerConfigAuth,
        )
        .then((res) => {
          setRecommendedUsers(res.data)
          // console.log("recommendations response: ", res);
        })
        .catch((err) => {
          console.error(err)
        })

      // // all followed users
      // axios
      //   .post(
      //     'https://akademia108.pl/api/social-app/follows/allfollows',
      //     JSON.stringify(),
      //     headerConfigAuth,
      //   )
      //   .then((res) => {
      //     setAllFollowed(res.data)
      //     // console.log("all follows response: ", res);
      //   })
      //   .catch((err) => {
      //     console.error(err)
      //   })
    }
  }, [followTrigger, userToken, postTrigger])

  useEffect(() => {
    // searched post result
    if (postBrowserByDate === '') {
      return null
    } else {
      axios
        .post(
          'https://akademia108.pl/api/social-app/post/newer-then',
          JSON.stringify({
            date: postBrowserByDate,
          }),
          headerConfigAuth,
        )
        .then((res) => {
          setSearchedPostResult(res.data)
          if (res.data.length === 0) {
            setSearchedPostInfo(
              `There are no newer posts for the date you entered, check date again and keep looking`,
            )
          }
          console.log('check post response: ', res)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [
    searchedPostTrigger,
    likeTrigger,
    // allFollowed,
    searchedPostInfo,
    searchPostButtonTrigger,
  ])

  // ZOSTAJE !!! - NIE USUWAĆ
  // const navOnScroll = () => {
  //   const position = window.pageYOffset
  //   setScrollPosition(position)

  //   if (position > 122 && window.location.href.endsWith('/')) {
  //     document.querySelector('.nav').classList.add('nav-on-scroll')
  //   } else {
  //     document.querySelector('.nav').classList.remove('nav-on-scroll')
  //   }
  // }

  // useEffect(() => {
  //   window.addEventListener('scroll', navOnScroll)

  //   return () => {
  //     window.removeEventListener('scroll', navOnScroll)
  //   }
  // }, [scrollPosition])

  /*
   * message popup closer
   */
  useEffect(() => {
    const messageCloser = setTimeout(() => {
      if (messageTrigger) {
        setMessageTrigger(false)
      }
    }, 1500)
    return () => clearTimeout(messageCloser)
  }, [messageTrigger, message])

  // /*
  //  * log out
  //  */
  // const logUserDataOut = () => {
  //   axios
  //     .post(
  //       'https://akademia108.pl/api/social-app/user/logout',
  //       JSON.stringify(),
  //       headerConfigAuth,
  //     )
  //     .then((res) => {
  //       localStorage.removeItem('name')
  //       localStorage.removeItem('jwt_token')
  //       setUserToken(localStorage.getItem('jwt_token'))
  //       setSearchedUserTrigger(false)
  //       setSearchedPostTrigger(false)
  //       setSearchedPostResult([])
  //       setPostBrowserByDate('')
  //       setMessageTrigger(true)
  //       setMessage('Logged out')
  //       console.log('log out response: ', res)
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })
  // }

  /*
   * add post
   */
  const addPost = () => {
    setSearchedPostResult([])

    if (postContent === '') {
      setSearchedPostTrigger(true)
      setSearchedPostInfo(
        "Post field cannot be empty, type what's on your mind and share it with your friends",
      )
    } else {
      axios
        .post(
          'https://akademia108.pl/api/social-app/post/add',
          JSON.stringify({
            content: postContent,
          }),
          headerConfigAuth,
        )
        .then((res) => {
          setPostTrigger(!postTrigger)
          setSearchedPostTrigger(false)
          setMessageTrigger(true)
          setMessage('Post has been added')
          console.log('post add response: ', res)
        })
        .catch((err) => {
          console.error(err)
        })
    }
    setPostContent('')
  }

  // /*
  //  * delete post
  //  */
  // const deletePost = (id) => {
  //   axios
  //     .post(
  //       'https://akademia108.pl/api/social-app/post/delete',
  //       JSON.stringify({
  //         post_id: id,
  //       }),
  //       headerConfigAuth,
  //     )
  //     .then((res) => {
  //       setPostTrigger(!postTrigger)
  //       setMessageTrigger(true)
  //       setMessage('Post has been removed')
  //       console.log('post delete response: ', res)
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })
  //   setConfirmationPopup(false)
  // }

  // /*
  //  * get more posts
  //  */
  // const getMorePosts = (date) => {
  //   axios
  //     .post(
  //       'https://akademia108.pl/api/social-app/post/older-then',
  //       JSON.stringify({
  //         date: date,
  //       }),
  //       headerConfigAuth,
  //     )
  //     .then((res) => {
  //       setLatestPosts(latestPosts.concat(res.data))
  //       console.log('get more posts response: ', res)
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })
  // }

  // /*
  //  * post like
  //  */
  // const postLike = (id) => {
  //   axios
  //     .post(
  //       'https://akademia108.pl/api/social-app/post/like',
  //       JSON.stringify({
  //         post_id: id,
  //       }),
  //       headerConfigAuth,
  //     )
  //     .then((res) => {
  //       setLikeTrigger(!likeTrigger)
  //       setMessageTrigger(true)
  //       setMessage('Like has been added')
  //       console.log('like response: ', res)
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })
  // }

  // /*
  //  * post dislike
  //  */
  // const postDislike = (id) => {
  //   axios
  //     .post(
  //       'https://akademia108.pl/api/social-app/post/dislike',
  //       JSON.stringify({
  //         post_id: id,
  //       }),
  //       headerConfigAuth,
  //     )
  //     .then((res) => {
  //       setLikeTrigger(!likeTrigger)
  //       setMessageTrigger(true)
  //       setMessage('Like has been removed')
  //       console.log('dislike response: ', res)
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })
  // }

  /*
   * follow user
   */
  const followUser = (id) => {
    axios
      .post(
        'https://akademia108.pl/api/social-app/follows/follow',
        JSON.stringify({
          leader_id: id,
        }),
        headerConfigAuth,
      )
      .then((res) => {
        setFollowTrigger(!followTrigger)
        setSearchedUserTrigger(false)
        // setMessageTrigger(true)
        setMessage('Follow has been added')
        console.log('follow response: ', res)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  // /*
  //  * unfollow user
  //  */
  // const unfollowUser = (id) => {
  //   axios
  //     .post(
  //       'https://akademia108.pl/api/social-app/follows/disfollow',
  //       JSON.stringify({
  //         leader_id: id,
  //       }),
  //       headerConfigAuth,
  //     )
  //     .then((res) => {
  //       setFollowTrigger(!followTrigger)
  //       setMessageTrigger(true)
  //       setMessage('Follow has been removed')
  //       console.log('unfollow response: ', res)
  //     })
  //     .catch((err) => {
  //       console.error(err)
  //     })
  // }

  /*
   * friend browser
   */
  const searchFriendByName = () => {
    // search friend by name
    if (friendBrowserByName === '') {
      setSearchedUserTrigger(true)
      setSearchedUserInfo(
        'Name field cannot be empty, type exact name and find your friend',
      )
    } else {
      axios
        .post(
          'https://akademia108.pl/api/social-app/user/check-username',
          JSON.stringify({
            username: friendBrowserByName,
          }),
          headerConfigAuth,
        )
        .then((res) => {
          setSearchedName(res.data.username)
          setSearchedEmail(res.data.email)
          setSearchedAvatar(res.data.avatar_url)
          setSearchedUserInfo(res.data.message)
          setSearchedUserTrigger(true)
          setSearchedUserId(res.data.id)
          console.log('check by name response: ', res)
        })
        .catch((err) => {
          console.error(err)
        })
      setFriendBrowserByName('')
    }
  }

  const searchFriendByEmail = () => {
    // search friend by email
    if (friendBrowserByEmail === '') {
      setSearchedUserInfo(
        'Email field cannot be empty, type correct address and find your friend',
      )
      setSearchedUserTrigger(true)
    } else {
      axios
        .post(
          'https://akademia108.pl/api/social-app/user/check-email',
          JSON.stringify({
            email: friendBrowserByEmail,
          }),
          headerConfigAuth,
        )
        .then((res) => {
          setSearchedName(res.data.username)
          setSearchedEmail(res.data.email)
          setSearchedAvatar(res.data.avatar_url)
          setSearchedUserTrigger(true)
          setSearchedUserInfo(res.data.message)
          setSearchedUserId(res.data.id)
          console.log('check by email response: ', res)
        })
        .catch((err) => {
          console.error(err)
        })
      setFriendBrowserByEmail('')
    }
  }

  /*
   * searched post handler
   */
  const searchedPostResultHandler = () => {
    setSearchedPostTrigger(true)
    setSearchPostButtonTrigger(!searchPostButtonTrigger)
    if (postBrowserByDate === '') {
      setSearchedPostInfo(
        'Date field cannot be empty, enter date and find post that you looking for',
      )
    }
  }

  /*
   * searched post closer
   */
  const searchedPostCloser = () => {
    setSearchedPostTrigger(false)
    setSearchedPostResult([])
    setPostBrowserByDate('')
  }

  // /*
  //  * search window closer
  //  */
  // const searchWindowCloser = () => {
  //   setSearchedUserTrigger(false)
  //   setSearchedPostTrigger(false)
  //   setSearchedPostResult([])
  //   setPostBrowserByDate('')
  //   setPostTrigger(!postTrigger)
  // }

  // /*
  //  * show confirmation popup
  //  */
  // const showConfirmationPopup = (id) => {
  //   setConfirmationPopup(true)
  //   setPostId(id)
  // }

  /*
   * jsx
   */
  return (
    <div className="App-social">
      <header className="App-header">
        <h1 className="App-header-text">
          <Link className="App-header-link" to="/">
            Social Club
            <i className="fas fa-icons App-header-linkIcon"></i>
          </Link>
        </h1>
      </header>

      <ScrollToTop />
      <Switch>
        <Route exact path="/">
          <Nav
            userToken={userToken}
            headerConfigAuth={headerConfigAuth}
            setUserToken={setUserToken}
            setPostBrowserByDate={setPostBrowserByDate}
            setSearchedPostTrigger={setSearchedPostTrigger}
            setSearchedUserTrigger={setSearchedUserTrigger}
            searchedPostResult={searchedPostResult}
            setMessageTrigger={setMessageTrigger}
            setMessage={setMessage}
            // logUserDataOut={logUserDataOut}
            // setPostBrowserByDate={setPostBrowserByDate}
            setSearchedPostResult={setSearchedPostResult}
            postTrigger={postTrigger}
            setPostTrigger={setPostTrigger}
            // searchWindowCloser={searchWindowCloser}
          />

          {userToken ? (
            <Dashboard
              profileAvatar={profileAvatar}
              profileName={profileName}
              profileEmail={profileEmail}
              recommendedUsers={recommendedUsers}
              followUser={followUser}
              // unfollowUser={unfollowUser}
              addPost={addPost}
              postContent={postContent}
              setPostContent={setPostContent}
              searchFriendByName={searchFriendByName}
              searchFriendByEmail={searchFriendByEmail}
              friendBrowserByName={friendBrowserByName}
              setFriendBrowserByName={setFriendBrowserByName}
              friendBrowserByEmail={friendBrowserByEmail}
              setFriendBrowserByEmail={setFriendBrowserByEmail}
              postBrowserByDate={postBrowserByDate}
              setPostBrowserByDate={setPostBrowserByDate}
              searchedUserInfo={searchedUserInfo}
              searchedPostInfo={searchedPostInfo}
              searchedAvatar={searchedAvatar}
              searchedName={searchedName}
              searchedEmail={searchedEmail}
              searchedUserTrigger={searchedUserTrigger}
              setSearchedUserTrigger={setSearchedUserTrigger}
              searchedPostTrigger={searchedPostTrigger}
              searchedPostResult={searchedPostResult}
              searchedUserId={searchedUserId}
              userToken={userToken}
              // postLike={postLike}
              // postDislike={postDislike}
              searchedPostCloser={searchedPostCloser}
              searchedPostResultHandler={searchedPostResultHandler}
            />
          ) : null}

          <PostList
            userToken={userToken}
            headerConfigAuth={headerConfigAuth}
            // latestPosts={latestPosts}
            // setLatestPosts={setLatestPosts}
            postTrigger={postTrigger}
            setPostTrigger={setPostTrigger}
            // allFollowed={allFollowed}
            // postLike={postLike}
            likeTrigger={likeTrigger}
            setLikeTrigger={setLikeTrigger}
            // postDislike={postDislike}
            // deletePost={deletePost}
            // postId={postId}
            // setPostId={setPostId}
            setFollowToggler={setFollowToggler}
            followToggler={followToggler}
            // messageContent={messageContent}
            // setMessageContent={setMessageContent}
            // messageDisplay={messageDisplay}
            // setMessageDisplay={setMessageDisplay}
            // unfollowUser={unfollowUser}
            // setConfirmationPopup={setConfirmationPopup}
            // confirmationPopup={confirmationPopup}
            // showConfirmationPopup={showConfirmationPopup}
            setMessageTrigger={setMessageTrigger}
            setMessage={setMessage}
            isVisible={isVisible}
          />
        </Route>

        <Route path="/login" component={Login}>
          <Nav
            userToken={userToken}
            headerConfigAuth={headerConfigAuth}
            setUserToken={setUserToken}
            setPostBrowserByDate={setPostBrowserByDate}
            setSearchedPostTrigger={setSearchedPostTrigger}
            setSearchedUserTrigger={setSearchedUserTrigger}
            searchedPostResult={searchedPostResult}
            setMessageTrigger={setMessageTrigger}
            setMessage={setMessage}
            // logUserDataOut={logUserDataOut}
            // setPostBrowserByDate={setPostBrowserByDate}
            setSearchedPostResult={setSearchedPostResult}
            postTrigger={postTrigger}
            setPostTrigger={setPostTrigger}
            // searchWindowCloser={searchWindowCloser}
          />

          <Login
            headerConfig={headerConfig}
            setUserToken={setUserToken}
            loginPopup={loginPopup}
            setLoginPopup={setLoginPopup}
            setMessage={setMessage}
            setMessageTrigger={setMessageTrigger}
          />
        </Route>

        <Route path="/signup" component={Signup}>
          <Nav
            userToken={userToken}
            headerConfigAuth={headerConfigAuth}
            setUserToken={setUserToken}
            setPostBrowserByDate={setPostBrowserByDate}
            setSearchedUserTrigger={setSearchedUserTrigger}
            setSearchedPostTrigger={setSearchedPostTrigger}
            searchedPostResult={searchedPostResult}
            setMessageTrigger={setMessageTrigger}
            setMessage={setMessage}
            // logUserDataOut={logUserDataOut}
            // setPostBrowserByDate={setPostBrowserByDate}
            setSearchedPostResult={setSearchedPostResult}
            postTrigger={postTrigger}
            setPostTrigger={setPostTrigger}
            // searchWindowCloser={searchWindowCloser}
          />

          <Signup
            headerConfig={headerConfig}
            setMessage={setMessage}
            setMessageTrigger={setMessageTrigger}
          />
        </Route>

        <Route path="/followed" component={AllFollowed}>
          <Nav
            userToken={userToken}
            headerConfigAuth={headerConfigAuth}
            setUserToken={setUserToken}
            setPostBrowserByDate={setPostBrowserByDate}
            setSearchedUserTrigger={setSearchedUserTrigger}
            searchedPostResult={searchedPostResult}
            setSearchedPostTrigger={setSearchedPostTrigger}
            setMessageTrigger={setMessageTrigger}
            setMessage={setMessage}
            // logUserDataOut={logUserDataOut}
            // setPostBrowserByDate={setPostBrowserByDate}
            setSearchedPostResult={setSearchedPostResult}
            postTrigger={postTrigger}
            setPostTrigger={setPostTrigger}
            // searchWindowCloser={searchWindowCloser}
          />

          <AllFollowed
            userToken={userToken}
            setMessageTrigger={setMessageTrigger}
            setMessage={setMessage}
            setFollowToggler={setFollowToggler}
            followToggler={followToggler}
            // allFollowed={allFollowed}
            // unfollowUser={unfollowUser}
            headerConfigAuth={headerConfigAuth}
          />
        </Route>
      </Switch>

      {loginPopup && (
        <aside className="app-popup-bg">
          <Login
            headerConfig={headerConfig}
            setUserToken={setUserToken}
            loginPopup={loginPopup}
            setLoginPopup={setLoginPopup}
            setMessage={setMessage}
            setMessageTrigger={setMessageTrigger}
          />
        </aside>
      )}

      <footer className="App-footer" ref={setRef}>
        <p className="App-footer-text">
          Social Club<i className="far fa-copyright App-footer-icon"></i>2021
        </p>
      </footer>
    </div>
  )
}

export default App
