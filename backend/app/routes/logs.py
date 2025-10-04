from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from ..models import Log
from ..schemas import LogCreate, Log as LogSchema, LogUpdate, APIResponse
from ..services.logs import LogService

router = APIRouter()

@router.post("/", response_model=APIResponse)
def create_log(log: LogCreate, db: Session = Depends(get_db)):
    try:
        db_log = LogService.create_log(db, log)
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
        logs = LogService.get_logs(db, skip, limit)
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
        log = LogService.get_log_by_id(db, log_id)
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
        log = LogService.update_log(db, log_id, log_update)
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
        success = LogService.delete_log(db, log_id)
        if not success:
            return APIResponse(
                data=None,
                code=404,
                error="Log not found",
                message=f"Log with ID {log_id} not found"
            )
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
