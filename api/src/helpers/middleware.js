

function validatePost (req, res, next){    //esta funcion validadora sirve para 
    const{nombre,altura,imagen,edadestimada,temperamentos,peso} = req.body;        // parametros obligatorios
    if(!nombre) return res.status(400).json({error:'falta nombre'});
    if(!altura) return res.status(400).json({error:'falta altura'});
    if(!imagen) return res.status(400).json({error:'falta imagen'});
    if(!edadestimada) return res.status(400).json({error:'falta edad estimada'});
    if(!temperamentos) return res.status(400).json({error:'falta temperamentos'});
    if(!peso) return res.status(400).json({error:'falta peso'});
    next()};

module.exports={validatePost}