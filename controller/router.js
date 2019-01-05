const express = require("express");
const router = express.Router();

const {ensureAuthenticated} = require("../config/auth")


router.get("/", (req,res)=>{
  console.log("Is there a user? ")
  console.log(req.session.passport)

  res.render("index")
})

router.get("/dashboard", ensureAuthenticated, (req,res)=>{

  console.log(req)
  console.log("I MADE IT TO DASHBOARD")
  res.render("userExist")
})


module.exports = router