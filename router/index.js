const express = require('express');
const router = express.Router();
const Auth = require('../Controllers/auth');
const Personnel = require('../model/user')
const jwt = require('jsonwebtoken');
const multer = require('multer')
const Cloudinary =  require ('../model/cloudinary')

const { TOKEN_KEY } = process.env

const storage = multer.diskStorage({
  // inserting  uploading files into the destination ......
//   destination: function (req, file, cb){
//       cb(null, './uploads/');
//   },
  filename: function(req, file, cb){
      cb(null, new Date().toISOString() + file.originalname)
  }   
})

const filterType = (req, file, cb)=>{
    if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" ){
        cb(null, true)
    }else{
        cb(null, err);
    }
}

const upload = multer({ 
  storage: storage 
})
let uplaodToCLoud;
// const testJWT = require('../Controllers/middleware')

// for register process...///
router.post('/auth/register', async  (req,res)=>{
    // if(!req.file){
    //     res.status(400).json("Information input is Require")
    //   }else{
    //      uplaodToCLoud =  await Cloudinary.uploader.upload(req.file.path,
    //          {
    //              folder:'portal'
    //       })
    //   } 
    try{
        let {
          firstname,
          lastname,
          email,
          phone,
          local,
          country,
          state,
          role,
          location,
          date,
          position
        // parent_name,
        // parent_number
       } = req.body
        if(!(firstname && lastname && phone && email)){
              res.status(400).json("Information input is Require")
        }else{
            const user = await Personnel.User.create({
              firstname,
              lastname,
              email,
              phone,
              local,
              country,
              state,
              status:'awaiting',
              role,
              location,
              dateOfBirth:date,
              position,
              retired_date:'null',
              dateOfStart:'null',
              performance:'null',
              department:'null'

            })
            const token = jwt.sign({token: user},TOKEN_KEY,{expiresIn: "7h",});
            res.json({ message: "Registered in successfully  😊 👌", response:token });
      }
    }catch(err){ 
        res.json({error:err.TypeError})
        console.log(err)
    }
     
});
// 

router.post('/auth/login', Auth.login)//login routing
router.get('/user_profile/:id', Auth.getUserInfo)//student profile

//for the admin part ....
router.patch('/admin/update', Auth.updateStatus)
router.get('/info', Auth.getAllApplicant)
router.get('/total_status', Auth.getStatus)
router.delete('/remove_user/:id', Auth.deletePersonnel),
router.post('/admin_login', Auth.adminlogin)

module.exports = router       