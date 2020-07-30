import React from "react"
import { ListGroup } from "react-bootstrap"

export const ProfileSidebar = ({ handleTabEvent }) => {
  return (
    <div className='tab'>
      <ListGroup>
        <ListGroup.Item
          disabled
          className='bg-primary text-white font-weight-bold'
        >
          Profile
        </ListGroup.Item>
        <ListGroup.Item
          className='tab-link active'
          onClick={(e) => handleTabEvent(e, "PersonalInformation")}
        >
          Personal Information
        </ListGroup.Item>
        <ListGroup.Item
          className='tab-link'
          onClick={(e) => handleTabEvent(e, "MyPlans")}
        >
          My Plans
        </ListGroup.Item>
        <ListGroup.Item
          className='tab-link'
          onClick={(e) => handleTabEvent(e, "MyTransactions")}
        >
          My Transactions
        </ListGroup.Item>
        <ListGroup.Item
          className='tab-link'
          onClick={(e) => handleTabEvent(e, "MyWishlist")}
        >
          My Wishlist
        </ListGroup.Item>
        <ListGroup.Item>Logout</ListGroup.Item>
      </ListGroup>
    </div>
  )
}
