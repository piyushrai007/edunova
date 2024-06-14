import React, { useState } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import './DummyChartsComponent.css'; // Import CSS for styling

const DummyChartsComponent = () => {
  // Sample data
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const attendanceData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Attendance',
        data: [80, 85, 90, 95], // Sample attendance percentages
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const performanceData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Performance',
        data: [70, 75, 80, 85], // Sample performance scores
        fill: false,
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
      },
    ],
  };

  const submissionData = {
    labels: ['Assignment 1', 'Assignment 2', 'Assignment 3'],
    datasets: [
      {
        label: 'Submissions',
        data: [50, 60, 70], // Sample submission counts
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const scoreData = {
    labels: ['A', 'B', 'C', 'D', 'F'],
    datasets: [
      {
        label: 'Past Assignment Scores',
        data: [20, 30, 25, 15, 10], // Sample score distribution
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)'],
        borderWidth: 1,
      },
    ],
  };

  const handleHover = (index) => {
    setHoveredIndex(index);
  };

  const handleLeave = () => {
    setHoveredIndex(null);
  };

  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (context.dataset.data[context.dataIndex]) {
              label += `: ${context.dataset.data[context.dataIndex]}`;
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="dashboard">
      <div className="chart-card">
        <h2 className="chart-title">Student Attendance</h2>
        <div className="chart-container" onMouseLeave={handleLeave}>
          <Line data={attendanceData} options={chartOptions} />
        </div>
      </div>
      <div className="chart-card">
        <h2 className="chart-title">Student Performance</h2>
        <div className="chart-container" onMouseLeave={handleLeave}>
          <Line data={performanceData} options={chartOptions} />
        </div>
      </div>
      <div className="chart-card">
        <h2 className="chart-title">Assignment Submissions</h2>
        <div className="chart-container" onMouseLeave={handleLeave}>
          <Bar data={submissionData} options={chartOptions} />
        </div>
      </div>
      <div className="chart-card">
        <h2 className="chart-title">Past Assignment Scores Distribution</h2>
        <div className="chart-container" onMouseLeave={handleLeave}>
          <Pie data={scoreData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default DummyChartsComponent;
