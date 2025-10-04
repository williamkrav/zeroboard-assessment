import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Hello World!</h1>
      <Link to="/logs/123">Go to log</Link>
    </div>
  );
};

export default Home;
