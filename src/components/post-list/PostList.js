import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import '../../styles/components/post-list/PostList.scss'

// COMPONENTS
import PostInfo from './PostInfo'
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

  // MERGE POST ARRAYS IF MORE POSTS ARE LOADED - FUNCTION
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

  // UNFOLLOW USER - FUNCTION
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
    <main className="post">
      <ul className="post-list">
        {latestPosts.map((post) => {
          return (
            <li className="post-list-item" key={post.id}>
              <div className="post-author">
                <img
                  src={post.user.avatar_url}
                  alt="user_avatar"
                  className="post-author-img"
                />

                <div>
                  <p className="post-author-name">{post.user.username}</p>
                  <span className="post-author-email">{post.user.email}</span>
                </div>

                {isLogged &&
                post.user.username !== localStorage.getItem('name') && (
                  <div
                    className="unfollow-icon"
                    onClick={() => {
                      unfollowUser(post.user.id)
                    }}
                    tabIndex="0"
                  >
                    <i className="fas fa-minus"></i>
                  </div>
                )}

                {/* DELETE POST - ICON */}
                <DeleteIcon post={post} />
              </div>

              <p className="post-content">{post.content}</p>

              {/* POST - INFO AND LIKE BOX */}
              <PostInfo post={post} />
            </li>
          )
        })}

        {/* DELETE POST - CONFIRMATION POPUP */}
        {confirmationDisplay && !searchedPostTrigger && (
          <aside className="popup-background">
            <ConfirmationPopup postId={postId} />
          </aside>
        )}
      </ul>

      {/* PRELOADER */}
      <Preloader isVisible={props.isVisible} />
    </main>
  )
}

export default PostList
