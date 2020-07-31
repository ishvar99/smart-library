import React, { useEffect, useContext } from "react"
import "./profile.scss"
import { Hello } from "./components/Hello"
import { ProfileSidebar } from "./components/ProfileSidebar"
import { ProfileContainer } from "./components/ProfileContainer"
import AuthContext from "../../../context/Auth/AuthContext"
export const Profile = () => {
  const context = useContext(AuthContext)
  const { user, loading, loadUser } = context
  useEffect(() => {
    async function getUser() {
      await loadUser()
    }
    getUser()
  }, [])
  return (
    <div className="Profile container my-3">
      <div className="row">
        <div className="col-lg-3">
          <Hello />
          <ProfileSidebar />
        </div>
        <div className="col-lg-9">
          <ProfileContainer />
        </div>
      </div>
    </div>
  )
}
