import React, { useContext } from 'react'
import axios from 'axios'
import '../../../styles/components/dashboard/dashboard-users/DashboardUsers.scss'

// COMPONENTS
import UsersRecommended from './UsersRecommended'
import UsersInput from '../dashboard-users/UsersInput'

import { GlobalContext } from '../../../context/CreateContext'

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

  // FOLLOW USER - FUNCTION
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
    <div className="dashboard-recommendations">
      <h3 className="recommendations-header">
        You may follow
        <i className="fas fa-users recommendations-header-icon"></i>
      </h3>
      {/* USERS RECOMMENDED */}
      <UsersRecommended followUser={followUser} />

      <h3 className="recommendations-header">
        Social Club
        <i className="fas fa-icons recommendations-header-icon"></i>
      </h3>
      {/* USERS INPUTS */}
      <UsersInput followUser={followUser} />
    </div>
  )
}

export default DashboardUsers
