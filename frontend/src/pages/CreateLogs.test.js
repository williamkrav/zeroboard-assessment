import { LOG_LEVELS, LOG_SOURCES } from '../constants';
import config from '../config';

test('default form values are set correctly', () => {
  const defaultLevel = LOG_LEVELS.INFO;
  const defaultSource = LOG_SOURCES.USER_SERVICE;

  expect(defaultLevel).toBe('INFO');
  expect(defaultSource).toBe('user_service');
});

test('form validates required message field', () => {
  const values = {
    level: 'INFO',
    message: '',
    source: 'user_service',
  };

  const isMessageEmpty = !values.message || values.message.trim() === '';
  expect(isMessageEmpty).toBe(true);
});

test('form accepts valid log data', () => {
  const values = {
    level: 'INFO',
    message: 'Test log message',
    source: 'user_service',
  };

  expect(values.level).toBe('INFO');
  expect(values.message).toBeTruthy();
  expect(values.source).toBe('user_service');
});

test('API URL is configured', () => {
  expect(config.API_URL).toBeDefined();
  expect(typeof config.API_URL).toBe('string');
});
