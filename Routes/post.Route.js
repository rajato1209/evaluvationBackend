const { query } = require("express");
const express=require("express")

const {postModel}=require("../Model/post.model")

const postRouter=express.Router();

postRouter.get("/",async(req,res)=>{
    const query=req.query;
    const post=await postModel.find(query);
    res.send(post);
})

postRouter.post("/create",async(req,res)=>{
    const payload=req.body;
    const post =new postModel(payload);
    await post.save();
    re.send({"msg":"post added"})
})

postRouter.get("/top",async(req,res)=>{
    const tpost=await postModel.find({no_of_Comments})
    res.send(tpost);
})

postRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body;
    const ID=req.params.id;
    console.log(ID)
    try {
        await MovieModel.findByIdAndUpdate({_id:ID},payload)
        res.send({"msg":"post updated successfully"})
    } catch (error) {
        
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    const ID=req.params.id;

    try {
        await postModel.findByIdAndDelete({_id:ID});
        res.send({"msg":"post delete"})
    } catch (error) {
        res.send(error)
    }
   
})

module.exports={
    postRouter
}