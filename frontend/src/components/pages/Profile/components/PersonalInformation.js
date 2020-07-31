import React, { useState, useContext, useEffect } from "react"
import { Card, Form, Button, Col } from "react-bootstrap"
import axios from "axios"
import AuthContext from "../../../../context/Auth/AuthContext"
export const PersonalInformation = () => {
  const context = useContext(AuthContext)
  const { user } = context
  const [edit, setEdit] = useState(false)
  const [validated, setValidated] = useState(false)
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [email, setEmail] = useState("")
  const handleEdit = (e) => {
    setEdit(!edit)
  }
  useEffect(() => {
    if (user) {
      setName(user.name)
      setAge(user.age)
      setEmail(user.email)
    }
  }, [user])
  const handleSubmit = async (event) => {
    event.preventDefault()

    const form = event.currentTarget
    console.log(form.checkValidity())
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    if (form.checkValidity()) {
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
        setEdit(!edit)
      } catch (e) {
        console.log(e)
      }
    }
  }
  return (
    <div className='tabContent' id='PersonalInformation'>
      <Card className='p-3'>
        <Card.Title>
          Personal Information
          <Button
            type='button'
            className=' btn btn-sm btn-light bg-white text-primary float-right'
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
                    type='text'
                    id='name'
                    value={name}
                    disabled={!edit}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Form.Control.Feedback type='invalid'>
                    Please enter your name
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md={2}>
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    required
                    type='number'
                    value={age}
                    id='age'
                    onChange={(e) => setAge(e.target.value)}
                    disabled={!edit}
                  />
                  <Form.Control.Feedback type='invalid'>
                    Age is required
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
            </Form.Group>

            <Form.Group>
              <Form.Label>Bio</Form.Label>
              <Form.Control as='textarea' rows='3' disabled={!edit} />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  disabled={!edit}
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id='email'
                />
                <Form.Control.Feedback type='invalid'>
                  Enter a valid email address
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Button variant='primary' type='submit' disabled={!edit}>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}
