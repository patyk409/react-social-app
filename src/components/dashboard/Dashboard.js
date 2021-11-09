import React from 'react'
import './Dashboard.css'

// COMPONENTS
import DashboardProfile from './dashboard-profile/DashboardProfile'
import DashboardUsers from './dashboard-users/DashboardUsers'

const Dashboard = () => {
  // JSX
  return (
    <aside className="dashboard">
      {/* PROFILE */}
      <DashboardProfile />

      {/* USERS */}
      <DashboardUsers />
    </aside>
  )
}

export default Dashboard
