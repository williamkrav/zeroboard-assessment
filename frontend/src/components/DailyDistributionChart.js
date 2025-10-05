import React from 'react';
import { Card, Progress } from 'antd';

const DailyDistributionChart = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return (
      <Card title="Daily Distribution">
        <p>No data available</p>
      </Card>
    );
  }

  const maxCount = Math.max(...Object.values(data));

  return (
    <Card title="Daily Distribution">
      {Object.entries(data)
        .sort((a, b) => new Date(a[0]) - new Date(b[0]))
        .map(([date, count]) => {
          const percent = maxCount > 0 ? (count / maxCount) * 100 : 0;
          return (
            <div key={date} style={{ marginBottom: '12px' }}>
              <div style={{ marginBottom: '4px' }}>
                <strong>{date}</strong>: {count} logs
              </div>
              <Progress percent={Math.round(percent)} showInfo={false} />
            </div>
          );
        })}
    </Card>
  );
};

export default DailyDistributionChart;
