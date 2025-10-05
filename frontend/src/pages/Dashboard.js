import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Form, Select, DatePicker, Row, Col, Spin, Alert } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import config from '../config';
import { LOG_LEVEL_OPTIONS, LOG_SOURCE_OPTIONS } from '../constants';

const { Option } = Select;
const { RangePicker } = DatePicker;

const Dashboard = () => {
  const [form] = Form.useForm();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = async (params = {}) => {
    try {
      setLoading(true);
      const formValues = form.getFieldsValue();
      const queryParams = {
        ...formValues,
        ...params,
      };

      if (formValues.dateRange && formValues.dateRange.length === 2) {
        queryParams.start_date = formValues.dateRange[0].toISOString();
        queryParams.end_date = formValues.dateRange[1].toISOString();
        delete queryParams.dateRange;
      }

      const response = await axios.get(
        `${config.API_URL}/api/logs/search/aggregate`,
        { params: queryParams }
      );

      setStats(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSearch = () => {
    fetchStats();
  };

  const handleReset = () => {
    form.resetFields();
    fetchStats();
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
        <h1 style={{ margin: 0 }}>Logs Dashboard</h1>
        <Button>
          <Link to="/">Back to Logs</Link>
        </Button>
      </div>

      <Card title="Filter Data" style={{ marginBottom: '20px' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSearch}
          initialValues={{
            dateRange: [dayjs().subtract(1, 'day'), dayjs()],
          }}
        >
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item label="Date Range" name="dateRange">
                <RangePicker
                  style={{ width: '100%' }}
                  showTime={{ format: 'HH:mm:ss' }}
                  format="YYYY-MM-DD HH:mm:ss"
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Level" name="level">
                <Select allowClear>
                  <Option value="all" value="">
                    ALL
                  </Option>
                  {LOG_LEVEL_OPTIONS.map(option => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Source" name="source">
                <Select allowClear>
                  <Option value="all" value="">
                    ALL
                  </Option>
                  {LOG_SOURCE_OPTIONS.map(option => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Actions" style={{ marginBottom: 0 }}>
                <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}>
                  Search
                </Button>
                <Button onClick={handleReset}>Reset</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {loading && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Spin size="large" />
        </div>
      )}

      {error && (
        <Alert message={error} type="error" style={{ marginBottom: '20px' }} />
      )}

      {stats && !loading && (
        <Card title="Log Statistics">
          <div style={{ marginBottom: '20px' }}>
            <strong>Total Logs:</strong> {stats.total_logs}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <strong>Logs by Level:</strong>
            {Object.entries(stats.level_counts).map(([level, count]) => (
              <div key={level} style={{ marginBottom: '8px', marginLeft: '16px' }}>
                {level}: {count}
              </div>
            ))}
          </div>

          <div>
            <strong>Logs by Source:</strong>
            {Object.entries(stats.source_counts).map(([source, count]) => (
              <div key={source} style={{ marginBottom: '8px', marginLeft: '16px' }}>
                {source}: {count}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
