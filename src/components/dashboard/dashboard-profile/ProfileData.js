import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import '../../../styles/components/dashboard/dashboard-profile/ProfileData.scss'

import { GlobalContext } from '../../../context/CreateContext'

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
    <div className="profile-data">
      <img
        src={profileAvatar}
        alt="profile_avatar"
        className="profile-avatar"
      />

      <p className="profile-name">{profileName}</p>
      <p className="profile-email">{profileEmail}</p>
    </div>
  )
}

export default ProfileData
