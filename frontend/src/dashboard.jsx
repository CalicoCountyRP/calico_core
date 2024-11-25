import React, { useEffect } from 'react';

const Dashboard = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const user = params.get('user') ? JSON.parse(params.get('user')) : null;

    if (user) {
      console.log('Logged in user:', user);
    }
  }, []);

  return <div>Welcome to the Dashboard!</div>;
};

export default Dashboard;