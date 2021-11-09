import React, { useState, createContext } from 'react'

// EXPORT CREATE CONTEXT
export const GlobalContext = createContext(null)

// EXPORT CONTEXT PROVIDER
export const ContextProvider = (props) => {
  // LOCAL STATE
  const [isLogged, setIsLogged] = useState(localStorage.getItem('jwt_token'))
  
  const [loginDisplay, setLoginDisplay] = useState(false)

  const [followToggler, setFollowToggler] = useState(false)
  const [postToggler, setPostToggler] = useState(false)
  
  const [downbarDisplay, setDownbarDisplay] = useState(false)
  const [downbarContent, setDownbarContent] = useState('')

  const [postBrowserValue, setPostBrowserValue] = useState('')

  const [searchedPostResult, setSearchedPostResult] = useState([])
  const [searchedPostTrigger, setSearchedPostTrigger] = useState(false)
  const [searchedUserTrigger, setSearchedUserTrigger] = useState(false)

  const [confirmationDisplay, setConfirmationDisplay] = useState(false)

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

  // JSX
  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        headerConfig,
        headerConfigAuth,
        loginDisplay,
        setLoginDisplay,
        downbarContent,
        setDownbarContent,
        downbarDisplay,
        setDownbarDisplay,
        searchedPostTrigger,
        setSearchedPostTrigger,
        postBrowserValue,
        setPostBrowserValue,
        searchedPostResult,
        setSearchedPostResult,
        confirmationDisplay,
        setConfirmationDisplay,
        postId,
        setPostId,
        postToggler,
        setPostToggler,
        followToggler,
        setFollowToggler,
        searchedUserTrigger,
        setSearchedUserTrigger,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  )
}
