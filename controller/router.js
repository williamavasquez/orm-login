const express = require("express");
const router = express.Router();

const {ensureAuthenticated} = require("../config/auth")


router.get("/", (req,res)=>{
  res.render("index")
})

router.get("/dashboard", ensureAuthenticated, (req,res)=>{

  console.log(req.session)
  console.log("I MADE IT TO DASHBOARD")
  res.render("userExist")
})


module.exports = router