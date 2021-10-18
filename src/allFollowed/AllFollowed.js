import React from 'react'
import './AllFollowed.css'

import FollowedList from './FollowedList'
import CloserLink from '../CloserLink'

const AllFollowed = (props) => {
  /*
   * jsx
   */
  return (
    <div className="all-followed">
      <h3 className="all-followed__header">
        Followed
        <i className="fas fa-user-friends all-followed__header-icon"></i>
      </h3>
      <FollowedList
        allFollowed={props.allFollowed}
        unfollowUser={props.unfollowUser}
      />
      {props.allFollowed.length === 0 ? (
        <p className="all-followed__info">
          Seems like you don't follow anyone...
        </p>
      ) : null}
      <CloserLink />
    </div>
  )
}

export default AllFollowed
