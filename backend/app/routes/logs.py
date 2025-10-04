from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from ..models import Log
from ..schemas import LogCreate, Log as LogSchema, LogUpdate, APIResponse

router = APIRouter()

@router.post("/", response_model=APIResponse)
def create_log(log: LogCreate, db: Session = Depends(get_db)):
    try:
        db_log = Log(**log.dict())
        db.add(db_log)
        db.commit()
        db.refresh(db_log)
        return APIResponse(
            data=db_log,
            code=201,
            error=None,
            message="Log created successfully"
        )
    except Exception as e:
        return APIResponse(
            data=None,
            code=500,
            error=str(e),
            message="Failed to create log"
        )

@router.get("/", response_model=APIResponse)
def get_logs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        logs = db.query(Log).offset(skip).limit(limit).all()
        return APIResponse(
            data=logs,
            code=200,
            error=None,
            message="Logs retrieved successfully"
        )
    except Exception as e:
        return APIResponse(
            data=None,
            code=500,
            error=str(e),
            message="Failed to retrieve logs"
        )

@router.get("/{log_id}", response_model=APIResponse)
def get_log(log_id: int, db: Session = Depends(get_db)):
    try:
        log = db.query(Log).filter(Log.id == log_id).first()
        if log is None:
            return APIResponse(
                data=None,
                code=404,
                error="Log not found",
                message=f"Log with ID {log_id} not found"
            )
        return APIResponse(
            data=log,
            code=200,
            error=None,
            message="Log retrieved successfully"
        )
    except Exception as e:
        return APIResponse(
            data=None,
            code=500,
            error=str(e),
            message="Failed to retrieve log"
        )

@router.put("/{log_id}", response_model=APIResponse)
def update_log(log_id: int, log_update: LogUpdate, db: Session = Depends(get_db)):
    try:
        log = db.query(Log).filter(Log.id == log_id).first()
        if log is None:
            return APIResponse(
                data=None,
                code=404,
                error="Log not found",
                message=f"Log with ID {log_id} not found"
            )
        
        update_data = log_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(log, field, value)
        
        db.commit()
        db.refresh(log)
        return APIResponse(
            data=log,
            code=200,
            error=None,
            message="Log updated successfully"
        )
    except Exception as e:
        return APIResponse(
            data=None,
            code=500,
            error=str(e),
            message="Failed to update log"
        )

@router.delete("/{log_id}", response_model=APIResponse)
def delete_log(log_id: int, db: Session = Depends(get_db)):
    try:
        log = db.query(Log).filter(Log.id == log_id).first()
        if log is None:
            return APIResponse(
                data=None,
                code=404,
                error="Log not found",
                message=f"Log with ID {log_id} not found"
            )
        
        db.delete(log)
        db.commit()
        return APIResponse(
            data=None,
            code=200,
            error=None,
            message="Log deleted successfully"
        )
    except Exception as e:
        return APIResponse(
            data=None,
            code=500,
            error=str(e),
            message="Failed to delete log"
        )
