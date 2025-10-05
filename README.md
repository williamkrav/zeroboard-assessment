# Logs Dashboard

## This repo consist of

### **Backend**:
- My backend Python application using FastAPI framework because it is simple and fast framework to build a simple application like this assessment.
- I use PostgreSQL as database because its ACID property helps the application more stable, and put it into dockerfile to make it easier to use and test in any computer
- I use SQLAlchemy as ORM to make SQL query simpler and Alembic as migration tool to make the migration process easier and can be up and down anytime

### **Frontend**:
- My frontend Javascript application using ReactJS framework to make it easier to create dynamic webpage, handle re-render and modularization
- I use ANTD component library because it is simple, clean, and easy to use

## Requirements
- Python 3.12.0
- Node.js 22.14.0
- Docker (for PostgreSQL)
A simple web application for managing and analyzing logs with FastAPI backend and React frontend.

## How to run

```bash
# Setup version backend
make setup-versions

# Setup version frontend
make setup-versions-frontend

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

## API docs
- Swagger: http://localhost:8000/docs
- I also have put postman collection to make it easier for testing the API

## Run Unit Test
```bash
# Run backend test
make test

# Run frontend test
make test-frontend
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
