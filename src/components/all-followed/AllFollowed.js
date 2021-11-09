import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import './AllFollowed.css'

// COMPONENTS
import FollowedList from './FollowedList'

import CloserLink from '../../utilities/CloserLink'
import { GlobalContext } from '../../tools/CreateContext'

const AllFollowed = () => {
  // LOCAL STATE
  const [allFollowed, setAllFollowed] = useState([])

  // GLOBAL CONTEXT
  const { isLogged, headerConfigAuth, followToggler } = useContext(
    GlobalContext,
  )

  // ALL FOLLOWED USERS EFFECT
  useEffect(() => {
    if (isLogged) {
      axios
        .post(
          'https://akademia108.pl/api/social-app/follows/allfollows',
          JSON.stringify(),
          headerConfigAuth,
        )
        .then((res) => {
          setAllFollowed(res.data)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [followToggler])

  // JSX
  return (
    <div className="all-followed">
      <h3 className="all-followed__header">
        Followed
        <i className="fas fa-user-friends all-followed__header-icon"></i>
      </h3>
      <FollowedList allFollowed={allFollowed} />
      {allFollowed.length === 0 && (
        <p className="all-followed__info">
          Seems like you don't follow anyone...
        </p>
      )}
      <CloserLink />
    </div>
  )
}

export default AllFollowed
