import React from 'react'
import './FollowedList.css'

const FollowedListItem = (props) => {
  /*
   * jsx
   */
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
                props.unfollowUser(user.id)
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

export default FollowedListItem
