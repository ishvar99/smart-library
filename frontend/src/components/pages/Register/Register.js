import React, { useState } from "react"
import axios from "axios"
import validator from "validator"
import "./register.scss"

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
        inputvalue.uname &&
        inputvalue.age &&
        inputvalue.email &&
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
      <form noValidate onSubmit={handleFormSubmit}>
        {errorMsg.status ? (
          <div className={`error-div text-${errorMsg.color}`}>
            <h6> There was a problem</h6>
            <h6>{errorMsg.msg}</h6>
          </div>
        ) : null}
        <h3>Register</h3>
        <div className='form-group'>
          <label>Name</label>
          <input
            type='text'
            name='uname'
            value={inputvalue.name}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label>Age</label>
          <input
            type='number'
            name='age'
            value={inputvalue.age}
            onChange={handleChange}
          />
        </div>
        <div className='form-group'>
          <label>Email</label>
          <input
            type='email'
            name='email'
            value={inputvalue.email}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            name='password'
            value={inputvalue.password}
            onChange={handleChange}
          />
        </div>

        <button variant='primary' type='submit'>
          Submit
        </button>
        <p className='text-muted'>
          By continuing, you agree to the Terms and Conditions of Use and
          Privacy Notice.
        </p>
        <hr />
        <div className='part-2'>
          <p>Existing user!</p>
          <p>Login to continue</p>
        </div>
      </form>
    </div>
  )
}
