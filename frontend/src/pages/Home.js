import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/logs/search/simple', {
          params: {
            start_date: '2024-01-01T00:00:00',
            end_date: '2024-01-31T23:59:59',
            level: 'ERROR',
            source: 'api',
            skip: 0,
            limit: 10
          }
        });
        setLogs(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching logs:', error);
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Search logs</h1>

      <div style={{ marginTop: '20px', textAlign: 'left' }}>
        <h2>API Response:</h2>
        {loading ? (
          <p>Loading logs...</p>
        ) : (
          <div>
            <p>Found {logs.length} logs</p>
            <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
              {JSON.stringify(logs, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <Link to="/logs/123">Go to log</Link>
    </div>
  );
};

export default Home;
