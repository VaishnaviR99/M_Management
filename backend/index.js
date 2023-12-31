
require("dotenv").config();
const Usermodel=require("./src/models/user.model")
const expenseroute=require("./src/routes/expense.route")
const jwt=require("jsonwebtoken")
const express=require("express");
const PORT=process.env.PORT||8080;
const connect=require("./src/config/connect")
const argon2 = require('argon2');

const cors=require("cors")
const app=express();
app.use(express.json())
app.use(cors())
app.use("/expense",expenseroute)



app.get("/",async(req,res)=>{
    const user=await Usermodel.find();
    res.send("welcome to server")
   })
app.post("/signup",async(req,res)=>{
    console.log("ok1111")
    const hash=await argon2.hash(req.body.password);
try{
    const user=await Usermodel.create({...req.body,password:hash})
    return res.send({message:"user signed up successfully"})
}catch(e){
    return res.send(e.message)
}
})
app.post("/login",async(req,res)=>{
   const{email,password}=req.body
   try{
const user=await Usermodel.findOne({email:email})
       if(!user){
            return res.send("user not found")
        }else{
            if(await argon2.verify(user.password,password)){
            const token=jwt.sign({_id:user._id,email:user.email},"avdhut@0511",{expiresIn:"7 days"})
             return  res.send(res.send({message:"user login successfully",token}))
            }else{
                return res.send("password does not match")
            }
            }
    }catch(e){
        console.log("ok")
return res.send(e.message)
    }
})
app.listen(PORT,async()=>{
    await connect()
    console.log("http://localhost:8080")
})