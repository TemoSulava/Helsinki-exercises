const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1});
  response.json(blogs);
});

blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body;
  const id = request.params.id;

  const blog = {
    likes
  };

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {new: true});
  response.json(updatedBlog);

});

blogsRouter.get('/:id', async (request, response) => {
  const singleBlog = await Blog.findById(request.params.id);
  response.json(singleBlog);
});



blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body;


  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);
  
  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id
  });


  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();

});

module.exports = blogsRouter;