import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import axios from "axios"
import validator from "validator"

export const Register = () => {
  const [inputvalue, setinputvalue] = useState({
    uname: "",
    age: "",
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
    name: inputvalue.uname,
    age: inputvalue.age,
    email: inputvalue.email,
    password: inputvalue.password,
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    const uri = "api/v1/auth/register"

    try {
      if (
        inputvalue.uname ||
        inputvalue.age ||
        inputvalue.email ||
        inputvalue.password
      ) {
        if (validator.isEmail(inputvalue.email)) {
          if (inputvalue.password.length > 5) {
            const response = await axios.post(uri, formData)
            console.log(response)
          } else {
            seterrorMsg({
              status: true,
              msg: "Password should be atleast 6 characters",
              color: "danger",
            })
          }
        } else {
          seterrorMsg({
            status: true,
            msg: "Please provide a valid email",
            color: "danger",
          })
        }
      } else {
        seterrorMsg({
          status: true,
          msg: "Please fill in all the details",
          color: "danger",
        })
      }
    } catch (error) {
      seterrorMsg({
        status: true,
        msg: error.response.data.error,
        color: "danger",
      })
    }
  }

  return (
    <div className='Register'>
      <Form
        className='container'
        noValidate
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <Form.Group controlId='formBasicname'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            name='uname'
            placeholder='Enter name'
            value={inputvalue.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='formBasicAge'>
          <Form.Label>Age</Form.Label>
          <Form.Control
            type='number'
            name='age'
            placeholder='Enter age'
            value={inputvalue.age}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email</Form.Label>
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
