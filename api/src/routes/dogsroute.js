const { Router } = require("express");
const dogsRouter = Router();
const { getalldogs, getdogsbyname,getdogbyid,postdogs } = require("../helpers/dogsfunction.js");
const {validatePost}=require("../helpers/middleware.js")
dogsRouter.get("/", async (req, res) => {
  const { name } = req.query;

  try {
    if (!name) {
      const info = await getalldogs();

      res.status(200).json(info);
    } else {
      const info = await getdogsbyname(name);

      if (info.length===0) {
        console.log("hola estoy aqui")
        res.status(404).json({ error: "la raza no existe" });
      }
      else{
      res.status(200).json(info);}
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

dogsRouter.get("/:idRaza",async (req, res)=>{
    try {
        const {idRaza}=req.params
        
        const dogid=await getdogbyid(idRaza);

        res.status(200).json(dogid);
        
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

dogsRouter.post("/",validatePost,async(req,res)=>{
  try {
    const{nombre,peso,altura,edadestimada,imagen,temperamentos}=req.body
    
    const postpuppies=await postdogs(req.body);
    res.status(200).json(postpuppies)

    
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})



module.exports = dogsRouter;
