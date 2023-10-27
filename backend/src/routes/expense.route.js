const mongoose=require("mongoose");
const express=require("express");
const ExpenseModel=require("../models/expensetracker.model")
const middleware=require("../middlewares/middleware")
const app=express.Router();
app.use(middleware)
app.get("/",async(req,res)=>{
    try{
        accounts=await ExpenseModel.findOne({User:req.userid});
       return res.send(accounts)
      }catch(e){
  return res.send(e.message)
      }
})
app.post("/",async(req,res)=>{
    const{Amount}=req.body
    try{
        accounts=await ExpenseModel.findOne({User:req.userid});
        if(!accounts){
            account=await ExpenseModel.create({...req.body,User:req.userid});
            return res.send("created")
        }else{
            await ExpenseModel.findOneAndUpdate({User:req.userid},{Amount:accounts.Amount+Amount})
            console.log("updated")
            return res.send("updated")
        }
     
    
    }catch(e){
        console.log("error")
return res.send(e.message)
    }
})
app.post("/myexpense",async(req,res)=>{
const{category,Name,Amount,Place,Description}=req.body;

console.log(Name)
    try{
        accounts=await ExpenseModel.findOne({User:req.userid});
     
    //  accounts={...accounts,Paise:accounts.Paise-Amount}
     accounts.Categories={...accounts.Categories,[category]:[...accounts.Categories[category],{Name:Name,Amount,Place,Description}]}
     const updatedBudgets = {
        ...accounts.Budgets,
        [category]: { ...accounts.Budgets[category], initialAmount:Number(accounts.Budgets[category].initialAmount)+Number(Amount) }
    };
    const updated=await ExpenseModel.findOneAndUpdate({User:req.userid},{Categories:accounts.Categories,Budgets:updatedBudgets},{new:true});
    const newUpdate=await ExpenseModel.findOneAndUpdate({User:req.userid},{Amount:accounts.Amount-Amount},{new:true})
        console.log(updated)
        return res.send(newUpdate)
    }catch(e){
      return res.send(e.message)
    }
})
app.get("/myexpense",async(req,res)=>{
    try{
        const getmyallexpense=await ExpenseModel.find({User:req.userid});
        return res.send(getmyallexpense)
    }catch(e){
 return res.send(e.messsage)
    }
})

app.post("/createbudget", async (req, res) => {
    try {
        const { category, limit } = req.body;
        const userId = req.userid; // Make sure req.userid is correctly populated

        // Fetch the user's account from the database
        const userAccount = await ExpenseModel.findOne({ User: userId });
        if (!userAccount) {
            return res.status(404).send("User account not found");
        }

         updatedBudgets = {
            ...userAccount.Budgets,
            [category]: { ...userAccount.Budgets[category], limit:limit }
        };

        // Update the user's account in the database
        const updated = await ExpenseModel.findOneAndUpdate(
            { User: userId },
            { Budgets: updatedBudgets },
            { new: true }
        );

        return res.send(updated);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

module.exports=app
