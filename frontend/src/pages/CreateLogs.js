import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Select, DatePicker, Button, Card } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import config from '../config';
import { LOG_LEVEL_OPTIONS, LOG_SOURCE_OPTIONS, LOG_LEVELS, LOG_SOURCES } from '../constants';

const { Option } = Select;
const { TextArea } = Input;

const CreateLogs = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(`${config.API_URL}/api/logs/`, values);
      console.log('Log created:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error creating log:', error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Card title="Create New Log">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            level: LOG_LEVELS.INFO,
            timestamp: dayjs(),
            source: LOG_SOURCES.USER_SERVICE,
          }}
        >
          <Form.Item label="Level" name="level">
            <Select defaultValue={LOG_LEVELS.INFO}>
              {LOG_LEVEL_OPTIONS.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: 'Please enter log message' }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item label="Source" name="source">
            <Select defaultValue={LOG_SOURCES.USER_SERVICE}>
              {LOG_SOURCE_OPTIONS.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Timestamp"
            name="timestamp"
            rules={[{ required: true, message: 'Please enter log timestamp' }]}
          >
            <DatePicker
              defaultValue={dayjs()}
              showTime
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: '10px' }}
            >
              Create Log
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateLogs;
