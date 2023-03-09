const { Router } = require('express');
// Importar todos los routers;
 const dogsRouter = require('./dogsroute.js');
 const temperamentsRouter = require('./temperamentsroute.js')

const router = Router();

// Configurar los routers
 router.use('/dogs', dogsRouter);
 router.use('/temperaments', temperamentsRouter);


module.exports = router;
