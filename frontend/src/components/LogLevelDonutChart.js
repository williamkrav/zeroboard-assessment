import React from 'react';
import { Card } from 'antd';
import { Pie } from '@ant-design/plots';

const LogLevelDonutChart = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <Card title="Level Distribution Donut Chart">
        <p>No data available</p>
      </Card>
    );
  }

  const chartData = Object.entries(data).map(([level, count]) => ({
    level,
    count,
  }));

  const config = {
    data: chartData,
    angleField: 'count',
    colorField: 'level',
    innerRadius: 0.6,
    label: {
      text: 'count',
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
    annotations: [
      {
        type: 'text',
        style: {
          text: `Total\n${chartData.reduce((sum, item) => sum + item.count, 0)}`,
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 16,
          fontStyle: 'bold',
        },
      },
    ],
  };

  return (
    <Card title="Level Distribution Donut Chart" style={{ marginBottom: '20px' }}>
      <Pie {...config} />
    </Card>
  );
};

export default LogLevelDonutChart;
