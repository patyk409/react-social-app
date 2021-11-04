import React, { useContext } from 'react'
import { GlobalContext } from './CreateContext'
import axios from 'axios'

import UsersRecommended from './UsersRecommended'
import UsersInput from './UsersInput'

const DashboardUsers = () => {
  // GLOBAL CONTEXT
  const {
    headerConfigAuth,
    followToggler,
    setFollowToggler,
    setDownbarDisplay,
    setDownbarContent,
    setSearchedUserTrigger,
  } = useContext(GlobalContext)

  // FOLLOW USER - METHOD
  const followUser = (id) => {
    axios
      .post(
        'https://akademia108.pl/api/social-app/follows/follow',
        JSON.stringify({
          leader_id: id,
        }),
        headerConfigAuth,
      )
      .then(() => {
        setFollowToggler(!followToggler)
        setSearchedUserTrigger(false)
        setDownbarDisplay(true)
        setDownbarContent('Follow has been added')
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <div className="dashboard__recommendations">
      <h3 className="recommendations__header">
        You may follow
        <i className="fas fa-users recommendations__header-icon"></i>
      </h3>
      {/* USERS RECOMMENDED */}
      <UsersRecommended followUser={followUser} />
      <h3 className="recommendations__header">
        Social Club
        <i className="fas fa-icons recommendations__header-icon"></i>
      </h3>
      {/* USERS INPUTS */}
      <UsersInput followUser={followUser} />
    </div>
  )
}

export default DashboardUsers
