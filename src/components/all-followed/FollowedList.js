import React, { useContext } from 'react'
import axios from 'axios'
import './FollowedList.css'

import { GlobalContext } from '../../tools/CreateContext'

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
    <ul className="all-followed__list">
      {props.allFollowed.map((user) => {
        return (
          <li className="all-followed__list-item" key={user.id}>
            <img
              src={user.avatar_url}
              alt="user_avatar"
              className="list-item__img"
            />

            <div className="list-item__data">
              <p className="data__name">{user.username}</p>
              <p className="data__email">{user.email}</p>
            </div>

            <div
              className="unfollow-icon"
              onClick={() => {
                unfollowUser(user.id)
              }}
              tabIndex="0"
            >
              <i className="fas fa-minus all-followed__unfollow-icon"></i>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default FollowedList
