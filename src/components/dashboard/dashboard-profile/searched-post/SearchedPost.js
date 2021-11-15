import React, { useEffect, useContext } from 'react'
import axios from 'axios'
import '../../../../styles/components/dashboard/dashboard-profile/searched-post/SearchedPost.scss'

// COMPONENTS
import PostInfo from '../../../post-list/PostInfo'
import DeleteIcon from '../../../../utilities/DeleteIcon'
import ConfirmationPopup from '../../../post-list/ConfirmationPopup'

import { GlobalContext } from '../../../../context/CreateContext'

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
    profileInputInfo,
    setProfileInputInfo,
    searchedPostToggler,
  } = useContext(GlobalContext)

  // SEARCHED POST RESULT EFFECT
  useEffect(() => {
    if (postBrowserValue === '') {
      return setSearchedPostResult([])
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
            setProfileInputInfo(
              `There are no older posts for the date you entered, check date again and keep looking`,
            )
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [postToggler, followToggler, profileInputInfo, searchedPostToggler])

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
      .then(() => {
        setFollowToggler(!followToggler)
        setDownbarDisplay(true)
        setDownbarContent('Follow has been removed')
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
      <div className="searched-post-result">
        <ul className="searched-post-list">
          {searchedPostResult.length === 0 ? (
            <div className="result-list-info-container">
              <p className="result-list-info">{profileInputInfo}</p>
            </div>
          ) : (
            searchedPostResult.map((post) => {
              return (
                <li className="result-list-item" key={post.id}>
                  <div className="result-list-item-author-container">
                    <img
                      src={post.user.avatar_url}
                      alt="user_avatar"
                      className="author-container-user-avatar"
                    />

                    <div className="author-container-user-data">
                      <p className="author-container-user-name">
                        {post.user.username}
                      </p>
                      <span className="author-container-user-email">
                        {post.user.email}
                      </span>
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
                    <DeleteIcon
                      post={post}
                      setConfirmationPopup={setConfirmationPopup}
                    />
                  </div>

                  <p className="result-list-item-post-content">
                    {post.content}
                  </p>

                  {/* POST - INFO AND LIKE BOX */}
                  <PostInfo post={post} />
                </li>
              )
            })
          )}

          {/* DELETE POST - CONFIRMATION POPUP */}
          {confirmationPopup && (
            <aside className="app-popup-bg">
              <ConfirmationPopup
                setConfirmationPopup={setConfirmationPopup}
                postId={postId}
              />
            </aside>
          )}
        </ul>
      </div>

      {searchedPostTrigger && (
        <div
          className="result-list-result-closer"
          onClick={() => {
            searchedPostCloser()
          }}
        >
          <i className="fas fa-times"></i>
        </div>
      )}
    </>
  )
}

export default SearchedPost
