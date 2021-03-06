import React, { useContext } from "react"
import { ListGroup } from "react-bootstrap"
import AuthContext from "../../../../context/Auth/AuthContext"
import { useHistory } from "react-router-dom"
export const ProfileSidebar = () => {
  const context = useContext(AuthContext)
  const history = useHistory()
  const logoutUser = async () => {
    await context.logout()
    history.push("/")
  }
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
    <div className="tab mb-3">
      <ListGroup>
        <ListGroup.Item
          disabled
          className="bg-primary text-white font-weight-bold"
        >
          Profile
        </ListGroup.Item>
        <ListGroup.Item
          className="tab-link active"
          onClick={(e) => handleTabEvent(e, "PersonalInformation")}
        >
          Personal Information
        </ListGroup.Item>
        <ListGroup.Item
          className="tab-link"
          onClick={(e) => handleTabEvent(e, "MyPlans")}
        >
          My Plans
        </ListGroup.Item>
        <ListGroup.Item
          className="tab-link"
          onClick={(e) => handleTabEvent(e, "MyTransactions")}
        >
          My Transactions
        </ListGroup.Item>
        <ListGroup.Item
          className="tab-link"
          onClick={(e) => handleTabEvent(e, "MyWishlist")}
        >
          My Wishlist
        </ListGroup.Item>
        <ListGroup.Item onClick={logoutUser}>Logout</ListGroup.Item>
      </ListGroup>
    </div>
  )
}
