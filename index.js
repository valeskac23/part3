const express = require('express')
const cors = require('cors')
const app = express()



let persons= [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "id": 5,
    "name": "Clarisa Maluenga",
    "number": "123456"
  },
  {
    "id": 6,
    "name": "vanessa Rivero",
    "number": "456789"
  },
  {
    "id": 7,
    "name": "huhiefhe",
    "number": "48415465"
  }
]

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())


app.get('/api/persons', (request, response)=>{
    response.json(persons)
})

app.get('/info', (request,response) =>{
   const user = persons.length
   const fechaActual = new Date()
   const fecha = fechaActual.toLocaleString()
    response.send(`los contactos en la agenda son ${user} y la peticion ${fecha} `)
})

//muestra a los contactos individusles
app.get('/api/persons/:id', (request, response) =>{
  const id =Number(request.params.id)
  console.log(id);
  

  const person = persons.find(person =>person.id === id)
  if(person){
    response.json(person)
  }else{
    response.send("Page not found")
    response.status(404).end()
  }
})

//borra a un contacto de la aplicacion
app.delete('/api/persons/:id', (request, response)=>{
  const id = Number(request.params.id)

  const person = persons.find(person =>person.id === id)
 response.status(204).end()
})

//generador de id

const generateId =()=>{
  const maxId = persons.length > 0 ? Math.max(...persons.map((a)=> Number(a.id))) :0
  return String(maxId + 1)
}

//agregar nuevos contactos
app.post('/api/persons', (request, response)=>{
  const newperson = request.body
  const existe = persons.some(a=> a.name === newperson.name)

  if(!newperson.name){
    console.log('1');
    
    return response.status(400).json({
      error:'name cannot be empty'
    })
  }else if (!newperson.number){
    console.log('2');
    
     return response.status(400).json({
      error:'number cannot be empty'
    })
  }else if (existe){
    console.log('3');
    
    return response.status(400).json({
      error:'the name already exist'
    })
    
  }
  
 const person = {
  name:newperson.name,
  number: newperson.number,
  id: generateId()
 }


 persons = persons.concat(person)

 response.json(person)
  
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})