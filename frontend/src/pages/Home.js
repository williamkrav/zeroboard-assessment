import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import axios from 'axios';

const Home = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/logs/search/simple`,
          {
            params: {
              start_date: '2024-01-01T00:00:00',
              end_date: '2024-01-31T23:59:59',
              level: 'ERROR',
              source: 'api',
              skip: 0,
              limit: 10,
            },
          }
        );
        setLogs(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching logs:', error);
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const handleCreateLog = () => {
    navigate('/create-logs');
  };

  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <h1 style={{ margin: 0 }}>Search logs</h1>
        <Button type="primary" onClick={handleCreateLog}>
          Create New Log
        </Button>
      </div>

      <div style={{ textAlign: 'left' }}>
        <h2>API Response:</h2>
        {loading ? (
          <p>Loading logs...</p>
        ) : (
          <div>
            <p>Found {logs.length} logs</p>
            <pre
              style={{
                background: '#f5f5f5',
                padding: '10px',
                overflow: 'auto',
              }}
            >
              {JSON.stringify(logs, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="/logs/123">Go to log</Link>
      </div>
    </div>
  );
};

export default Home;
