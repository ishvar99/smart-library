import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import axios from "axios"

export const Login = () => {
  const [inputvalue, setinputvalue] = useState({
    email: "",
    password: "",
  })
  const [errorMsg, seterrorMsg] = useState({
    status: false,
    color: "",
    msg: "",
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    seterrorMsg({
      status: false,
      color: "",
      msg: "",
    })
    setinputvalue({
      ...inputvalue,
      [name]: value,
    })
  }

  const formData = {
    email: inputvalue.email,
    password: inputvalue.password,
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    try {
      const uri = "api/v1/auth/login"
      const response = await axios.post(uri, formData)
      console.log(response)
    } catch (error) {
      console.log(error.response)
      seterrorMsg({
        status: true,
        msg: error.response.data.error,
        color: "danger",
      })
    }
  }

  return (
    <div className='SignIn'>
      <Form className='container' onSubmit={handleFormSubmit}>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            name='email'
            placeholder='Enter email'
            value={inputvalue.email}
            onChange={handleChange}
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            placeholder='Password'
            value={inputvalue.password}
            onChange={handleChange}
          />
        </Form.Group>
        <h6 className={`text-center text-${errorMsg.color}`}>
          {errorMsg.status ? errorMsg.msg : errorMsg.msg}
        </h6>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  )
}
