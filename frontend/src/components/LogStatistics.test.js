import React from 'react';
import { render, screen } from '@testing-library/react';
import LogStatistics from './LogStatistics';

test('renders log statistics with data', () => {
  const mockStats = {
    total_logs: 100,
    level_counts: { INFO: 60, ERROR: 40 },
    source_counts: { user_service: 50, order_service: 50 },
  };

  render(<LogStatistics stats={mockStats} />);

  expect(screen.getByText('Log Statistics')).toBeInTheDocument();
  expect(screen.getByText('Total Logs:')).toBeInTheDocument();
  expect(screen.getByText('100')).toBeInTheDocument();
});

test('displays level counts correctly', () => {
  const mockStats = {
    total_logs: 50,
    level_counts: { INFO: 30, ERROR: 20 },
    source_counts: {},
  };

  render(<LogStatistics stats={mockStats} />);

  expect(screen.getByText('INFO: 30')).toBeInTheDocument();
  expect(screen.getByText('ERROR: 20')).toBeInTheDocument();
});

test('displays source counts correctly', () => {
  const mockStats = {
    total_logs: 50,
    level_counts: {},
    source_counts: { user_service: 25, order_service: 25 },
  };

  render(<LogStatistics stats={mockStats} />);

  expect(screen.getByText('user_service: 25')).toBeInTheDocument();
  expect(screen.getByText('order_service: 25')).toBeInTheDocument();
});
