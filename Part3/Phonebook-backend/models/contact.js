const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

const url = process.env.MONGODB_URI;

console.log('connecting to the database', url);

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

  const contactSchema = new mongoose.Schema({
    name: {
      type: String,
      minlength: 3,
      unique: true,
      required: true
    },
    number: {
      type: String,
      minlength: 8,
      unique: true,
      required: true
    }
  });
  
  contactSchema.plugin(uniqueValidator);

  contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
       delete returnedObject._id;
       delete returnedObject.__v;
    }
  });

  module.exports = mongoose.model('Contact', contactSchema);