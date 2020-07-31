import React, { useState, useContext, useEffect } from "react"
import { Card, Form, Button, Col } from "react-bootstrap"
import axios from "axios"
import AuthContext from "../../../../context/Auth/AuthContext"
export const PersonalInformation = () => {
  const context = useContext(AuthContext)
  const { user } = context
  const [validated, setValidated] = useState(false)
  const [disabledStatus, setDisabledStatus] = useState(true)
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [email, setEmail] = useState("")
  useEffect(() => {
    if (user) {
      setName(user.name)
      setAge(user.age)
      setEmail(user.email)
    }
  }, [user])
  const handleSubmit = async (event) => {
    setDisabledStatus(true)
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    try {
      const response = await axios.put(
        `/api/v1/user/${user._id}`,
        JSON.stringify({ name, age }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    } catch (e) {
      console.log(e)
    }
  }
  const enableEdit = () => {
    setDisabledStatus(false)
  }
  return (
    <div className="tabContent" id="PersonalInformation">
      <Card className="p-3">
        <Card.Title>
          Personal Information
          <span
            className="edit-text text-primary float-right"
            onClick={enableEdit}
          >
            {" "}
            Edit
          </span>
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
                    disabled={disabledStatus}
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
                    disabled={disabledStatus}
                  />
                  <Form.Control.Feedback type="invalid">
                    Age is required
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
            </Form.Group>

            <Form.Group>
              <Form.Label>Bio</Form.Label>
              <Form.Control as="textarea" rows="3" disabled={disabledStatus} />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  disabled={disabledStatus}
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

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}
