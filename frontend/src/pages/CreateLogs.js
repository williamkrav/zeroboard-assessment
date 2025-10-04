import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Select, DatePicker, Button, Card } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import config from '../config';

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
          initialValues={{ level: 'INFO', timestamp: dayjs() }}
        >
          <Form.Item label="Level" name="level">
            <Select defaultValue="INFO">
              <Option value="INFO">INFO</Option>
              <Option value="WARNING">WARNING</Option>
              <Option value="ERROR">ERROR</Option>
              <Option value="DEBUG">DEBUG</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: 'Please enter log message' }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Source"
            name="source"
            rules={[{ required: true, message: 'Please enter log source' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Endpoint"
            name="endpoint"
            rules={[{ required: true, message: 'Please enter log endpoint' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="IP Address"
            name="ip_address"
            rules={[{ required: true, message: 'Please enter log IP address' }]}
          >
            <Input />
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
