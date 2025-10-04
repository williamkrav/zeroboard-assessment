.PHONY: install run migrate-up migrate-down db-start db-stop lint format check setup-hooks

install:
	cd backend && pip install -r requirements.txt

run:
	cd backend && uvicorn main:app --reload --host 0.0.0.0 --port 8000

migrate-up:
	cd backend && alembic upgrade head

migrate-down:
	cd backend && alembic downgrade -1

db-start:
	docker-compose up -d

db-stop:
	docker-compose down

lint:
	cd backend && flake8 .
	cd backend && pylint app/

format:
	cd backend && black .
	cd backend && isort .

check:
	cd backend && mypy app/

setup-hooks:
	pre-commit install
