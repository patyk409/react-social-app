import React from 'react'
import '../../styles/components/dashboard/Dashboard.scss'

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
