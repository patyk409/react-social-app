import React, { useState, useEffect, useContext } from 'react'
import './PostList.css'
import axios from 'axios'

import Post from './Post'
import ConfirmationPopup from './ConfirmationPopup'
import Preloader from '../../utilities/Preloader'
import DeleteIcon from '../../utilities/DeleteIcon'
import { GlobalContext } from '../../tools/CreateContext'

const PostList = (props) => {
  // LOCAL STATE
  const [latestPosts, setLatestPosts] = useState([])

  // GLOBAL CONTEXT
  const {
    isLogged,
    headerConfigAuth,
    setDownbarContent,
    setDownbarDisplay,
    confirmationDisplay,
    postId,
    postToggler,
    searchedPostTrigger,
    followToggler,
    setFollowToggler,
  } = useContext(GlobalContext)

  // LATEST POSTS EFFECT
  useEffect(() => {
    axios
      .post(
        'https://akademia108.pl/api/social-app/post/latest',
        JSON.stringify(),
        headerConfigAuth,
      )
      .then((res) => {
        setLatestPosts(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [postToggler, followToggler, isLogged])

  // MERGE POST ARRAYS IF MORE POSTS ARE LOADED - METHOD
  const getMorePosts = (date) => {
    axios
      .post(
        'https://akademia108.pl/api/social-app/post/older-then',
        JSON.stringify({
          date: date,
        }),
        headerConfigAuth,
      )
      .then((res) => {
        setLatestPosts(latestPosts.concat(res.data))
      })
      .catch((err) => {
        console.error(err)
      })
  }

  // LOAD MORE POSTS EFFECT
  useEffect(() => {
    if (props.isVisible && latestPosts.length > 0) {
      getMorePosts(latestPosts[latestPosts.length - 1].created_at)
    }
  }, [props.isVisible])

  // UNFOLLOW USER - METHOD
  const unfollowUser = (id) => {
    axios
      .post(
        'https://akademia108.pl/api/social-app/follows/disfollow',
        JSON.stringify({
          leader_id: id,
        }),
        headerConfigAuth,
      )
      .then((res) => {
        setFollowToggler(!followToggler)
        setDownbarDisplay(true)
        setDownbarContent('Follow has been removed')
      })
      .catch((err) => {
        console.error(err)
      })
  }

  // JSX
  return (
    <main className="post-box">
      <ul className="post-box__post-list">
        {latestPosts.map((post) => {
          return (
            <li className="post-list__post-item" key={post.id}>
              <div className="post-author">
                <img
                  src={post.user.avatar_url}
                  alt="user_avatar"
                  className="post-author__img"
                />
                <div>
                  <p className="post-author__name">{post.user.username}</p>
                  <span className="post-author__email">{post.user.email}</span>
                </div>
                {isLogged &&
                post.user.username !== localStorage.getItem('name') ? (
                  <div
                    className="unfollow-icon"
                    onClick={() => {
                      unfollowUser(post.user.id)
                    }}
                    tabIndex="0"
                  >
                    <i className="fas fa-minus post-author__unfollow-icon"></i>
                  </div>
                ) : null}
                <DeleteIcon
                  post={post}
                />
              </div>
              <p className="post-item__content">{post.content}</p>
              <Post post={post} />
            </li>
          )
        })}
        {confirmationDisplay && !searchedPostTrigger && (
          <aside className="app-popup-bg">
            <ConfirmationPopup
              postId={postId}
            />
          </aside>
        )}
      </ul>
      <Preloader isVisible={props.isVisible} />
    </main>
  )
}

export default PostList
