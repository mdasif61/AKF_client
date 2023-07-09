import React from 'react';
import useTitle from '../hooks/useTitle';
import useAllBlogs from '../hooks/useAllBlogs';
import Container from '../Container';

const Blog = () => {
  useTitle('Blog')
  const { allBlog } = useAllBlogs()
  return (
    <div>
      <Container>
        Total Blogs {allBlog.length}
      </Container>
    </div>
  );
};

export default Blog;