import React, { useState, useContext } from 'react'
import axios from 'axios'
import '../../../styles/components/dashboard/DashboardInput.scss'

// COMPONENTS
import SearchedPost from '../dashboard-profile/searched-post/SearchedPost'

import { GlobalContext } from '../../../context/CreateContext'

const ProfileInput = () => {
  // LOCAL STATE
  const [postContent, setPostContent] = useState('')

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
    setProfileInputInfo,
    searchedPostToggler,
    setSearchedPostToggler,
  } = useContext(GlobalContext)

  // ADD POST - FUNCTION
  const addPost = (event) => {
    event.preventDefault()
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
    setPostBrowserValue('')
  }

  // SEARCHED POST RESULT HANDLER
  const searchedPostResultHandler = (event) => {
    event.preventDefault()
    setSearchedPostTrigger(true)
    setSearchedPostToggler(!searchedPostToggler)
    if (postBrowserValue === '') {
      setProfileInputInfo(
        'Date field cannot be empty, enter date and find post that you looking for',
      )
    }
  }

  // JSX
  return (
    <>
      <form className="profile-input-container" onSubmit={addPost}>
        <input
          type="text"
          placeholder="write some post"
          value={postContent}
          onChange={(event) => setPostContent(event.target.value)}
          className="input-container-text-input"
        />

        <button className="input-container-button" onClick={addPost}>
          <i className="fas fa-pen-alt"></i>
        </button>
      </form>

      <form className="profile-input-container" onSubmit={searchedPostResultHandler}>
        <input
          type="date"
          placeholder="search posts"
          value={postBrowserValue}
          onChange={(event) => setPostBrowserValue(event.target.value)}
          className="input-container-text-input"
        />

        <button
          className="input-container-button"
          onClick={searchedPostResultHandler}
        >
          <i className="fas fa-search"></i>
        </button>

        {/* SEARCHED POST RESULT */}
        {searchedPostTrigger && <SearchedPost />}
      </form>
    </>
  )
}

export default ProfileInput
