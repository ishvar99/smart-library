import React, { useState, useContext, useEffect } from "react"
import validator from "validator"
import "./register.scss"
import AuthContext from "../../../context/Auth/AuthContext"
import { Loader } from "../../utils/Loader/Loader"
export const Register = (props) => {
  const context = useContext(AuthContext)
  const [loading, setLoading] = useState(context.loading)
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
  const checkErrors = () => {
    if (
      inputvalue.uname &&
      inputvalue.age &&
      inputvalue.email &&
      inputvalue.password
    ) {
      if (validator.isEmail(inputvalue.email)) {
        if (inputvalue.password.length < 5) {
          seterrorMsg({
            status: true,
            msg: "Password should be atleast 6 characters",
            color: "danger",
          })
        } else {
          return false
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
    return true
  }
  const handleFormSubmit = async (event) => {
    event.preventDefault()
    seterrorMsg({
      status: false,
      color: "",
      msg: "",
    })
    if (!checkErrors()) {
      context.registerUser(formData)
    }
  }
  useEffect(() => {
    setLoading(context.loading)
    if (context.isAuthenticated) {
      props.history.push("/")
    }
    if (context.error) {
      seterrorMsg({
        status: "true",
        msg: context.error,
        color: "danger",
      })
    }
    // eslint-disable-next-line
  }, [context.error, context.isAuthenticated, context.loading, props.history])
  useEffect(() => {
    // Clear all the errors,when page is loaded
    seterrorMsg({
      status: false,
      color: "",
      msg: "",
    })
  }, [])
  return (
    <>
      {loading ? <Loader /> : null}
      <div className="Register">
        <form noValidate onSubmit={handleFormSubmit}>
          {errorMsg.status ? (
            <div
              className={`error-div text-${errorMsg.color}`}
              style={{ textAlign: "center" }}
            >
              <h6> There was a problem</h6>
              <h6>{errorMsg.msg}</h6>
            </div>
          ) : null}
          <h3>Register</h3>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="uname"
              value={inputvalue.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={inputvalue.age}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={inputvalue.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={inputvalue.password}
              onChange={handleChange}
            />
          </div>

          <button variant="primary" type="submit">
            Register
          </button>
          <p className="text-muted">
            By continuing, you agree to the Terms and Conditions of Use and
            Privacy Notice.
          </p>
          <hr />
          <div className="part-2">
            <p>Existing user!</p>
            <p>Login to continue</p>
          </div>
        </form>
      </div>
    </>
  )
}
