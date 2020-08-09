const express = require("express")
const { getUserByID } = require("../controllers/user")
const {
  getPlanByID,
  getPlan,
  createPlan,
  updatePlan,
  deletePlan,
  getAllPlans,
} = require("../controllers/plan")
const {
  isLoggedin,
  isAuthenticated,
  isAdmin,
} = require("../middlewares/protect")
const router = express.Router()

//params
router.param("userID", getUserByID)
router.param("planID", getPlanByID)

// get routes
router.get("/plan/:planID", getPlan)
router.get("/plans", getAllPlans)

// post routes
router.post(
  "/plan/create/:userID",
  isLoggedin,
  isAuthenticated,
  isAdmin,
  createPlan
)

// put route to update
router.put(
  "/plan/:planID/update/:userID",
  isLoggedin,
  isAuthenticated,
  isAdmin,
  updatePlan
)

// delete route
router.delete(
  "/plan/:planID/delete/:userID",
  isLoggedin,
  isAuthenticated,
  isAdmin,
  deletePlan
)

module.exports = router
