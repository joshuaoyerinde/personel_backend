const mongoose = require('mongoose');
const userSchema = mongoose.Schema; 

const registration = new userSchema({
    firstname:{ type: String, required:true},
    lastname:{ type:String, required: true},
    phone:{ type: String, required:true, unique:true},
    email:{ type:String, required:true},
    dateOfBirth:{ type:String},
    country:{ type:String, required:false},
    status:{type:String},
    position:{type:String},
    role:{type:String},
    performance:{type:String},
    retired_date:{type:String},
    dateOfStart:{type:String},
    state:{type:String},    
    local:{type:String},
    location:{type:String},
    department : {type:String},
    // parent_number:{type:String}


})

const loginAdmin = new userSchema({
    username:{type:String},
    password:{type:String}
})

const User = mongoose.model('Personnel',registration);
const AdminLogin = mongoose.model('Admin_auth',loginAdmin );

module.exports = {User, AdminLogin};  