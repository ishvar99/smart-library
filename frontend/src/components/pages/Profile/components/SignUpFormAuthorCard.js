import React, { useState, useContext, useEffect } from "react"
import { Card, Modal } from "react-bootstrap"
import ProfileContext from "../../../../context/Profile/ProfileContext"
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
  const authContext = useContext(AuthContext)
  const profileContext = useContext(ProfileContext)
  const { user, loadUser } = authContext
  const { updateProfile } = profileContext
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [nickname, setNickname] = useState("")
  const [origin, setOrigin] = useState("")

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleSubmitJoin = async (e) => {
    e.preventDefault()
    await updateProfile(user._id, {
      role: 1,
      ifAuthor: {
        origin,
        nickname,
      },
    })
    await loadUser()
    setShow(false)
  }
  const handleSubmitCancellation = async (e) => {
    e.preventDefault()
    await updateProfile(user._id, {
      role: 0,
      ifAuthor: undefined,
    })
    await loadUser()
    setShow(false)
  }

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
    }
  }, [user])

  if (user == null) {
    return ""
  }

  return (
    <>
      {user.role === 0 && (
        <div className="SignUpFormAuthorCard mb-3">
          <Card>
            <Card.Body>
              <h6>Upgrade yourself as Author</h6>
              <button
                className="btn btn-sm btn-outline-info"
                onClick={handleShow}
              >
                Signup Now
              </button>
              <Modal
                size={"lg"}
                centered
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
              >
                <div className="row px-2">
                  <div className="col-md-5 model-section1-bg"></div>
                  <div className="col-lg-7 my-auto">
                    <Modal.Header>
                      <h5>Signup today</h5>
                      <h6 className="text-primary">Free 30days premium</h6>
                    </Modal.Header>
                    <Modal.Body>
                      <div>
                        <form noValidate onSubmit={handleSubmitJoin}>
                          <div className="form-group">
                            <label>Name</label>
                            <input
                              disabled
                              className="form-control form-control-sm"
                              type="text"
                              value={name}
                            />
                          </div>
                          <div className="form-group">
                            <label>Email</label>
                            <input
                              disabled
                              className="form-control form-control-sm"
                              type="email"
                              value={email}
                            />
                          </div>
                          <div className="form-group">
                            <label>Nickname</label>
                            <input
                              className="form-control form-control-sm"
                              value={nickname}
                              onChange={(e) => setNickname(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label>Origin</label>
                            <select
                              className="form-control form-control-sm"
                              onChange={(e) => setOrigin(e.target.value)}
                            >
                              <option>--- Select ---</option>
                              {originData.map((item, i) => {
                                return (
                                  <option key={i} value={item}>
                                    {item}
                                  </option>
                                )
                              })}
                            </select>
                          </div>
                          <div className="form-group">
                            <p className="text-muted text-small">
                              By continuing, you agree to the Terms and
                              Conditions of Use and Privacy Notice.
                            </p>
                          </div>
                        </form>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={handleClose}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-sm btn-primary"
                        type="submit"
                        onClick={handleSubmitJoin}
                      >
                        Upgrade as Author
                      </button>
                    </Modal.Footer>
                  </div>
                </div>
              </Modal>
            </Card.Body>
          </Card>
        </div>
      )}
      {user.role === 1 && (
        <div className="SignUpFormAuthorCard mb-3">
          <Card>
            <Card.Body>
              <h6>Manage your author membership</h6>
              <button
                className="btn btn-sm btn-outline-info"
                onClick={handleShow}
              >
                Manage
              </button>
              <Modal
                size={"lg"}
                centered
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
              >
                <div className="row px-2">
                  <div className="col-md-5 model-section1-bg"></div>
                  <div className="col-lg-7 my-auto">
                    <Modal.Header>
                      <h5>Manage author membership</h5>
                      <h6 className="text-primary"></h6>
                    </Modal.Header>
                    <Modal.Body>
                      <div>
                        Do you really want to cancel your author membership?
                      </div>
                      <p className="text-muted text-small">
                        <small>
                          By continuing, you agree to the Terms and Conditions
                          of Use and Privacy Notice.
                        </small>
                      </p>
                    </Modal.Body>
                    <Modal.Footer>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={handleClose}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-sm btn-primary"
                        type="submit"
                        onClick={handleSubmitCancellation}
                      >
                        Confirm Cancellation
                      </button>
                    </Modal.Footer>
                  </div>
                </div>
              </Modal>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  )
}
