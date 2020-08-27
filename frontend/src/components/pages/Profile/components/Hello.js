import React, { useContext } from "react"
import { Card } from "react-bootstrap"
import AuthContext from "../../../../context/Auth/AuthContext"
export const Hello = () => {
  const { user, loading } = useContext(AuthContext)

  if (user == null) {
    return ""
  }

  return (
    <div className='Hello mb-3'>
      <Card>
        <Card.Body>
          <h6>Hello, {user.role === 1 && <span>Author</span>}</h6>
          <h5>{user.name}</h5>
        </Card.Body>
      </Card>
    </div>
  )
}
