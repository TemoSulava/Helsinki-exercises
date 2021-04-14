require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const Contact = require("./models/contact");


app.use(cors());
app.use(express.json());
app.use(express.static("build"));

morgan.token("logger", (req, res) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :logger"
  )
);

//Handle errors for the HTTP requests
const errorHandler = (error, request, response, next) => {
  console.error(error)

  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  }else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }

  next(error)
}

//Logs the requests to the console
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

//add new posts to the database
app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    response.status(404).json({
      error: "content not found",
    });
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  })

  contact
    .save()
    .then((savedContact) => savedContact.toJSON())
    .then(savedAndTransformedContact => response.json(savedAndTransformedContact))
    .catch(error => next(error))
  
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body
  const id = request.params.id;
  const contact = {
    number: body.number
  }

  Contact.findByIdAndUpdate(id, contact, {new: true})
    .then((updatedContact) => {
      response.json(updatedContact);
    })
    .catch((error) => next(error));
})

//Instructions for the response if the /api/persons route is requested.
app.get("/api/persons", (request, response) => {
  Contact.find({}).then(result => response.json(result))
});
// If the /info route is requested
app.get("/info", (request, response) => {
  const inf = `<h1>Phonebook has info of ${Contact.length} People</h1>`;
  const tme = new Date().toUTCString();

  response.write(inf);
  response.write(`<h2>${tme}</h2>`);
  response.end();
});

// If the /api/persons/:id is requested
app.get("/api/persons/:id", (request, response) => {
  Contact.findById(request.params.id)
        .then(contact => response.json(contact))
});

//delete posts using the requested id
app.delete("/api/persons/:id", (request, response, next) => {
  Contact.findByIdAndRemove(request.params.id)
         .then(result => {
           response.status(204).end();
         })
         .catch(error => next(error))
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};


app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
