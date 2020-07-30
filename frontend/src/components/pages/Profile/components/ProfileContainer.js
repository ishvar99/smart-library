import React from "react"
import { PersonalInformation } from "./PersonalInformation"
import { MyPlans } from "./MyPlans"
import { MyWishlist } from "./MyWishlist"
import { MyTransactions } from "./MyTransactions"

export const ProfileContainer = () => {
  return (
    <div>
      <PersonalInformation />
      <MyPlans />
      <MyTransactions />
      <MyWishlist />
    </div>
  )
}
