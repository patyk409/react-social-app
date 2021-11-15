import React from 'react'
import '../../../styles/components/dashboard/dashboard-profile/DashboardProfile.scss'

// COMPONENTS
import ProfileData from '../dashboard-profile/ProfileData'
import ProfileInput from '../dashboard-profile/ProfileInput'

const DashboardProfile = () => {
  // JSX
  return (
    <div className="dashboard-profile">
      <h3 className="profile-header">
        Your profile
        <i className="far fa-id-card profile-header-icon"></i>
      </h3>
      {/* PROFILE DATA */}
      <ProfileData />

      {/* PROFILE INPUTS */}
      <ProfileInput />
    </div>
  )
}

export default DashboardProfile
