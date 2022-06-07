require('dotenv').config()
const Personnels = require('../model/user')
const jwt = require('jsonwebtoken');
const {TOKEN_KEY} = process.env

// login user  
const login = async (req,res)=>{
    try{
      const { email } = req.body
      console.log(email)
      const user = await Personnels.User.findOne({email});
      if(user){
        const token = jwt.sign({token: user},TOKEN_KEY,{expiresIn: "4m",});
        res.json({ message: "Login successfully  😊 👌", response:token });
        // res.status(200).json({message:"login sucessfully", resp:user.link})
      }else{  
        res.status(400).json({message:"Invalid Details"})
      }
    }catch(err){
      console.log(err)
    }
}
//admin login 
const adminlogin = async (req,res)=>{
  try{
    const { username } = req.body
    // console.log(email)
    const user = await Personnels.AdminLogin.findOne({username});
    if(user){
      res.json({ message: "Login successfully  😊 👌"});
      // res.status(200).json({message:"login sucessfully", resp:user.link})
    }else{  
      res.status(400).json({message:"Invalid Details"})
    }
  }catch(err){
    console.log(err)
  }
}

//for user personnels  info for admin...
const getUserInfo = async (req,res)=>{
    try{
      let id = req.params.id
      let userinfo = await Personnels.User.findOne({_id:id})
      res.json({response: userinfo});
      // console.log(userinfo)
    }catch(err){
      console.log(err)
    }
}

//testing the device detect 
const getStatus = async (req,res)=>{
  try{
    // let id = req.params.id
    let userinfo = await Personnels.User.find({status:'awaiting'})
    res.json({response: userinfo});
  }catch(err){
    console.log(err)
  }
}

//function for deleting personnel...
const deletePersonnel = async (req,res)=>{

  try{
    let id = req.params.id
    let userinfo = await Personnels.User.deleteOne({_id:id})
    res.json({response: 'deleted'});
  }catch(err){
    console.log(err)
  }
}

//this part is for the admin to get all the information of the users //......
//for user info
const getAllApplicant = async (req, res)=>{
  // console.log(req.params.link)
  try{
    const info = await Personnels.User.find({})
    res.json({response:info});
  }catch(err){
    console.log(err)
  }
}


//update the users status
const updateStatus = async (req, res)=>{
 let { id, firstname, lastname, email, phone, local, country, state, role, location, position, department,DateOfEmployement, Performance} = req.body
 console.log(id)
  
  try{
    let updateStudStatus = { $set: { firstname,
      lastname,
      email,
      phone,
      local,
      country,
      state,
      status:'Staff',
      role,
      location,
      // dateOfBirth:date,
      position,
      retired_date:'null',
      dateOfStart:DateOfEmployement,
      performance:Performance,
      department:department} };
    let upd = await Personnels.User.updateOne({ _id:id},  updateStudStatus)
    if(upd){
      res.json({message: 'Updated'});
    }
  }catch(err){
    console.log(err)
  }
}

module.exports = {login, getAllApplicant, getUserInfo, updateStatus, getStatus,deletePersonnel,adminlogin
};