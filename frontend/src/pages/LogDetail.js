import React from 'react';
import { useParams, Link } from 'react-router-dom';

const LogDetail = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Hello World!</h1>
      <h2>Log Detail</h2>
      <p>Log ID: {id}</p>
      <Link to="/">← Back to Home</Link>
    </div>
  );
};

export default LogDetail;
