const logger = require('./logger')



//controlador de rutas desconocidas
const unknowEndpoint = (request, response) =>{
  response.status(404).send({error: 'unknow endpoint'})
}


//Middleware que maneja errores

const errorHandler =(error, request, response, next) =>{
  console.error(error.message)
  
  if(error.name === 'CastError'){
    return response.status(400).send({error: 'malformated id'})
  }else if (error.name === 'ValidationError'){
    return response.status(400).json({error: error.message})
  }

  next(error)
}

module.exports = {
  unknowEndpoint,
  errorHandler
}