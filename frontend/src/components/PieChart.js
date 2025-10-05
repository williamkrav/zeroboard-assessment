import React from 'react';
import { Card } from 'antd';
import { Pie } from '@ant-design/plots';

const PieChart = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <Card title="Source Distribution">
        <p>No data available</p>
      </Card>
    );
  }
  const countAllData = Object.values(data).reduce((acc, count) => acc + count, 0);
  const chartData = Object.entries(data).map(([source, count]) => ({
    source,
    count,
  }));

  const config = {
    data: chartData,
    angleField: 'count',
    colorField: 'source',
    label: {
      text: (d) => `${d.source}\n${((d.count / countAllData) * 100).toFixed(1)}%`,
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        title: false,
        position: 'bottom',
        rowPadding: 5,
      },
    },
  };

  return (
    <Card title="Source Distribution" style={{ marginBottom: '20px' }}>
      <Pie {...config} />
    </Card>
  );
};

export default PieChart;
