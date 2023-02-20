require("dotenv").config();
const express =require("express");
const { connect } = require("mongoose");
const {userRouter}=require("./Routes/user.Route")
const {postRouter }=require("./Routes/post.Route")

const app=express();
app.use(express.json())

app.use("/user",userRouter)
app.use("post",postRouter)

app.get("/",(req,res)=>{
    res.send("Home Page")
})


app.listen(process.env.PORT,async()=>{
    try{
        await connect
        console.log(`server is running at port ${process.env.PORT}`);
    }catch(err){
        console.log(err)
    }
})