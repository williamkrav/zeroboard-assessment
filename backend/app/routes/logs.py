from typing import Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..schemas import APIResponse
from ..schemas import Log as LogSchema
from ..schemas import LogAggregation, LogCreate, LogSearch, LogUpdate, PaginationMeta
from ..services.logs import LogService

router = APIRouter()


@router.post("/", response_model=APIResponse)
def create_log(log: LogCreate, db: Session = Depends(get_db)):
    try:
        db_log = LogService.create_log(db, log)
        log_schema = LogSchema.model_validate(db_log)
        return APIResponse(
            data=log_schema, code=201, error=None, message="Log created successfully"
        )
    except Exception as e:
        return APIResponse(
            data=None, code=500, error=str(e), message="Failed to create log"
        )


@router.get("/", response_model=APIResponse)
def get_logs(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    try:
        logs = LogService.get_logs(db, skip, limit)
        logs_schema = [LogSchema.model_validate(log) for log in logs]
        return APIResponse(
            data=logs_schema,
            code=200,
            error=None,
            message="Logs retrieved successfully",
        )
    except Exception as e:
        return APIResponse(
            data=None, code=500, error=str(e), message="Failed to retrieve logs"
        )


@router.get("/search/simple", response_model=APIResponse)
def search_logs(
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    level: Optional[str] = None,
    source: Optional[str] = None,
    text: Optional[str] = None,
    skip: int = 0,
    limit: int = 10,
    sort_by: str = "timestamp",
    sort_order: str = "desc",
    db: Session = Depends(get_db),
):
    try:
        from datetime import datetime

        search_params = LogSearch(
            start_date=datetime.fromisoformat(start_date) if start_date else None,
            end_date=datetime.fromisoformat(end_date) if end_date else None,
            level=level,
            source=source,
            text=text,
            skip=skip,
            limit=limit,
            sort_by=sort_by,
            sort_order=sort_order,
        )

        logs, total = LogService.search_logs(db, search_params)
        logs_schema = [LogSchema.model_validate(log) for log in logs]

        page = (skip // limit) + 1 if limit > 0 else 1
        total_pages = (total + limit - 1) // limit if limit > 0 else 1

        pagination = PaginationMeta(
            page=page,
            page_size=limit,
            total_pages=total_pages,
        )

        return APIResponse(
            data=logs_schema,
            code=200,
            error=None,
            message="Logs search completed successfully",
            pagination=pagination,
        )
    except Exception as e:
        return APIResponse(
            data=None, code=500, error=str(e), message="Failed to search logs"
        )


@router.get("/search/aggregate", response_model=APIResponse)
def get_log_stats(
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    level: Optional[str] = None,
    source: Optional[str] = None,
    group_by: str = "level",
    db: Session = Depends(get_db),
):
    try:
        from datetime import datetime

        aggregation_params = LogAggregation(
            start_date=datetime.fromisoformat(start_date) if start_date else None,
            end_date=datetime.fromisoformat(end_date) if end_date else None,
            level=level,
            source=source,
            group_by=group_by,
        )

        stats = LogService.get_log_stats(db, aggregation_params)
        return APIResponse(
            data=stats,
            code=200,
            error=None,
            message="Log statistics retrieved successfully",
        )
    except Exception as e:
        return APIResponse(
            data=None,
            code=500,
            error=str(e),
            message="Failed to retrieve log statistics",
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
                message=f"Log with ID {log_id} not found",
            )
        log_schema = LogSchema.model_validate(log)
        return APIResponse(
            data=log_schema, code=200, error=None, message="Log retrieved successfully"
        )
    except Exception as e:
        return APIResponse(
            data=None, code=500, error=str(e), message="Failed to retrieve log"
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
                message=f"Log with ID {log_id} not found",
            )
        log_schema = LogSchema.model_validate(log)
        return APIResponse(
            data=log_schema, code=200, error=None, message="Log updated successfully"
        )
    except Exception as e:
        return APIResponse(
            data=None, code=500, error=str(e), message="Failed to update log"
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
                message=f"Log with ID {log_id} not found",
            )
        return APIResponse(
            data=None, code=200, error=None, message="Log deleted successfully"
        )
    except Exception as e:
        return APIResponse(
            data=None, code=500, error=str(e), message="Failed to delete log"
        )
