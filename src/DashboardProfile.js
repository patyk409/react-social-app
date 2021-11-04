import React from 'react'

// COMPONENTS
import ProfileData from './ProfileData'
import ProfileInput from './ProfileInput'

const DashboardProfile = () => {
  // JSX
  return (
    <div className="dashboard__profile">
      <h3 className="profile__header">
        Your profile
        <i className="far fa-id-card profile__header-icon"></i>
      </h3>
      {/* PROFILE DATA */}
      <ProfileData />
      {/* PROFILE INPUTS */}
      <ProfileInput />
    </div>
  )
}

export default DashboardProfile
