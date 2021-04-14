/* eslint-disable linebreak-style */
const mongoose = require('mongoose')

const password = process.argv[2]
const contactName = process.argv[3]
const contactNumber = process.argv[4]

const url = `mongodb+srv://FullStackOpen:${password}@cluster0.q2zxv.mongodb.net/Phonebook-contact?retryWrites=true&w=majority`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const contactSchema = mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if (contactName && contactNumber) {
  const contact = new Contact({
    name: contactName,
    number: contactNumber,
  })

  contact.save().then((result) => {
    console.log(
      `added ${contactName} number ${contactNumber} to the phonebook`
    )
    mongoose.connection.close()
  })
} else {
  console.log('Phonebook:')
  Contact.find({}).then((result) => {
    result.forEach((contact) => {
      console.log(`${contact.name} ${contact.number}`)
    })
    mongoose.connection.close()
  })
}
