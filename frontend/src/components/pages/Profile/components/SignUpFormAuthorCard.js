import React, { useState, useContext, useEffect } from "react"
import { Card, Button, Modal } from "react-bootstrap"
import AuthContext from "../../../../context/Auth/AuthContext"

const originData = [
  "Asia",
  "Africa",
  "Europe",
  "Australia",
  "South America",
  "North America",
]

export const SignUpFormAuthorCard = () => {
  const { user } = useContext(AuthContext)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [nickname, setNickname] = useState("")
  const [origin, setOrigin] = useState("")

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
    }
  }, [user])

  return (
    <div className='SignUpFormAuthorCard mb-3'>
      <Card>
        <Card.Body>
          <h6>Upgrade yourself as Author</h6>
          <button className='btn btn-sm btn-outline-info' onClick={handleShow}>
            Signup Now
          </button>
          <Modal
            size={"lg"}
            centered
            show={show}
            onHide={handleClose}
            backdrop='static'
            keyboard={false}
          >
            <div className='row px-2'>
              <div className='col-md-5 model-section1-bg'></div>
              <div className='col-lg-7 my-auto'>
                <Modal.Header>
                  <h5>Signup today</h5>
                  <h6 className='text-primary'>Free 30days premium</h6>
                </Modal.Header>
                <Modal.Body>
                  <div>
                    <form noValidate>
                      <div className='form-group'>
                        <label>Name</label>
                        <input
                          disabled
                          className='form-control'
                          type='text'
                          value={name}
                        />
                      </div>
                      <div className='form-group'>
                        <label>Email</label>
                        <input
                          disabled
                          className='form-control'
                          type='email'
                          value={email}
                        />
                      </div>
                      <div className='form-group'>
                        <label>Nickname</label>
                        <input
                          className='form-control'
                          value={nickname}
                          onChange={(e) => setNickname(e.target.value)}
                        />
                      </div>
                      <div className='form-group'>
                        <label>Origin</label>
                        <select
                          class='form-control'
                          onChange={(e) => setOrigin(e.target.value)}
                        >
                          {originData.map((item, i) => {
                            return (
                              <option key={i} value={item}>
                                {item}
                              </option>
                            )
                          })}
                        </select>
                      </div>
                    </form>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <button
                    className='btn btn-sm btn-secondary'
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button className='btn btn-sm btn-primary'>
                    Upgrade as Author
                  </button>
                </Modal.Footer>
              </div>
            </div>
          </Modal>
        </Card.Body>
      </Card>
    </div>
  )
}
