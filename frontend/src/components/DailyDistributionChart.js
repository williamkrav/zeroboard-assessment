import React from 'react';
import { Card } from 'antd';
import { Column } from '@ant-design/plots';

const DailyDistributionChart = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <Card title="Daily Distribution">
        <p>No data available</p>
      </Card>
    );
  }

  const chartData = Object.entries(data)
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
    .map(([date, count]) => ({
      date,
      count,
    }));

  const config = {
    data: chartData,
    xField: 'date',
    yField: 'count',
  };

  return (
    <Card title="Daily Distribution">
      <Column {...config} />
    </Card>
  );
};

export default DailyDistributionChart;
