from fastapi import FastAPI
from config import API_HOST, API_PORT, DEBUG
from app.database import engine
from app.models import Base
from app.routes import logs

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Logs Dashboard API",
    description="A simple logs management API for assessment",
    version="1.0.0",
    debug=DEBUG
)

app.include_router(logs.router, prefix="/api/logs", tags=["logs"])
@app.get("/")
async def root():
    return {"message": "Logs Dashboard API is running!", "docs": "/docs"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "logs-dashboard"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=API_HOST, port=API_PORT, reload=DEBUG)
