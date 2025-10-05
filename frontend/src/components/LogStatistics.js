import React from 'react';
import { Card } from 'antd';

const LogStatistics = ({ stats }) => {
  if (!stats) {
    return null;
  }

  return (
    <Card title="Log Statistics" style={{ marginBottom: '20px' }}>
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
  );
};

export default LogStatistics;
