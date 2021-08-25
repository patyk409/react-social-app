import React, { useState, useEffect } from "react";
import { Link, Switch, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Nav from "./Nav";
import Login from "./Login";
import Signup from "./Signup";
import Followed from "./Followed";
import Dashboard from "./Dashboard";
import Wall from "./Wall";

/*
 * custom hook -> useOnScreen
 */
const useOnScreen = options => {
  const [ref, setRef] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (ref) {
      observer.observe(ref);
    };

    return () => {
      if (ref) {
        observer.unobserve(ref);
      };
    };
  }, [ref, options]);

  return [setRef, isVisible];
};

const App = () => {
  /*
   * useState
   */
  const [userToken, setUserToken] = useState(localStorage.getItem("jwt_token"));
  const [loginPopup, setLoginPopup] = useState(false);
  const [latestPosts, setLatestPosts] = useState([]);

  const [profileAvatar, setProfileAvatar] = useState("");
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");

  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [allFollowed, setAllFollowed] = useState([]);

  const [friendBrowserByName, setFriendBrowserByName] = useState("");
  const [friendBrowserByEmail, setFriendBrowserByEmail] = useState("");
  const [postBrowserByDate, setPostBrowserByDate] = useState("");

  const [searchedName, setSearchedName] = useState("");
  const [searchedEmail, setSearchedEmail] = useState("");
  const [searchedAvatar, setSearchedAvatar] = useState("");
  const [searchedPostResult, setSearchedPostResult] = useState([]);
  const [searchedUserId, setSearchedUserId] = useState("");
  const [searchedUserInfo, setSearchedUserInfo] = useState("");
  const [searchedPostInfo, setSearchedPostInfo] = useState("");

  const [postContent, setPostContent] = useState("");
  const [postId, setPostId] = useState("");
  const [confirmationPopup, setConfirmationPopup] = useState(false);

  const [postTrigger, setPostTrigger] = useState(false);
  const [likeTrigger, setLikeTrigger] = useState(false);
  const [followTrigger, setFollowTrigger] = useState(false);
  const [searchedUserTrigger, setSearchedUserTrigger] = useState(false);
  const [searchedPostTrigger, setSearchedPostTrigger] = useState(false);

  const [setRef, isVisible] = useOnScreen({ threshold: 1.0 });

  console.log(isVisible ? "is on screen" : "is not on screen");

  /*
   * axios header configuraton
   */
  const headerConfig = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  };

  /*
   * axios header configuraton with authentication
   */
  const headerConfigAuth = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("jwt_token")
    }
  };

  /*
   * useEffect
   */
  useEffect(() => {
    // login popup timeout
    const loginPopupTimeout = setTimeout(() => {
      if (!userToken && window.location.href.endsWith("/")) {
        setLoginPopup(true);
      };
    }, 5000);
    return () => clearTimeout(loginPopupTimeout);
  }, [userToken]);

  useEffect(() => {
    // latest posts
    axios.post(
      "https://akademia108.pl/api/social-app/post/latest",
      JSON.stringify(),
      headerConfig)
      .then(res => {
        setLatestPosts(res.data);
        // console.log("latest posts response: ", res);
      })
      .catch(err => {
        console.error(err);
      })
  }, [postTrigger, likeTrigger, userToken]);

  useEffect(() => {
    if (userToken) {
      // profile data
      axios.post(
        "https://akademia108.pl/api/social-app/user/profile",
        JSON.stringify(),
        headerConfigAuth)
        .then(res => {
          setProfileName(res.data.username);
          setProfileEmail(res.data.email);
          setProfileAvatar(res.data.avatar_url);
          // console.log("profile response: ", res);
        })
        .catch(err => {
          console.error(err);
        })

      // recommended users
      axios.post(
        "https://akademia108.pl/api/social-app/follows/recommendations",
        JSON.stringify(),
        headerConfigAuth)
        .then(res => {
          setRecommendedUsers(res.data);
          // console.log("recommendations response: ", res);
        })
        .catch(err => {
          console.error(err);
        })

      // all followed users
      axios.post(
        "https://akademia108.pl/api/social-app/follows/allfollows",
        JSON.stringify(),
        headerConfigAuth)
        .then(res => {
          setAllFollowed(res.data);
          // console.log("all follows response: ", res);
        })
        .catch(err => {
          console.error(err);
        })
    };
  }, [followTrigger, userToken]);

  /*
   *
   * log out
   * 
   */
  const logUserDataOut = () => {
    axios.post(
      "https://akademia108.pl/api/social-app/user/logout",
      JSON.stringify(),
      headerConfigAuth)
      .then(res => {
        localStorage.removeItem("name");
        localStorage.removeItem("jwt_token");
        setUserToken(localStorage.getItem("jwt_token"));
        setSearchedUserTrigger(false);
        setSearchedPostTrigger(false);
        console.log("log out response: ", res);
      })
      .catch(err => {
        console.error(err);
      })
  };

  /*
   *
   * follow user
   * 
   */
  const followUser = id => {
    axios.post(
      "https://akademia108.pl/api/social-app/follows/follow",
      JSON.stringify({
        "leader_id": id
      }),
      headerConfigAuth)
      .then(res => {
        setFollowTrigger(!followTrigger);
        setSearchedUserTrigger(false);
        console.log("follow response: ", res);
      })
      .catch(err => {
        console.error(err);
      })
  };

  /*
   *
   * unfollow user
   * 
   */
  const unfollowUser = id => {
    axios.post(
      "https://akademia108.pl/api/social-app/follows/disfollow",
      JSON.stringify({
        "leader_id": id
      }),
      headerConfigAuth)
      .then(res => {
        setFollowTrigger(!followTrigger);
        searchedPostCloser();
        console.log("unfollow response: ", res);
      })
      .catch(err => {
        console.error(err);
      })
  };

  /*
   *
   * post like
   * 
   */
  const postLike = id => {
    axios.post(
      "https://akademia108.pl/api/social-app/post/like",
      JSON.stringify({
        "post_id": id
      }),
      headerConfigAuth)
      .then(res => {
        setLikeTrigger(!likeTrigger);
        console.log("like response: ", res);
      })
      .catch(err => {
        console.error(err);
      })
  };

  /*
   *
   * post dislike
   * 
   */
  const postDislike = id => {
    axios.post(
      "https://akademia108.pl/api/social-app/post/dislike",
      JSON.stringify({
        "post_id": id
      }),
      headerConfigAuth)
      .then(res => {
        setLikeTrigger(!likeTrigger);
        console.log("dislike response: ", res);
      })
      .catch(err => {
        console.error(err);
      })
  };

  /*
   *
   * add post
   * 
   */
  const addPost = () => {
    setSearchedPostResult([]);

    if (postContent === "") {
      setSearchedPostTrigger(true);
      setSearchedPostInfo("Post field cannot be empty, type what's on your mind and share it with your friends");
    } else {
      axios.post(
        "https://akademia108.pl/api/social-app/post/add",
        JSON.stringify({
          "content": postContent
        }),
        headerConfigAuth)
        .then(res => {
          setPostTrigger(true);
          setSearchedPostTrigger(false);
          console.log("post add response: ", res);
        })
        .catch(err => {
          console.error(err);
        })
    };
    setPostTrigger(false);
    setPostContent("");
  };

  /*
   *
   * delete post
   *
   */
  const deletePost = id => {
    axios.post(
      "https://akademia108.pl/api/social-app/post/delete",
      JSON.stringify({
        "post_id": id
      }),
      headerConfigAuth)
      .then(res => {
        setPostTrigger(true);
        console.log("post delete response: ", res);
      })
      .catch(err => {
        console.error(err);
      })
    setPostTrigger(false);
    setConfirmationPopup(false);
  };

  /*
   *
   * friend browser
   * 
   */
  const searchFriendByName = () => {
    // search friend by name
    if (friendBrowserByName === "") {
      setSearchedUserTrigger(true);
      setSearchedUserInfo("Name field cannot be empty, type exact name and find your friend");
    } else {
      axios.post(
        "https://akademia108.pl/api/social-app/user/check-username",
        JSON.stringify({
          "username": friendBrowserByName
        }),
        headerConfigAuth)
        .then(res => {
          setSearchedName(res.data.username);
          setSearchedEmail(res.data.email);
          setSearchedAvatar(res.data.avatar_url);
          setSearchedUserInfo(res.data.message);
          setSearchedUserTrigger(true);
          setSearchedUserId(res.data.id);
          console.log("check by name response: ", res);
        })
        .catch(err => {
          console.error(err);
        })
    };
    setFriendBrowserByName("");
  };

  const searchFriendByEmail = () => {
    // search friend by email
    if (friendBrowserByEmail === "") {
      setSearchedUserInfo("Email field cannot be empty, type correct address and find your friend");
      setSearchedUserTrigger(true);
    } else {
      axios.post(
        "https://akademia108.pl/api/social-app/user/check-email",
        JSON.stringify({
          "email": friendBrowserByEmail
        }),
        headerConfigAuth)
        .then(res => {
          setSearchedName(res.data.username);
          setSearchedEmail(res.data.email);
          setSearchedAvatar(res.data.avatar_url);
          setSearchedUserTrigger(true);
          setSearchedUserInfo(res.data.message);
          setSearchedUserId(res.data.id);
          console.log("check by email response: ", res);
        })
        .catch(err => {
          console.error(err);
        })
    };
    setFriendBrowserByEmail("");
  };

  /*
   *
   * post browser
   * 
   */
  const searchPost = () => {
    setSearchedPostResult([]);

    if (postBrowserByDate === "") {
      setSearchedPostInfo("Date field cannot be empty, enter date and find post that you looking for");
      setSearchedPostTrigger(true);
    } else {
      axios.post(
        "https://akademia108.pl/api/social-app/post/newer-then",
        JSON.stringify({
          "date": postBrowserByDate
        }),
        headerConfigAuth)
        .then(res => {
          setSearchedPostTrigger(true);
          setSearchedPostResult(res.data);
          if (res.data.length === 0) {
            setSearchedPostInfo(`There are no newer posts for the date you entered, check date again and keep looking`);
          };
          console.log("check post response: ", res);
        })
        .catch(err => {
          console.error(err);
        })
    };
    setPostBrowserByDate("");
  };

  /*
   *
   * show confirmation popup
   * 
   */
  const showConfirmationPopup = id => {
    setConfirmationPopup(true);
    setPostId(id);
  };

  /*
   *
   * searched post closer
   * 
   */
  const searchedPostCloser = () => {
    setSearchedPostTrigger(false);
    setSearchedPostResult([]);
  };

  /*
   *
   * search window closer
   *
   */
  const searchWindowCloser = () => {
    setSearchedUserTrigger(false);
    setSearchedPostTrigger(false);
  };

  /*
   * jsx
   */
  return (
    <div className="App-social">
      <header className="App-header">
        <h1>
          <Link
            to="/">
            Space Club
            <i className="fas fa-user-astronaut"></i>
          </Link>
        </h1>
      </header>

      <Switch>
        <Route exact path="/">
          <Nav
            userToken={userToken}
            logUserDataOut={logUserDataOut}
            searchWindowCloser={searchWindowCloser} />

          {(userToken) ?
            <Dashboard
              profileAvatar={profileAvatar}
              profileName={profileName}
              profileEmail={profileEmail}
              recommendedUsers={recommendedUsers}
              followUser={followUser}
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
              searchPost={searchPost}
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
              postLike={postLike}
              postDislike={postDislike}
              searchedPostCloser={searchedPostCloser}
              unfollowUser={unfollowUser} /> : null}

          <Wall
            latestPosts={latestPosts}
            postLike={postLike}
            postDislike={postDislike}
            deletePost={deletePost}
            confirmationPopup={confirmationPopup}
            showConfirmationPopup={showConfirmationPopup}
            setConfirmationPopup={setConfirmationPopup}
            postId={postId}
            unfollowUser={unfollowUser}
            isVisible={isVisible}
            userToken={userToken} />
        </Route>

        <Route path="/login">
          <Nav
            userToken={userToken}
            logUserDataOut={logUserDataOut}
            searchWindowCloser={searchWindowCloser} />

          <Login
            headerConfig={headerConfig}
            setUserToken={setUserToken}
            loginPopup={loginPopup}
            setLoginPopup={setLoginPopup} />
        </Route>

        <Route path="/signup">
          <Nav
            userToken={userToken}
            logUserDataOut={logUserDataOut}
            searchWindowCloser={searchWindowCloser} />

          <Signup
            headerConfig={headerConfig} />
        </Route>

        <Route path="/followed">
          <Nav
            userToken={userToken}
            logUserDataOut={logUserDataOut}
            searchWindowCloser={searchWindowCloser} />

          <Followed
            allFollowed={allFollowed}
            unfollowUser={unfollowUser} />
        </Route>
      </Switch>

      {(loginPopup) ?
        <aside className="App-popup">
          <Login
            headerConfig={headerConfig}
            setUserToken={setUserToken}
            loginPopup={loginPopup}
            setLoginPopup={setLoginPopup} />
        </aside> : null}

      <footer className="App-footer" ref={setRef}>
        <p>Space Club<i className="far fa-copyright"></i>2021</p>
      </footer>
    </div>
  );
};

export default App;
