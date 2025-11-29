import React from 'react'
import PipelineOverview from '../../Components/Dashboard/PipelineOverview'
import PendingApprovals from '../../Components/Dashboard/PendingApprovals'
import CardData from '../../Components/Dashboard/CardData'

const Dashboard = () => {
  return (
    <div>
      <CardData/>
      <PipelineOverview/>
      <PendingApprovals/>
    </div>
  )
}

export default Dashboard
