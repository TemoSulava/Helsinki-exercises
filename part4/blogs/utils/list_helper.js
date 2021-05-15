

const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  if (blogs.length === 0) {
    return 0;
  } else if (blogs.length === 1) {
    return blogs[0].likes;
  }
  const mappedList = blogs.map(blog => blog.likes);
  return mappedList.reduce((items, sum) => items + sum);
};

const favoriteBlog = blogs => {
  const fav = blogs.reduce((prevBlog, nextBlog) => prevBlog.likes > nextBlog.likes ? prevBlog : nextBlog);

  return {
    title: fav.title,
    author: fav.author,
    likes: fav.likes
  };
};


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};