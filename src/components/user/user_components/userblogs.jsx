import React, { useEffect, useState } from 'react';
import MyQuillComponent from './blogs.jsx';
import api from '../../api/api';
import { Line , Bar } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { format } from 'date-fns';
import { FaLessThan } from 'react-icons/fa';

ChartJS.register(...registerables);

export function BlogChart({ blogs }) {
  // Prepare data for the chart
  const [loading, setLoading] = useState(true); // Add loading state
  const dateCounts = {};
  const totalBlogs = [];
  const averageLengths = [];

  useEffect(() => {
    // Set a timeout to stop the loading after 8 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 8 seconds

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  // Prepare data for the chart
  blogs.forEach((blog) => {
    const date = format(new Date(blog.created_at), 'yyyy-MM-dd');

    // Total number of blogs over time
    if (dateCounts[date]) {
      dateCounts[date]++;
    } else {
      dateCounts[date] = 1;
    }

    // Calculate total number of blogs at each date
    const total = Object.values(dateCounts).reduce((acc, curr) => acc + curr, 0);
    totalBlogs.push(total);

    // Calculate average length of blogs at each date
    const averageLength = total > 0 ? blog.content.length / total : 0;
    averageLengths.push(averageLength);
  });

  // Generate labels for the chart
  const labels = Object.keys(dateCounts);
  const data = Object.values(dateCounts);

  // Data for total number of blogs chart
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

  // Data for average length of blogs chart
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

  // Unique spinning meter loading animation
  const SpinningLoader = () => (
    <div className="spinning-loader">
      <div className="spinner"></div>
      <p>Loading charts, please wait...</p>
      <style jsx>{`
        .spinning-loader {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 200px; /* Adjust as needed */
        }
        .spinner {
          width: 50px;
          height: 50px;
          border: 6px solid rgba(0, 0, 0, 0.1);
          border-top-color: #3498db; /* Blue color */
          border-radius: 50%;
          animation: spin 2s linear infinite, colorChange 8s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes colorChange {
          0% {
            border-top-color: #3498db; /* Blue */
          }
          25% {
            border-top-color: #e67e22; /* Orange */
          }
          50% {
            border-top-color: #e74c3c; /* Red */
          }
          75% {
            border-top-color: #9b59b6; /* Purple */
          }
          100% {
            border-top-color: #3498db; /* Blue */
          }
        }
      `}</style>
    </div>
  );

  return loading ? (
    <SpinningLoader />
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="chart-card bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-white">Total Number of Blogs Over Time</h2>
        <Line data={totalBlogsData} />
        <p className="text-sm text-gray-100 mt-2">Explore the journey of blog creation over time.</p>
      </div>
      <div className="chart-card bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg shadow-md">
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
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog', error);
    }
  };

  const handleBlogUpdate = async (updatedContent) => {
    try {
      await api.put(`/blogs/${editingBlog.id}/`, {
        title: editingBlog.title,
        content: updatedContent
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setEditingBlog(null);
      fetchBlogs();
    } catch (error) {
      console.error('Error updating blog', error);
    }
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {editingBlog ? (
        <MyQuillComponent initialContent={editingBlog.content} onSubmit={handleBlogUpdate} />
      ) : selectedBlog ? (
        <div className="modal">
          <div className="modal-content">
            <h2 className="text-2xl font-bold mb-2">{selectedBlog.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: selectedBlog.content }} />
            <div className="btn-group">
              <button onClick={() => setSelectedBlog(null)}>Close</button>
              <button onClick={() => handleEditClick(selectedBlog)}>Edit</button>
              <button onClick={() => handleDeleteClick(selectedBlog.id)}>Delete</button>
            </div>
          </div>
        </div>
      ) : (
        blogs.map(blog => (
          <div key={blog.id} className="card">
            <h2 className="text-xl font-bold mb-2">{blog.title} by {blog.author.username}</h2>
            <div className="btn-group">
              <button onClick={() => handleReadClick(blog)}>Read</button>
              <button onClick={() => handleEditClick(blog)}>Edit</button>
              <button onClick={() => handleDeleteClick(blog.id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}