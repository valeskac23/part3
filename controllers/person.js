const personRouter = require ('express').Router()
const { response, request } = require('express')
const Person = require('../models/person')


//LLama a la direccion principal para que muestr las notas
personRouter.get('/', (request, response) =>{
  Person.find({}).then(result =>{
    response.json(result)
  })
})


//Busca a los contactos individuales por id
personRouter.get('/:id',(request,response, next) =>{
  Person.findById(request.params.id)
    .then(result =>{
      if(result){
        response.json(result)
      }else{
        response.status(404).end()
      }
    })
    .catch(error=>next(error))
})


//agrega un nuevo contacto a la agenda
personRouter.post('/',(request, response,next)=>{
  const content =request.body

  const person = new Person({
    name:content.name,
    number: content.number
  })

  person.save()
  .then(savePerson =>{
    response.json(savePerson)
  })
  .catch(error => next(error))
})


//actualizar un contacto
personRouter.put('/:id', (request, response, next) => {
  const content =request.body

  const person ={
    name:content.name,
    number: content.number
  } 

  Person.findByIdAndUpdate(request.params.id,  content, {new: true})
  .then(updatePerson => {
    response.json(updatePerson)
  })
  .catch(error => next(error))
})

//borra una persona

personRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
  .then(()=>{
    response.status(204).end()
  })
  .catch(error => next(error))

})


module.exports = personRouter