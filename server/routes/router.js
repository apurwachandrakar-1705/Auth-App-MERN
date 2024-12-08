const express = require("express")
const userdb = require("../models/userSchema")
const router = new express.Router();
const bcrypt = require("bcryptjs")
const authenticate = require("../middleware/authenticate")
// for user registeration
router.post("/register",async(req,res)=>{
    const{name,email,password,cpassword}=req.body;
    if(!name || !email || !password ||!cpassword){
        res.json({error:"Fill all the data"})
    }

    try {
      const preuser = await userdb.findOne({email:email})  
      if(preuser){
       return res.status(422).json({error:"Email is Already Exist..."})
      }
      else if(password !==cpassword){
       return   res.status(422).json({error:"Password and Confim passorwd not matched..."})
      }
      else{
    const user = await new userdb({
        name,
        email,
        password,
        cpassword
    })
    // here passowrd hashing
    const storedData = await user.save();
    console.log(storedData)
   return res.status(201).json(storedData)
    } 
    
}
catch (error) {
     return  res.status(422).json({error:"user not stored"})  
    }
})
// USer Login
router.post('/login',async(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
        res.json({error:"Fill all the data"})
    }
    try {
      const userValid = await userdb.findOne({email:email})
      if(userValid){
    const isMatch = await bcrypt.compare(password,userValid.password)
      if(!isMatch){
        return res.status(422).json({error:"user not stored"})  
      }
      else{
        // TOKEN GENRATE
        const token = await  userValid.generateAuthToken()
        // COOKIE GENERATOR
       res.cookie('usercookie',token,{
        expires:new Date(Date.now()+9000000),
        httpOnly:true
       })
       const result = {
        userValid,
        token
       }
       res.status(201).json({status:201,result})
        
      }
      }  
    } catch (error) {
       res.json({msg:"unauthorized no token provide"})  
    }
})
router.get("/validuser",authenticate,async(req,res)=>{
try {
  const validUser= await userdb.findOne({_id:req.userId})

  return res.status(201).json({status:201,validUser})
} catch (error) {
  res.json({msg:"unauthorized no token provide"})  
}
})

module.exports = router;