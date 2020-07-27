import React, { useState } from "react"
import axios from "axios"
import "./login.scss"

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
    <div className='Login'>
      <form noValidate onSubmit={handleFormSubmit}>
        {errorMsg.status ? (
          <div className={` error-div text-${errorMsg.color}`}>
            <h6>There was a problem</h6>
            <h6>{errorMsg.msg}</h6>
          </div>
        ) : null}

        <h3>Login</h3>

        <div className='form-group'>
          <label>Email address</label>
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
        <div className='row-div'>
          <div className='check-box-group '>
            <input type='checkbox' />
            <h6 className=''>Remember me</h6>
          </div>
          <h6 className='forgot-password'>Forgot password</h6>
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
          <p>New user!</p>
          <p>Create you account</p>
        </div>
      </form>
    </div>
  )
}
