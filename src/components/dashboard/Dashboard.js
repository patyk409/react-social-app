import React from 'react'
import './Dashboard.css'

import DashboardProfile from './dashboard-profile/DashboardProfile'
import DashboardUsers from './dashboard-users/DashboardUsers'

const Dashboard = () => {
  // JSX
  return (
    <aside className="dashboard">
      <DashboardProfile />
      <DashboardUsers />
    </aside>
  )
}

export default Dashboard
