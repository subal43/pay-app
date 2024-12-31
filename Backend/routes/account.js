
const express = require('express');
const { authMiddleware } = require('../middleware');
const router = express.Router();

const {Account} = require("../db/db.js");
const { default: mongoose } = require('mongoose');

router.get("/balance",authMiddleware , async(req,res)=>{
    const account = await Account.findOne({
        userId:req.userId
    });

    res.json({
        balance : account.balance
    })

});

router.post("/transfer",async(req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    
    const {amount,to} = req.body;
    const toaccount = await Account.findOne({userId:to}).session(session);
    if(!toaccount){
        await session.abortTransaction();
        res.status(400).json({
            msg:"Invaild Account "
        })
    }
    const account = await Account.findOne({userId:req.userId}).session(session);
    if(account.balance<amount){
        await session.abortTransaction();
        res.status(400).json({
            msg:"Insufficient balance "
        })
    }

    await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session);
    await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);

    await session.commitTransaction();
    res.json({
        message:"Transfer successfull"
    })
})

module.exports = router ;