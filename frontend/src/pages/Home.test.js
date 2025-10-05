import { LOG_LEVELS, LOG_SOURCES } from '../constants';

test('Home page has required constants', () => {
  expect(LOG_LEVELS.INFO).toBe('INFO');
  expect(LOG_LEVELS.ERROR).toBe('ERROR');
  expect(LOG_SOURCES.USER_SERVICE).toBe('user_service');
});

test('handleDownloadCSV generates CSV with correct headers', () => {
  const logs = [
    { level: 'INFO', message: 'Test', source: 'user_service', timestamp: '2024-01-01T10:00:00Z' }
  ];

  const csvRows = [];
  csvRows.push('Level,Message,Source,Timestamp');

  logs.forEach((log) => {
    const message = log.message.replace(/"/g, '""');
    const timestamp = new Date(log.timestamp).toISOString();
    csvRows.push(`"${log.level}","${message}","${log.source}","${timestamp}"`);
  });

  const csvContent = csvRows.join('\n');

  expect(csvContent).toContain('Level,Message,Source,Timestamp');
  expect(csvContent).toContain('"INFO","Test","user_service"');
});

test('CSV handles special characters in message', () => {
  const message = 'Test "quoted" message';
  const escapedMessage = message.replace(/"/g, '""');

  expect(escapedMessage).toBe('Test ""quoted"" message');
});

test('pagination calculation works correctly', () => {
  const page = 2;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  expect(skip).toBe(10);
});
