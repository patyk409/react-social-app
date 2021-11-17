import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import '../../../styles/components/dashboard/dashboard-users/UsersRecommended.scss'

import { GlobalContext } from '../../../context/CreateContext'

const UsersRecommended = (props) => {
  // LOCAL STATE
  const [recommendedUsers, setRecommendedUsers] = useState([])

  // GLOBAL CONTEXT
  const { isLogged, headerConfigAuth, followToggler } = useContext(
    GlobalContext,
  )

  // RECOMMENDED USERS EFFECT
  useEffect(() => {
    if (isLogged) {
      axios
        .post(
          'https://akademia108.pl/api/social-app/follows/recommendations',
          JSON.stringify(),
          headerConfigAuth,
        )
        .then((res) => {
          setRecommendedUsers(res.data)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [followToggler, isLogged])

  // JSX
  return (
    <ul className="recommendations-list">
      {recommendedUsers.length === 0 ? (
        <div className="recommendations-info-container">
          <p className="recommendations-info">
            Seems like there is no more users you may follow...
          </p>
        </div>
      ) : (
        recommendedUsers.map((user) => {
          return (
            <li className="recommendations-list-item" key={user.id}>
              <img
                src={user.avatar_url}
                alt="user_avatar"
                className="recommended-user-avatar"
              />

              <div className="recommended-user-data">
                <p className="recommended-user-name">{user.username}</p>
                <p className="recommended-user-email">{user.email}</p>
              </div>

              <div
                className="follow-icon"
                onClick={() => {
                  props.followUser(user.id)
                }}
                tabIndex="0"
              >
                <i className="fas fa-plus"></i>
              </div>
            </li>
          )
        })
      )}
    </ul>
  )
}

export default UsersRecommended
