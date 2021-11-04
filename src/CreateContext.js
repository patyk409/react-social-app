// import { createContext } from 'react'

// export const GlobalContext = createContext(null)

import React, { useState, createContext } from 'react'

export const GlobalContext = createContext(null)

export const ContextProvider = (props) => {
  const [userToken, setUserToken] = useState(localStorage.getItem('jwt_token'))

  const [followToggler, setFollowToggler] = useState(false)

  const [postBrowserByDate, setPostBrowserByDate] = useState('')

  const [searchedPostResult, setSearchedPostResult] = useState([])
  const [searchedUserTrigger, setSearchedUserTrigger] = useState(false)
  const [searchedPostTrigger, setSearchedPostTrigger] = useState(false)
  const [postTrigger, setPostTrigger] = useState(false)

  const [downbarDisplay, setDownbarDisplay] = useState(false)
  const [downbarContent, setDownbarContent] = useState('')

  const [confirmationPopup, setConfirmationPopup] = useState(false)

  const [postId, setPostId] = useState(null)

  // AXIOS HEADER CONFIGURATION
  const headerConfig = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }

  // AXIOS HEADER CONFIGURATION WITH AUTHENTICATION
  const headerConfigAuth = {
    headers: {
      headerConfig,
      Authorization: 'Bearer ' + localStorage.getItem('jwt_token'),
    },
  }

  return (
    <GlobalContext.Provider
      value={[
        userToken,
        setUserToken,
        headerConfig,
        headerConfigAuth,
        downbarContent,
        setDownbarContent,
        downbarDisplay,
        setDownbarDisplay,
        searchedPostTrigger,
        setSearchedPostTrigger,
        postBrowserByDate,
        setPostBrowserByDate,
        searchedPostResult,
        setSearchedPostResult,
        confirmationPopup,
        setConfirmationPopup,
        postId,
        setPostId,
        postTrigger,
        setPostTrigger,
        followToggler,
        setFollowToggler,
        searchedUserTrigger,
        setSearchedUserTrigger,
      ]}
    >
      {props.children}
    </GlobalContext.Provider>
  )
}
