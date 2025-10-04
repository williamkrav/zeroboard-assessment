import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, Button, Spin, Alert, Form, Input, Select, Modal } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import config from '../config';
import { LOG_LEVEL_OPTIONS, LOG_SOURCE_OPTIONS } from '../constants';

const { Option } = Select;
const { TextArea } = Input;

const LogDetail = () => {
  const { id } = useParams();
  const [log, setLog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${config.API_URL}/api/logs/${id}`);
        setLog(response.data.data);
        form.setFieldsValue({
          level: response.data.data.level,
          message: response.data.data.message,
          source: response.data.data.source
        });
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

  const handleUpdate = async (values) => {
    try {
      setUpdateLoading(true);
      const response = await axios.put(`${config.API_URL}/api/logs/${id}`, values);
      setLog(response.data.data);
      console.log('Log updated:', response.data);
    } catch (error) {
      console.error('Error updating log:', error);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleteLoading(true);
      await axios.delete(`${config.API_URL}/api/logs/${id}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting log:', error);
    } finally {
      setDeleteLoading(false);
      setShowDeleteModal(false);
    }
  };

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
        <div>
          <Button
            danger
            loading={deleteLoading}
            onClick={handleDelete}
            style={{ marginRight: '8px' }}
          >
            Delete
          </Button>
          <Button>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
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

      <Card title="Update Log" style={{ marginTop: '20px' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdate}
        >
          <Form.Item label="Level" name="level">
            <Select>
              {LOG_LEVEL_OPTIONS.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Message" name="message">
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item label="Source" name="source">
            <Select>
              {LOG_SOURCE_OPTIONS.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={updateLoading}
              style={{ marginRight: '10px' }}
            >
              Update Log
            </Button>
            <Button onClick={() => form.resetFields()}>Reset</Button>
          </Form.Item>
        </Form>
      </Card>

      <Modal
        title="Delete Log"
        open={showDeleteModal}
        onOk={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true, loading: deleteLoading }}
      >
        <p>Are you sure you want to delete this log?</p>
      </Modal>
    </div>
  );
};

export default LogDetail;
