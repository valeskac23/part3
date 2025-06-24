const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url);


mongoose.connect(url)
.then( result =>{
  console.log('conected to MongoDB');  
}).catch(error =>{
  console.log('error conecting to MongoDb', error.message);  
})

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 10,
    require: true
  },
  number: {
    type: String,
    minLength: 14,
    require: true
  }
})

PersonSchema.set('toJSON', {
  transform: (document, returnedObject)=>{
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
  }
})

module.exports = mongoose.model('Person', PersonSchema)