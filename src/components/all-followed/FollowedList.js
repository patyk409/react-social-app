import React, { useContext } from 'react'
import axios from 'axios'
import '../../styles/components/all-followed/FollowedList.scss'

import { GlobalContext } from '../../context/CreateContext'

const FollowedList = (props) => {
  // GLOBAL CONTEXT
  const {
    headerConfigAuth,
    setDownbarContent,
    setDownbarDisplay,
    followToggler,
    setFollowToggler,
  } = useContext(GlobalContext)

  // UNFOLLOW USER - FUNCTION
  const unfollowUser = (id) => {
    axios
      .post(
        'https://akademia108.pl/api/social-app/follows/disfollow',
        JSON.stringify({
          leader_id: id,
        }),
        headerConfigAuth,
      )
      .then((res) => {
        setFollowToggler(!followToggler)
        setDownbarDisplay(true)
        setDownbarContent('Follow has been removed')
      })
      .catch((err) => {
        console.error(err)
      })
  }

  // JSX
  return (
    <ul className="all-followed-list">
      {props.allFollowed.map((user) => {
        return (
          <li className="followed-list-item" key={user.id}>
            <img
              src={user.avatar_url}
              alt="user_avatar"
              className="followed-user-avatar"
            />

            <div className="followed-user-data">
              <p className="followed-user-name">{user.username}</p>
              <p className="followed-user-email">{user.email}</p>
            </div>

            <div
              className="unfollow-icon"
              onClick={() => {
                unfollowUser(user.id)
              }}
              tabIndex="0"
            >
              <i className="fas fa-minus"></i>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default FollowedList
