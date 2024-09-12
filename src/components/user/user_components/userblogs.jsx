import React, { useEffect, useState } from 'react';
import MyQuillComponent from './blogs.jsx';
import api from '../../api/api';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { format } from 'date-fns';
import { motion } from 'framer-motion'; // Import Framer Motion for animations

ChartJS.register(...registerables);

export function BlogChart({ blogs }) {
  const [loading, setLoading] = useState(true); // Add loading state
  const dateCounts = {};
  const totalBlogs = [];
  const averageLengths = [];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  blogs.forEach((blog) => {
    const date = format(new Date(blog.created_at), 'yyyy-MM-dd');

    if (dateCounts[date]) {
      dateCounts[date]++;
    } else {
      dateCounts[date] = 1;
    }

    const total = Object.values(dateCounts).reduce((acc, curr) => acc + curr, 0);
    totalBlogs.push(total);

    const averageLength = total > 0 ? blog.content.length / total : 0;
    averageLengths.push(averageLength);
  });

  const labels = Object.keys(dateCounts);
  const data = Object.values(dateCounts);

  const totalBlogsData = {
    labels: labels,
    datasets: [
      {
        label: '# of Blogs',
        data: data,
        fill: false,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointRadius: 5,
      },
    ],
  };

  const averageLengthsData = {
    labels: labels,
    datasets: [
      {
        label: 'Average Length',
        data: averageLengths,
        fill: false,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
      },
    ],
  };

  return loading ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <dotlottie-player
        src="https://lottie.host/77580511-52c6-4a32-9443-bd0afeca94de/lahvDZbYZw.json"
        background="transparent"
        speed="1"
        style={{ width: '300px', height: '300px' }}
        loop
        autoplay
      />
      <dotlottie-player
        src="https://lottie.host/712dd4ea-f0c2-4481-9c82-a25e02b5db4d/DpxfliG9wd.json"
        background="transparent"
        speed="1"
        style={{ width: '300px', height: '300px' }}
        loop
        autoplay
      />
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="chart-card bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6 rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold mb-4 text-white">Total Number of Blogs Over Time</h2>
        <Line data={totalBlogsData} />
        <p className="text-sm text-gray-100 mt-2">Explore the journey of blog creation over time.</p>
      </div>
      <div className="chart-card bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold mb-4 text-white">Average Length of Blogs Over Time</h2>
        <Bar data={averageLengthsData} />
        <p className="text-sm text-gray-100 mt-2">Discover the evolution of blog length over time.</p>
      </div>
    </div>
  );
}

export function UserBlogs({ blogs, fetchBlogs }) {
  const [editingBlog, setEditingBlog] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleEditClick = (blog) => {
    setEditingBlog(blog);
  };

  const handleReadClick = (blog) => {
    setSelectedBlog(blog);
  };

  const handleDeleteClick = async (blogId) => {
    try {
      await api.delete(`/blogs/${blogId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog', error);
    }
  };

  const handleBlogUpdate = async (updatedContent) => {
    try {
      await api.put(
        `/blogs/${editingBlog.id}/`,
        {
          title: editingBlog.title,
          content: updatedContent,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      setEditingBlog(null);
      fetchBlogs();
    } catch (error) {
      console.error('Error updating blog', error);
    }
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 dark:bg-gray-900">
      {editingBlog ? (
        <MyQuillComponent initialContent={editingBlog.content} onSubmit={handleBlogUpdate} />
      ) : selectedBlog ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 dark:bg-opacity-75"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 hover:text-gray-800"
            >
              ✖
            </button>
            <h2 className="text-3xl font-bold mb-4 text-center dark:text-gray-200">{selectedBlog.title}</h2>
            <img
              src={selectedBlog.title_image}
              alt="Title"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <div className="text-gray-700 dark:text-gray-300 text-lg mb-4" dangerouslySetInnerHTML={{ __html: selectedBlog.content }} />
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setSelectedBlog(null)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Close
              </button>
              <button
                onClick={() => handleEditClick(selectedBlog)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(selectedBlog.id)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        blogs.map((blog) => (
          <motion.div
            key={blog.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition duration-300"
          >
            <div className="relative">
              <img src={blog.title_image} alt={blog.title} className="w-full h-48 object-cover" />
              <div className="absolute bottom-0 bg-gradient-to-t from-black to-transparent p-4 text-white">
                <h2 className="text-2xl font-semibold">{blog.title}</h2>
                <p className="text-sm">by {blog.author.username}</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => handleReadClick(blog)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                >
                  Read
                </button>
                <button
                  onClick={() => handleEditClick(blog)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(blog.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
}

export default UserBlogs;
