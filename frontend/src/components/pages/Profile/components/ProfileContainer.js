import React from "react"
import { PersonalInformation } from "./PersonalInformation"
import { MyPlans } from "./MyPlans"

export const ProfileContainer = () => {
  return (
    <div>
      <PersonalInformation className='tabContent' id='PersonalInformation' />
      <MyPlans className='tabContent' id='MyPlans' />
    </div>
  )
}
