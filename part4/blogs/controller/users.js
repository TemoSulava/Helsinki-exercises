const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

//Search for all the users in the database
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {title: 1, author: 1, likes: 1});
  response.json(users.map(user => user.toJSON()));
});

//Create a new user with a an encrypted password to the database
usersRouter.post('/', async (request, response) => {
  const body = request.body;


  if (!body.password) {
    return response.status(404).json({error: 'Password not inputed'});
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  });

  const savedUser = await user.save();
  response.json(savedUser);
});

module.exports = usersRouter;