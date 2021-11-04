import React, { useState, useContext } from 'react'
import { GlobalContext } from './CreateContext'
import axios from 'axios'
import SearchedUser from './SearchedUser'

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
  const searchFriendByName = () => {
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
  const searchFriendByEmail = () => {
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
      <div className="recommendations__input-box">
        <input
          type="text"
          placeholder="search user by name"
          value={searchedUserByNameContent}
          onChange={(event) => setSearchedUserByNameContent(event.target.value)}
          className="input-box__text-input"
        />

        <button className="input-box__button" onClick={searchFriendByName}>
          <i className="fas fa-user-alt input-box__button-icon"></i>
        </button>

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
      </div>

      <div className="recommendations__input-box">
        <input
          type="email"
          placeholder="search user by email"
          value={searchedUserByEmailContent}
          onChange={(event) =>
            setSearchedUserByEmailContent(event.target.value)
          }
          className="input-box__text-input"
        />

        <button className="input-box__button" onClick={searchFriendByEmail}>
          <i className="fas fa-at input-box__button-icon"></i>
        </button>
      </div>
    </>
  )
}

export default UsersInput
