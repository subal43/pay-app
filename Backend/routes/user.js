const express = require ("express")
const router = express.Router();
const jwt = require("jsonwebtoken")
const {User,Account} = require("../db/db.js")
const {z} = require("zod");
const { subscribe } = require(".");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middleware");

const signupBody=z.object({
    username:z.string().email(),
    firstName:z.string(),
    lastName:z.string(),
    password:z.string()
})

// update z validation
const updateBody=z.object({
    password: z.string().optional(),
    firstname: z.string().optional(),
    lastname: z.string().optional(),
})

router.post("/signup",async (req,res)=>{
    const {success}=signupBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const userExist = await User.findOne(
       { username : req.body.username}
    )

    if(userExist){
        return res.status(411).json({
            message: "Email already taken "
        })
    }

    const user = await User.create({
        userName:req.body.username,
        password:req.body.password,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    })
    const userid = user._id ;
    await Account.create({
        userid,
        balance:1+Math.random()*1000
    })



    const token = jwt.sign({
        userid
    },JWT_SECRET)

    res.json({
        	message: "User created successfully",
	        token:token
    })


})

const signinBody = z.object({
    username:z.string().email(),
    password:z.string()
})


router.post("/signin",async(req,res)=>{
    const {success} = signinBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username : req.body.username,
        password : req.body.password
    })

    const token = jwt.sign({
        userId : user._id
    },JWT_SECRET)

    if(user){
        return res.status(200).json({
            token
        })
        return
    }

    res.status(411).json({
        message: "Error while logging in"
    })



})



router.put("/",authMiddleware,async(req,res)=>{
    const {success} = updateBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message: "Error while updating information"  
        })
    }

    await User.updateOne({_id:req.userid},req.body);
    res.status(200).json({
        message:"Updated successfully"
    })
})


router.get("/bulk",async (req,res)=>{
    const filter = req.query.filter||"" ;
    const users = await User.find({
        $or:[{
            firstName:{
                "$regex":filter
            }
        },{
            lastName : {
                "$regex":filter
            }
        }]
    })
    res.status(200).json({
        user : users.map(user =>({
            username : user.username,
            firstName : user.firstName,
            lastName : user.lastName,
            _id : user._id
        }))
    })
})


 
module.exports=router;





