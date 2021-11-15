import React, { useState, useContext } from 'react'
import axios from 'axios'
import '../../../styles/components/dashboard/DashboardInput.scss'

// COMPONENTS
import SearchedUser from '../dashboard-users/searched-user/SearchedUser'

import { GlobalContext } from '../../../context/CreateContext'

const UsersInput = (props) => {
  // LOCAL STATE
  const [searchedUserAvatar, setSearchedUserAvatar] = useState('')
  const [searchedUserName, setSearchedUserName] = useState('')
  const [searchedUserEmail, setSearchedUserEmail] = useState('')

  const [searchedUserByNameContent, setSearchedUserByNameContent] = useState('')
  const [searchedUserByEmailContent, setSearchedUserByEmailContent] = useState(
    '',
  )

  const [searchedUserId, setSearchedUserId] = useState('')
  const [usersInputInfo, setUsersInputInfo] = useState('')

  // GLOBAL CONTEXT
  const {
    headerConfigAuth,
    searchedUserTrigger,
    setSearchedUserTrigger,
  } = useContext(GlobalContext)

  // SEARCH FRIEND BY NAME
  const searchFriendByName = (event) => {
    event.preventDefault()

    if (searchedUserByNameContent === '') {
      setSearchedUserTrigger(true)
      setUsersInputInfo(
        'Name field cannot be empty, type exact name and find your friend',
      )
    } else {
      axios
        .post(
          'https://akademia108.pl/api/social-app/user/check-username',
          JSON.stringify({
            username: searchedUserByNameContent,
          }),
          headerConfigAuth,
        )
        .then((res) => {
          setSearchedUserName(res.data.username)
          setSearchedUserEmail(res.data.email)
          setSearchedUserAvatar(res.data.avatar_url)
          setUsersInputInfo(res.data.message)
          setSearchedUserId(res.data.id)
          setSearchedUserTrigger(true)
        })
        .catch((err) => {
          console.error(err)
        })
      setSearchedUserByNameContent('')
    }
  }

  // SEARCH FRIEND BY E-MAIL
  const searchFriendByEmail = (event) => {
    event.preventDefault()

    if (searchedUserByEmailContent === '') {
      setUsersInputInfo(
        'Email field cannot be empty, type correct address and find your friend',
      )
      setSearchedUserTrigger(true)
    } else {
      axios
        .post(
          'https://akademia108.pl/api/social-app/user/check-email',
          JSON.stringify({
            email: searchedUserByEmailContent,
          }),
          headerConfigAuth,
        )
        .then((res) => {
          setSearchedUserName(res.data.username)
          setSearchedUserEmail(res.data.email)
          setSearchedUserAvatar(res.data.avatar_url)
          setUsersInputInfo(res.data.message)
          setSearchedUserId(res.data.id)
          setSearchedUserTrigger(true)
        })
        .catch((err) => {
          console.error(err)
        })
      setSearchedUserByEmailContent('')
    }
  }

  // JSX
  return (
    <>
      <form className="recommendations-input-container" onSubmit={searchFriendByName}>
        <input
          type="text"
          placeholder="search user by name"
          value={searchedUserByNameContent}
          onChange={(event) => setSearchedUserByNameContent(event.target.value)}
          className="input-container-text-input"
        />

        <button className="input-container-button" onClick={searchFriendByName}>
          <i className="fas fa-user-alt"></i>
        </button>
      </form>

      <form className="recommendations-input-container" onSubmit={searchFriendByEmail}>
        <input
          type="email"
          placeholder="search user by email"
          value={searchedUserByEmailContent}
          onChange={(event) =>
            setSearchedUserByEmailContent(event.target.value)
          }
          className="input-container-text-input"
        />

        <button className="input-container-button" onClick={searchFriendByEmail}>
          <i className="fas fa-at"></i>
        </button>

        {/* SEARCHED USER RESULT */}
        {searchedUserTrigger && (
          <SearchedUser
            searchedUserAvatar={searchedUserAvatar}
            searchedUserName={searchedUserName}
            searchedUserEmail={searchedUserEmail}
            searchedUserId={searchedUserId}
            usersInputInfo={usersInputInfo}
            followUser={props.followUser}
          />
        )}
      </form>
    </>
  )
}

export default UsersInput
