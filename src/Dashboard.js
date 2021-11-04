import React from 'react'
import './Dashboard.css'

import DashboardProfile from './DashboardProfile'
import DashboardUsers from './DashboardUsers'

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
