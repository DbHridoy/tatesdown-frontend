import React from 'react'
import RecentJobActivity from '../../ProductionComponents/RecentJobActivity/RecentJobActivity'
import DashboardOverview from '../../ProductionComponents/DashboardOverview/DashboardOverview'

const ProductionHome = () => {
  return (
    <div>
        <DashboardOverview/>
        <RecentJobActivity/>
      
    </div>
  )
}

export default ProductionHome
