import React from "react"
import { Card } from "react-bootstrap"

export const MyWishlist = () => {
  return (
    <div className='tabContent' id='MyWishlist' style={{ display: "none" }}>
      <Card className='profile-card-div'>Your wishlist is empty</Card>
    </div>
  )
}
