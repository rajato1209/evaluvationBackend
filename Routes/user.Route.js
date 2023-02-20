const express=require("express");
const {UserModel}=require("../Model/user.model")
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");


const userRouter=express.Router();


userRouter.post("/register",async(req,res)=>{
    const {email,password,name,gender,age,city}=req.body;
    try {
        const existU =await UserModel.find({email});
        if(existU){
            res.send({"msg":"User already exist, please login"})
        }else{
            bcrypt.hash(password, 5, async(err, hash)=> {
                if(err){
                    res.send({"msg":"something went wrong","error":err.message})
                }else{
                    const user= new UserModel({email,password:hash,name,gender,age,city})
                    await user.save();
                    res.send({"msg":"user register successfull"})
                }
            });
        }       
        
    } catch (err) {
        res.send({"msg":"something went wrong","error":err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body;
    try {
        const user=await UserModel.find({email});
        if(user.length>0){
        bcrypt.compare(pass, user[0].pass,(err, result)=> {
            if(result){
                const token=jwt.sign({course:"backend"},"masai");
                res.send({"msg":"Login successful","token":token})
            }else{
                res.send({"msg":"wrong credntial"})
            }
        });
    }      
        
    } catch (err) {
        res.send({"msg":"wrong credntial"})
    }
})


module.exports={
    userRouter
}