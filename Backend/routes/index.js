const express = require ("express")
const user = require("./user")
const accountRouter =require("./account")
const router = express.Router();

router.use("/user",user)
router.use("/account", accountRouter);

module.exports=router;


