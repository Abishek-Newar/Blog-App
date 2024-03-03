import React from 'react'
import BlogCard from '../Components/BlogCard'

const Blog = () => {
  return (
    <div>
      <BlogCard
      authorName = {"Abishek"}
      title = {"title of blog"}
      content = {"content of the blog"}
      publishedDate = {" 2nd Feb 2024"} />
    </div>
  )
}

export default Blog