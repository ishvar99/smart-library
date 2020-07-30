import React from "react"
import { Card } from "react-bootstrap"

export const MyTransactions = () => {
  return (
    <div className='tabContent' id='MyTransactions' style={{ display: "none" }}>
      <Card className='profile-card-div'>No transactions made yet</Card>
    </div>
  )
}
