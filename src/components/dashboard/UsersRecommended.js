import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../../tools/CreateContext'
import axios from 'axios'

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
      {recommendedUsers.map((user) => {
        return (
          <li
            className="recommendations-list__recommendations-item"
            key={user.id}
          >
            <img
              src={user.avatar_url}
              alt="user_avatar"
              className="recommendations__data-avatar"
            />
            <div className="recommendations-item__data">
              <p className="recommendations__data-name">{user.username}</p>
              <p className="recommendations__data-email">{user.email}</p>
            </div>

            <div
              className="follow-icon"
              onClick={() => {
                props.followUser(user.id)
              }}
              tabIndex="0"
            >
              <i className="fas fa-plus recommendations-list__follow-icon"></i>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default UsersRecommended
