const { Router } = require('express');
const temperamentsRouter = Router();
const getalltemperaments=require("../helpers/temperamentsfunction")

temperamentsRouter.get("/",async(req,res)=>{
    try {
        const temperamentos=await getalltemperaments();
        res.status(200).json(temperamentos)
        
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }
});
module.exports=temperamentsRouter