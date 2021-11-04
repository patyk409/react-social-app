import React, { useState, useEffect } from 'react'
import './AllFollowed.css'
import axios from 'axios'

import FollowedList from './FollowedList'
import CloserLink from '../../CloserLink'

const AllFollowed = (props) => {
  /*
   * array state initialization with all followed users
   */
  const [allFollowedState, setAllFollowedState] = useState([])

  /*
   * effect that gets users data from api and maintains all followed users in the state of array
   */
  useEffect(() => {
    if (props.userToken) {
      axios
        .post(
          'https://akademia108.pl/api/social-app/follows/allfollows',
          JSON.stringify(),
          props.headerConfigAuth,
        )
        .then((res) => {
          setAllFollowedState(res.data)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [props.followToggler])

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
        allFollowedState={allFollowedState}
        unfollowUser={props.unfollowUser}
      />
      {allFollowedState.length === 0 ? (
        <p className="all-followed__info">
          Seems like you don't follow anyone...
        </p>
      ) : null}
      <CloserLink />
    </div>
  )
}

export default AllFollowed
