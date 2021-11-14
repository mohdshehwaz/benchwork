const express=require('express')
const path=require('path')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const router=express.Router()
require('../data/connection')
const LoginData=require('../model/model')

// Route for home page
router.get('/',(req,res)=>{
    res.render('index.ejs')
})

// Route for login page
router.get('/login',(req,res)=>{
    res.render('login.ejs')
})

// method for register a user
router.post('/register',async (req,res)=>{
  

    const database=new LoginData({
        name:req.body.name,
        email:req.body.email,
        password:await bcrypt.hash(req.body.password,8)
    })
   
    database.save()
    .then(()=>{
        res.send("User data saved in api")
    })
    .catch((e)=>{
        console.log(e.message)
    })
   
})


// method for login 
router.post('/login',async (req,res)=>{
    try{
       
        const email=req.body.email
        // Generate a token for a user
        const jwtTokens=await jwt.sign({email:email},'newUser')
        // Check if a user exist in database or not
        const foundOne=await LoginData.findOne({
            email:email
        })
        if(foundOne===null){
            console.log("user not registerd")
        }
        else{
            const isMatch=await bcrypt.compare(req.body.password,foundOne.password)
            if(isMatch){
                // return a token
                res.send(jwtTokens)
            }
            else{
                res.status(400).send("password does not match")
            }
        }
        
        
    }
    catch(error){
        console.log(error.message)

    }

   
    

})

module.exports=router