import React from "react"
import { Card } from "react-bootstrap"
export const Hello = () => {
  return (
    <div className='Hello mb-3'>
      <Card>
        <Card.Body>
          <h6>Hello,</h6>
          <h5>Reader</h5>
        </Card.Body>
      </Card>
    </div>
  )
}
