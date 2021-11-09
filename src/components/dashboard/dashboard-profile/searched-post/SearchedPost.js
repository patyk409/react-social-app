import React, { useEffect, useContext } from 'react'
import { GlobalContext } from '../../../../tools/CreateContext'
import axios from 'axios'
import './SearchedPost.css'

// COMPONENTS
import Post from '../../../post-list/Post'
import DeleteIcon from '../../../../utilities/DeleteIcon'
import ConfirmationPopup from '../../../post-list/ConfirmationPopup'

const SearchedPost = (props) => {
  // GLOBAL CONTEXT
  const {
    isLogged,
    headerConfigAuth,
    postId,
    postToggler,
    postBrowserValue,
    setPostBrowserValue,
    searchedPostTrigger,
    setSearchedPostTrigger,
    searchedPostResult,
    setSearchedPostResult,
    confirmationPopup,
    setConfirmationPopup,
    followToggler,
    setFollowToggler,
    setDownbarDisplay,
    setDownbarContent,
  } = useContext(GlobalContext)

  // SEARCHED POST RESULT EFFECT
  useEffect(() => {
    if (postBrowserValue === '') {
      return null
    } else {
      axios
        .post(
          'https://akademia108.pl/api/social-app/post/older-then',
          JSON.stringify({
            date: postBrowserValue,
          }),
          headerConfigAuth,
        )
        .then((res) => {
          setSearchedPostResult(res.data)
          if (res.data.length === 0) {
            props.setProfileInputInfo(
              `There are no older posts for the date you entered, check date again and keep looking`,
            )
          }
          console.log('check post response: ', res)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [
    postToggler,
    searchedPostTrigger,
    followToggler,
    props.profileInputInfo,
    props.searchedPostToggler,
  ])

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
        console.log('unfollow response: ', res)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  // SEARCHED POST CLOSER
  const searchedPostCloser = () => {
    setSearchedPostTrigger(false)
    setSearchedPostResult([])
    setPostBrowserValue('')
  }

  // JSX
  return (
    <>
      {/* SEARCHED POST RESULT */}
      <div className="searched-post-result">
        <ul className="searched-post-result__result-list">
          {searchedPostResult.length === 0 ? (
            <div className="result-list__info-box">
              <p className="result-list__info">{props.profileInputInfo}</p>
            </div>
          ) : (
            searchedPostResult.map((post) => {
              return (
                <li
                  className="searched-post-result__result-list-item"
                  key={post.id}
                >
                  <div className="result-list-item__author-box">
                    <img
                      src={post.user.avatar_url}
                      alt="user_avatar"
                      className="author-box__avatar"
                    />
                    <div className="author-box__info-box">
                      <p className="info-box__name">{post.user.username}</p>
                      <span className="info-box__email">{post.user.email}</span>
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
                          <i className="fas fa-minus result-list-item__unfollow-icon"></i>
                        </div>
                      )}

                    {/* DELETE POST - ICON */}
                    <DeleteIcon
                      post={post}
                      setConfirmationPopup={setConfirmationPopup}
                    />
                  </div>
                  <p className="result-list-item__post-content">
                    {post.content}
                  </p>

                  {/* POST - INFO AND LIKE BOX */}
                  <Post post={post} />
                </li>
              )
            })
          )}

          {/* DELETE POST - CONFIRMATION POPUP */}
          {confirmationPopup && searchedPostTrigger && (
            <aside className="app-popup-bg">
              <ConfirmationPopup
                setConfirmationPopup={setConfirmationPopup}
                postId={postId}
              />
            </aside>
          )}
        </ul>
      </div>

      {/* SEARCHED POST RESULT - CLOSER */}
      {searchedPostTrigger && (
        <div
          className="result-list__closer"
          onClick={() => {
            searchedPostCloser()
          }}
        >
          <i className="fas fa-times result-list__closer-icon"></i>
        </div>
      )}
    </>
  )
}

export default SearchedPost
