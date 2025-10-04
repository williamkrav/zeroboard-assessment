import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Select, DatePicker, Table, Card, Row, Col } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import config from '../config';
import { LOG_LEVEL_OPTIONS, LOG_SOURCE_OPTIONS, LOG_LEVELS, LOG_SOURCES } from '../constants';

const { Option } = Select;
const { RangePicker } = DatePicker;

const Home = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortOrder, setSortOrder] = useState('desc');
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const fetchLogs = async (params = {}) => {
    try {
      setLoading(true);
      const formValues = form.getFieldsValue();
      const queryParams = {
        skip: (currentPage - 1) * pageSize,
        limit: pageSize,
        sort_by: 'timestamp',
        sort_order: sortOrder,
        ...formValues,
        ...params,
      };

      if (formValues.dateRange && formValues.dateRange.length === 2) {
        queryParams.start_date = formValues.dateRange[0].toISOString();
        queryParams.end_date = formValues.dateRange[1].toISOString();
        delete queryParams.dateRange;
      }

      const response = await axios.get(
        `${config.API_URL}/api/logs/search/simple`,
        { params: queryParams }
      );

      setLogs(response.data.data);
      setTotal(response.data.data.length);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching logs:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [currentPage, pageSize]);

  const handleCreateLog = () => {
    navigate('/create-logs');
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchLogs();
  };

  const handleReset = () => {
    form.resetFields();
    setCurrentPage(1);
    setSortOrder('desc');
    fetchLogs();
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const columns = [
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      width: 100,
      render: (level) => (
        <span style={{
          color: level === 'ERROR' ? 'red' :
                level === 'WARNING' ? 'orange' :
                level === 'INFO' ? 'blue' : 'green'
        }}>
          {level}
        </span>
      ),
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      ellipsis: true,
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
      width: 120,
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 180,
      render: (timestamp) => dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss'),
    },
  ];

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
        <Button type="primary" onClick={handleCreateLog}>
          Create New Log
        </Button>
      </div>

      <Card title="Search Filters" style={{ marginBottom: '20px' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSearch}
          initialValues={{
            dateRange: [dayjs().subtract(1, 'day'), dayjs()],
            level: LOG_LEVELS.INFO,
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
                  {LOG_SOURCE_OPTIONS.map(option => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Message Text" name="text">
                <Input allowClear placeholder="Search in message..." />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Sort Order">
                <Select value={sortOrder} onChange={setSortOrder}>
                  <Option value="desc">Newest First</Option>
                  <Option value="asc">Oldest First</Option>
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

      <Card title="Logs">
        <Table
          columns={columns}
          dataSource={logs}
          loading={loading}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} logs`,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          onChange={handleTableChange}
          scroll={{ x: 800 }}
        />
      </Card>
    </div>
  );
};

export default Home;
