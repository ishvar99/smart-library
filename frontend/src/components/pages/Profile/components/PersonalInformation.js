import React, { useState } from "react"
import { Card, Form, Button, Col } from "react-bootstrap"

export const PersonalInformation = () => {
  const [edit, setEdit] = useState(false)
  const [validated, setValidated] = useState(false)

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    setValidated(true)
  }

  const handleEdit = (e) => {
    setEdit(!edit)
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
                  <Form.Control required type='text' disabled={!edit} />
                  <Form.Control.Feedback type='invalid'>
                    Please enter your name
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md={2}>
                  <Form.Label>Age</Form.Label>
                  <Form.Control required type='number' disabled={!edit} />
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
                <Form.Control required disabled={!edit} type='email' />
                <Form.Control.Feedback type='invalid'>
                  Enter a valid email address
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Button disabled={!edit} variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}
