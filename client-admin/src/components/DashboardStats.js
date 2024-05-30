import React from 'react';

const DashboardStats = ({ title, count }) => {
  return (
    <div className="dashboard-stat">
      <h3>{title}</h3>
      <p>Total: {count}</p>
    </div>
  );
};

export default DashboardStats;