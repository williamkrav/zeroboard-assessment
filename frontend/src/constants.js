export const LOG_LEVELS = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
};

export const LOG_SOURCES = {
  USER_SERVICE: 'user_service',
  ORDER_SERVICE: 'order_service',
};

export const LOG_SOURCE_OPTIONS = [
  { value: LOG_SOURCES.USER_SERVICE, label: 'User Service' },
  { value: LOG_SOURCES.ORDER_SERVICE, label: 'Order Service' },
];

export const LOG_LEVEL_OPTIONS = [
  { value: LOG_LEVELS.DEBUG, label: 'DEBUG' },
  { value: LOG_LEVELS.INFO, label: 'INFO' },
  { value: LOG_LEVELS.WARNING, label: 'WARNING' },
  { value: LOG_LEVELS.ERROR, label: 'ERROR' },
];
