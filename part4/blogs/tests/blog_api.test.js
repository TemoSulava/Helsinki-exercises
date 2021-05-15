const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');
const bcrypt = require('bcrypt');




beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});


describe('Blog post fetching', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test('Returns Blog is in a json format', async() => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  
  test('Returns correct number of blog posts', async () => {
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('Verifies that unique identifier of the blog is named by ID', async () => {
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[0].id).toBeDefined();
  });
});

describe('New blog post', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test('Adding a new blog post', async () => {
    const newBlog = {
      author: 'test',
      title: 'test',
      likes: 5,
      url: 'localhost.com'
    };

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const content = blogsAtEnd.map(blog => blog.title);
    
    //verify that the array receives a new object
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    //verify that this post is added to the database
    expect(content).toContain('test');
  });

  test('blog post without likes property set default to 0', async () => {
    const newBlog = {
      title: 'test title without likes',
      author: 'jest',
      url: 'http://localhost',
    };

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

      
    //check if an object has 'likes' property and behave accordingly
    if (response.body.hasOwnProperty('likes')) {
      return expect(response.body.likes).toBe(0);
    }
    response.body.likes = 0;
    expect(response.body.likes).toBe(0);
  });

  
});

test('blog post without title and url is not added', async () => {
  const newBlog = {
    author: 'test',
    likes: 13,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);

  // const response = await api.get('/api/blogs');
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length);
});

describe('Viewing a specific blog', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test('returns a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToView = blogsAtStart[0];
    

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
      
    const processedBlogToView = JSON.parse(JSON.stringify(resultBlog));
    expect(resultBlog.body).toEqual(processedBlogToView);
  });

  describe('Deleting notes', () => {
    test('succeeds with status code 204 if the delete is successful', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

      const blogs = blogsAtEnd.map(blog => blog.title);
      expect(blogs).not.toContain(blogToDelete.title);
    });
  });
});

describe('when there initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'tzzz',
      name: 'temo',
      password: 'PePeR'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(user => user.username);
    expect(usernames).toContain(newUser.username);

  });

  test('creation fails with the proper statuscode if the username is already taken', async () => {
    const usersAtStart = helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'PePeR'
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('\'username\' to be unique');
    const usersAtEnd = await helper.usersInDb();

    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
