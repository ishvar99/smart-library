import React from "react"
import "./profile.scss"
import { Hello } from "./components/Hello"
import { ProfileSidebar } from "./components/ProfileSidebar"
import { MyPlans } from "./components/MyPlans"
import { PersonalInformation } from "./components/PersonalInformation"
import { ProfileContainer } from "./components/ProfileContainer"

export const Profile = () => {
  const handleTabEvent = (event, tabName) => {
    let i, tabcontent, tablinks
    tabcontent = document.getElementsByClassName("tabContent")
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none"
    }
    tablinks = document.getElementsByClassName("tab-link")
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "")
    }
    document.getElementById(tabName).style.display = "block"
    event.currentTarget.className += " active"
  }
  return (
    <div className='Profile container my-3'>
      <div className='row'>
        <div className='col-lg-3'>
          <Hello />
          <ProfileSidebar handleTabEvent={handleTabEvent} />
        </div>
        <div className='col-lg-9'>
          <ProfileContainer />
        </div>
      </div>
    </div>
  )
}
