import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../../../tools/CreateContext'
import axios from 'axios'

const ProfileData = () => {
  // LOCAL STATE
  const [profileAvatar, setProfileAvatar] = useState('')
  const [profileName, setProfileName] = useState('')
  const [profileEmail, setProfileEmail] = useState('')

  // GLOBAL CONTEXT
  const { isLogged, headerConfigAuth } = useContext(GlobalContext)

  // PROFILE DATA EFFECT
  useEffect(() => {
    if (isLogged) {
      axios
        .post(
          'https://akademia108.pl/api/social-app/user/profile',
          JSON.stringify(),
          headerConfigAuth,
        )
        .then((res) => {
          setProfileName(res.data.username)
          setProfileEmail(res.data.email)
          setProfileAvatar(res.data.avatar_url)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [isLogged])

  // JSX
  return (
    <div className="profile__data">
      <img
        src={profileAvatar}
        alt="profile_avatar"
        className="profile__data-avatar"
      />
      <p className="profile__data-name">{profileName}</p>
      <p className="profile__data-email">{profileEmail}</p>
    </div>
  )
}

export default ProfileData
