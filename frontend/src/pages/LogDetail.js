import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button, Spin, Alert } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import config from '../config';

const LogDetail = () => {
  const { id } = useParams();
  const [log, setLog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${config.API_URL}/api/logs/${id}`);
        setLog(response.data.data);
        setError(null);
      } catch (err) {
        setError('Failed to load log details');
        console.error('Error fetching log:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLog();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <Alert message={error} type="error" />
        <Button style={{ marginTop: '16px' }}>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  if (!log) {
    return (
      <div style={{ padding: '20px' }}>
        <Alert message="Log not found" type="warning" />
        <Button style={{ marginTop: '16px' }}>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <Card title="Log Details" extra={
        <Button>
          <Link to="/">Back to Home</Link>
        </Button>
      }>
        <div style={{ marginBottom: '16px' }}>
          <strong>ID:</strong> {log.id}
        </div>
        <div style={{ marginBottom: '16px' }}>
          <strong>Level:</strong>
          <span style={{
            color: log.level === 'ERROR' ? 'red' :
                  log.level === 'WARNING' ? 'orange' :
                  log.level === 'INFO' ? 'blue' : 'green',
            marginLeft: '8px'
          }}>
            {log.level}
          </span>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <strong>Message:</strong> {log.message}
        </div>
        <div style={{ marginBottom: '16px' }}>
          <strong>Source:</strong> {log.source}
        </div>
        <div style={{ marginBottom: '16px' }}>
          <strong>Timestamp:</strong> {dayjs(log.timestamp).format('YYYY-MM-DD HH:mm:ss')}
        </div>
      </Card>
    </div>
  );
};

export default LogDetail;
