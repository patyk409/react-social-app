import React, { useState, useContext } from 'react'
import { GlobalContext } from '../../../tools/CreateContext'
import axios from 'axios'

// COMPONENTS
import SearchedPost from '../dashboard-profile/searched-post/SearchedPost'

const ProfileInput = () => {
  // LOCAL STATE
  const [postContent, setPostContent] = useState('')

  const [profileInputInfo, setProfileInputInfo] = useState('')
  const [searchedPostToggler, setSearchedPostToggler] = useState(false)

  // GLOBAL CONTEXT
  const {
    headerConfigAuth,
    postToggler,
    setPostToggler,
    setDownbarDisplay,
    setDownbarContent,
    postBrowserValue,
    setPostBrowserValue,
    searchedPostTrigger,
    setSearchedPostTrigger,
    searchedPostResult,
    setSearchedPostResult,
  } = useContext(GlobalContext)

  // ADD POST - METHOD
  const addPost = () => {
    setSearchedPostResult([])
    setSearchedPostTrigger(false)

    if (postContent === '') {
      setSearchedPostTrigger(true)
      setProfileInputInfo(
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
        .then(() => {
          if (!searchedPostResult) {
            setSearchedPostTrigger(false)
          }
          setPostToggler(!postToggler)
          setDownbarDisplay(true)
          setDownbarContent('Post has been added')
        })
        .catch((err) => {
          console.error(err)
        })
    }
    setPostContent('')
  }

  // SEARCHED POST RESULT HANDLER
  const searchedPostResultHandler = () => {
    setSearchedPostTrigger(true)
    setSearchedPostToggler(!searchedPostToggler)
    if (postBrowserValue === '') {
      setProfileInputInfo(
        'Date field cannot be empty, enter date and find post that you looking for',
      )
    } else {
      addPost()
    }
  }

  // JSX
  return (
    <>
      {/* ADD POST INPUT */}
      <div className="profile__input-box">
        <input
          type="text"
          placeholder="write some post"
          value={postContent}
          onChange={(event) => setPostContent(event.target.value)}
          className="input-box__text-input"
        />
        <button className="input-box__button" onClick={addPost}>
          <i className="fas fa-pen-alt input-box__button-icon"></i>
        </button>
      </div>

      {/* SEARCH POST INPUT */}
      <div className="profile__input-box">
        <input
          type="date"
          value={postBrowserValue}
          onChange={(event) => setPostBrowserValue(event.target.value)}
          className="input-box__text-input"
        />
        <button
          className="input-box__button"
          onClick={searchedPostResultHandler}
        >
          <i className="fas fa-search input-box__button-icon"></i>
        </button>

        {/* SEARCHED POST RESULT */}
        {searchedPostTrigger && (
          <SearchedPost
            profileInputInfo={profileInputInfo}
            setProfileInputInfo={setProfileInputInfo}
            searchedPostToggler={searchedPostToggler}
          />
        )}
      </div>
    </>
  )
}

export default ProfileInput
