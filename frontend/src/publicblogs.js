import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion'; // for animations
import { Boxes } from './ui/background-boxes';
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";


// BlogDetails.js
function BlogDetails({ blog, onBack }) {
  return (
    <div className="mt-8">
  <button onClick={onBack} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-black-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black-500">
    <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  </button>
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
  <h2 className="text-2xl font-extrabold text-gray-900">{blog.title}</h2>
  <p className="mt-1 text-sm text-gray-500">By {blog.author.username}</p>
  <div className="mt-4 prose prose-sm text-gray-500 prose-indigo">
    <p>{blog.description}</p>
    <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
  </div>
</div>
  
</div>
  );
}

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState([]);
  const [darkMode, setDarkMode] = useState(true); // Initially set to dark mode
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get('https://075dhm4s-8000.inc1.devtunnels.ms/api/blogs/')
      .then(response => {
        setBlogs(response.data);
        // Extract unique tags from blogs
        const allTags = response.data.reduce((acc, blog) => {
          return [...acc, ...blog.tags];
        }, []);
        setTags([...new Set(allTags)]);
        setIsLoading(false); // Add this line
      })
      .catch(error => {
        console.error('There was an error!', error);
        setIsLoading(false); // Add this line
      });
  }, []);
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 w-52">
  <div className="flex gap-4 items-center">
    <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
    <div className="flex flex-col gap-4">
      <div className="skeleton h-4 w-20"></div>
      <div className="skeleton h-4 w-28"></div>
    </div>
  </div>
  <div className="skeleton h-32 w-full"></div>
</div>
    );
  }

  if (selectedBlog) {
    return <BlogDetails blog={selectedBlog} onBack={() => setSelectedBlog(null)} />;
  }

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTagClick = (tag) => {
    setSearchTerm(tag);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleReadMore = (blog) => {
    setSelectedBlog(selectedBlog === blog ? null : blog);
  };

  if (selectedBlog) {
    return <BlogDetails blog={selectedBlog} onBack={() => setSelectedBlog(null)} />;
  }

    return (
      <div className={`bg-${darkMode ? 'gray-900' : 'white'} text-${darkMode ? 'white' : 'gray-900'} `}>
  <Header className="fixed top-0 left-0 right-0 z-50" />
  <div className="relative h-screen w-screen overflow-hidden">
    <Boxes className="absolute inset-0 z-10" />
    <div className="container mx-auto px-4 py-20 relative z-20">
      <div className="my-6">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full px-4 py-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-full border-2 border-${darkMode ? 'gray-700' : 'gray-300'} focus:outline-none focus:border-blue-500`}
        />
      </div>

      <div className="flex flex-wrap mb-4">
        {tags.map(tag => (
          <button
            key={tag}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${darkMode ? 'dark-mode-btn' : ''} mr-2 mb-2`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <button
        className={`mt-6 bg-${darkMode ? 'gray-700' : 'gray-200'} hover:bg-${darkMode ? 'gray-600' : 'gray-300'} text-${darkMode ? 'white' : 'gray-900'} font-bold py-2 px-4 rounded-full`}
        onClick={toggleDarkMode}
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <BentoGrid className="max-w-4xl mx-auto">
        {blogs.map((blog, i) => (
          <BentoGridItem
            key={i}
            title={blog.title}
            description={blog.description}
            header={ <img
              src={blog.imageUrl ? blog.imageUrl : "https://cdn.activestate.com/wp-content/uploads/2014/07/best-coding-fonts-blog-hero.jpg"}
              alt={blog.title}
            />}
            icon={<IconFileBroken className="h-4 w-4 text-neutral-500" />}
            className={i === 2 || i === 6 ? "md:col-span-2" : ""}
            onClick={() => handleBlogClick(blog)}
          />
        ))}
      </BentoGrid>
    </div>
</div>

    <Footer className="mt-auto" />
    <button
      className={`fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${darkMode ? 'dark-mode-btn' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      Back to Top
    </button>
  </div>
    );
  }

export default BlogList;
