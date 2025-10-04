.PHONY: install run migrate-up migrate-down db-start db-stop

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
