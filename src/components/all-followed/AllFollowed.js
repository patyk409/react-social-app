import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import '../../styles/components/all-followed/AllFollowed.scss'

// COMPONENTS
import FollowedList from './FollowedList'

import CloserLink from '../../utilities/CloserLink'
import { GlobalContext } from '../../context/CreateContext'

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
  }, [isLogged, followToggler])

  // JSX
  return (
    <div className="all-followed">
      <h3 className="all-followed-header">
        Followed
        <i className="fas fa-user-friends header-icon"></i>
      </h3>
      {/* ALL FOLLOWED LIST */}
      <FollowedList allFollowed={allFollowed} />
      {allFollowed.length === 0 && (
        <p className="all-followed-info">
          Seems like you don't follow anyone...
        </p>
      )}

      {/* CLOSER LINK */}
      <CloserLink />
    </div>
  )
}

export default AllFollowed
