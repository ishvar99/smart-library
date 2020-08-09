const express = require("express")
const { getUserByID } = require("../controllers/user")
const { getPlanByID, getPlan } = require("../controllers/plan")
const router = express.Router()

router.param("userID", getUserByID)
router.param("planID", getPlanByID)

router.get("/plan/:planID", getPlan)
router.get("/plans", getAllPlans)

module.exports = router
