import React from 'react'
import './FollowedList.css'
import axios from 'axios'

const FollowedList = (props) => {
  /*
   * removes user from the array of followed users and puts it back into recommendation list
   */
  const unfollowUser = (id) => {
    axios
      .post(
        'https://akademia108.pl/api/social-app/follows/disfollow',
        JSON.stringify({
          leader_id: id,
        }),
        props.headerConfigAuth,
      )
      .then((res) => {
        props.setFollowToggler(!props.followToggler)
        // props.setMessageTrigger(true)
        // props.setMessage('Follow has been removed')
        console.log('unfollow response: ', res)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  /*
   * jsx
   */
  return (
    <ul className="all-followed__list">
      {props.allFollowedState.map((user) => {
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
