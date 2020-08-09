const Plan = require("../models/plan")

//middleware to req.plan
exports.getPlanByID = (req, res, next, id) => {
  Plan.findById(id).exec((err, plan) => {
    if (err) {
      return res.status(400).json({
        error: "An error occured... Unable to find",
      })
    }
    req.plan = plan
    next()
  })
}

// get plan
exports.getPlan = (req, res) => {
  return res.json(req.plan)
}

// get all plans
exports.getAllPlans = (req, res) => {
  Plan.find().exec((err, plans) => {
    if (err) {
      return res.status(400).json({
        error: "An error occured... No plans found",
      })
    }
    res.json(plans)
  })
}

// create plan
exports.createPlan = (req, res) => {
  const newPlan = new Plan(req.body)
  newPlan.save((err, plan) => {
    if (err) {
      return res.status(400).json({
        error: "Error saving into the database!",
      })
    }
    res.json(plan)
  })
}

// update plan
exports.updatePlan = (req, res) => {
  Plan.findOneAndUpdate(
    { _id: req.plan._id },
    {
      $set: req.body,
    },
    {
      new: true,
      useFindAndModify: false,
    },
    (err, updatedPlan) => {
      if (err) {
        return res.status(400).json({
          error: "Error in updating plan... please try again later",
        })
      }
      res.json(updatedPlan)
    }
  )
}

// delete plan
exports.deletePlan = (req, res) => {
  const plan = req.plan
  plan.remove((err, deletedplan) => {
    if (err) {
      return res.status(400).json({
        error: "Error occured while deleting",
      })
    }
    if (!deletedPlan) {
      return res.status(400).json({
        error: "Not found in db",
      })
    }
    return res.json(`Deleted successfully : ${deletedPlan}`)
  })
}
