# Logs Dashboard


## Requirements
- Python 3.12.0
- Node.js 22.14.0
- Docker (for PostgreSQL)
A simple web application for managing and analyzing logs with FastAPI backend and React frontend.

## What is this?

- **Backend**: FastAPI with PostgreSQL database
- **Frontend**: React with Ant Design components
- **Features**: CRUD operations, log search, analytics dashboard

## How to run

```bash
# Setup verseion
make setup-versions

# Install dependencies
make install

# Start database
make db-start

# Run migrations
make migrate-up

# Start server
make run

# Start React frontend
make run-frontend
```

## Important commands

- `make setup-versions` - Set correct Python and Node versions
- `make install` - Install Python and Node dependencies
- `make db-start` - Start PostgreSQL with Docker
- `make migrate-up` - Run database migrations
- `make run` - Start FastAPI server
- `make run-frontend` - Start React frontend
- `make format` - Format Python code
- `make lint` - Check code quality
- `make setup-hooks` - Install pre-commit hooks
