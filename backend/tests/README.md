# Backend Tests

## Overview

This test suite covers the backend API routes and service layer for the logs dashboard application.

## Test Structure

- `conftest.py` - Test configuration and fixtures (database setup, test client)
- `test_routes.py` - API endpoint tests (19 tests)
- `test_services.py` - Service layer tests (18 tests)

## Running Tests

### Run all tests
```bash
pytest tests/
```

### Run with verbose output
```bash
pytest tests/ -v
```

### Run with coverage report
```bash
pytest tests/ --cov=app --cov-report=term-missing
```

### Run specific test file
```bash
pytest tests/test_routes.py
```

### Run specific test class
```bash
pytest tests/test_routes.py::TestCreateLog
```

### Run specific test
```bash
pytest tests/test_routes.py::TestCreateLog::test_create_log_success
```

## Test Coverage

Current coverage: **91%**

## Test Categories

### Route Tests (`test_routes.py`)
- **Create Log**: Test log creation with valid/invalid data
- **Get Logs**: Test listing logs with pagination
- **Get Log by ID**: Test retrieving single log (success/not found)
- **Update Log**: Test updating logs (full/partial/not found)
- **Delete Log**: Test deleting logs (success/not found)
- **Search Logs**: Test filtering by level, source, text, date range, sorting, pagination
- **Log Stats**: Test aggregated statistics with filters

### Service Tests (`test_services.py`)
- **Create**: Test log creation at service layer
- **Read**: Test retrieving logs with pagination
- **Update**: Test updating logs (full/partial/not found)
- **Delete**: Test deleting logs (success/not found)
- **Search**: Test filtering by level, source, text, date range, sorting
- **Stats**: Test aggregated statistics with filters

## Fixtures

- `db_session` - In-memory SQLite database session for each test
- `client` - FastAPI test client
- `sample_log` - Pre-created log entry for testing
