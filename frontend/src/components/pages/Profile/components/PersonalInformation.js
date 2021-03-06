import React, { useState, useContext, useEffect } from "react"
import { Card, Form, Button, Col } from "react-bootstrap"
import AuthContext from "../../../../context/Auth/AuthContext"
import ProfileContext from "../../../../context/Profile/ProfileContext"
export const PersonalInformation = () => {
  const authContext = useContext(AuthContext)
  const profileContext = useContext(ProfileContext)
  const { user, loadUser } = authContext
  const { updateProfile } = profileContext
  const [edit, setEdit] = useState(false)
  const [validated, setValidated] = useState(false)
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [bio, setBio] = useState("")
  const [email, setEmail] = useState("")
  const handleEdit = (e) => {
    setEdit(!edit)
  }
  useEffect(() => {
    if (user) {
      setName(user.name)
      setAge(user.age)
      setEmail(user.email)
      setBio(user.bio)
    }
  }, [user])
  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    if (form.checkValidity()) {
      await updateProfile(user._id, { name, age, bio })
      await loadUser()
      setEdit(!edit)
    }
  }
  return (
    <>
      <div className="tabContent" id="PersonalInformation">
        <Card className="p-3">
          <Card.Title>
            Personal Information
            <Button
              type="button"
              className=" btn btn-sm btn-light bg-white text-primary float-right"
              onClick={handleEdit}
            >
              {!edit ? <span>Edit</span> : <span> Cancel</span>}
            </Button>
          </Card.Title>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Row>
                  <Form.Group as={Col} md={5}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      id="name"
                      value={name}
                      disabled={!edit}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your name
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md={2}>
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      value={age}
                      id="age"
                      onChange={(e) => setAge(e.target.value)}
                      disabled={!edit}
                    />
                    <Form.Control.Feedback type="invalid">
                      Age is required
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
              </Form.Group>

              <Form.Group>
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  as="textarea"
                  rows="3"
                  disabled={!edit}
                />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    disabled
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                  />
                  <Form.Control.Feedback type="invalid">
                    Enter a valid email address
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>

              <Button variant="primary" type="submit" disabled={!edit}>
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}
