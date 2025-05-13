const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
const url =
`mongodb+srv://himurayue23:${password}@cluster0.io7kvnl.mongodb.net/phonebookApp`
  

mongoose.set('strictQuery',false)

mongoose.connect(url)

const PersonSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', PersonSchema)

const person = new Person({
  name: `${name}`,
  number: `${number}`,
})

if(password){
  Person.find({}).then(result => {
    result.forEach(a => {
      console.log(a)
    })
    mongoose.connection.close()
})}else{
  person.save().then(result => {
  console.log('person create!')
  mongoose.connection.close()
})
}



