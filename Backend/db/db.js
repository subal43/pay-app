const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb+srv://subalkundu3:zsCa4gcKCBC4DbUA@cluster0.il9x56g.mongodb.net/pay-app")

const UserSchema = new Schema({
    firstName:String,
    lastName:String,
    password:String,
    userName:String

})

const accountSchema =  new Schema({
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    balance:{
        type:Number,
        required:true,
        min : 10
    }
})

const Account = mongoose.model("Account",accountSchema);
const User = mongoose.model("User",UserSchema);

module.exports= {
    User,
    Account
};
