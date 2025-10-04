import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Select, DatePicker, Button, Card } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

const CreateLogs = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log('Form values:', values);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Card title="Create New Log">
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Level" name="level">
            <Select>
              <Option value="INFO">INFO</Option>
              <Option value="WARNING">WARNING</Option>
              <Option value="ERROR">ERROR</Option>
              <Option value="DEBUG">DEBUG</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Message" name="message">
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item label="Source" name="source">
            <Input />
          </Form.Item>

          <Form.Item label="Endpoint" name="endpoint">
            <Input />
          </Form.Item>

          <Form.Item label="IP Address" name="ip_address">
            <Input />
          </Form.Item>

          <Form.Item label="Timestamp" name="timestamp">
            <DatePicker showTime style={{ width: '100%' }} />
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
