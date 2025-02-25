const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    adminName: {type:String , required:true},
    adminPhoneNumber:  {type:String , required:true} ,
    adminEmail:  {type:String , required:true ,unique:true} ,
    adminPassword: {type:String , required:true},
    role: { type: String, required: true }
})



module.exports=mongoose.model('Admin',adminSchema);