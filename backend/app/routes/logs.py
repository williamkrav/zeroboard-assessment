from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from ..models import Log
from ..schemas import LogCreate, Log as LogSchema, LogUpdate

router = APIRouter()

@router.post("/", response_model=LogSchema)
def create_log(log: LogCreate, db: Session = Depends(get_db)):
    db_log = Log(**log.dict())
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log

@router.get("/", response_model=List[LogSchema])
def get_logs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    logs = db.query(Log).offset(skip).limit(limit).all()
    return logs

@router.get("/{log_id}", response_model=LogSchema)
def get_log(log_id: int, db: Session = Depends(get_db)):
    log = db.query(Log).filter(Log.id == log_id).first()
    if log is None:
        raise HTTPException(status_code=404, detail="Log not found")
    return log

@router.put("/{log_id}", response_model=LogSchema)
def update_log(log_id: int, log_update: LogUpdate, db: Session = Depends(get_db)):
    log = db.query(Log).filter(Log.id == log_id).first()
    if log is None:
        raise HTTPException(status_code=404, detail="Log not found")
    
    update_data = log_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(log, field, value)
    
    db.commit()
    db.refresh(log)
    return log

@router.delete("/{log_id}")
def delete_log(log_id: int, db: Session = Depends(get_db)):
    log = db.query(Log).filter(Log.id == log_id).first()
    if log is None:
        raise HTTPException(status_code=404, detail="Log not found")
    
    db.delete(log)
    db.commit()
    return {"message": "Log deleted successfully"}
