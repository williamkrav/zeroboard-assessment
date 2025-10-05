from datetime import datetime
from typing import Any, Optional

from pydantic import BaseModel


class LogBase(BaseModel):
    level: str
    message: str
    source: Optional[str] = None


class LogCreate(LogBase):
    pass


class Log(LogBase):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True


class LogUpdate(BaseModel):
    level: Optional[str] = None
    message: Optional[str] = None
    source: Optional[str] = None


class APIResponse(BaseModel):
    data: Optional[Any] = None
    code: int
    error: Optional[str] = None
    message: str


class LogSearch(BaseModel):
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    level: Optional[str] = None
    source: Optional[str] = None
    text: Optional[str] = None
    skip: int = 0
    limit: int = 100
    sort_by: str = "timestamp"
    sort_order: str = "desc"


class LogAggregation(BaseModel):
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    level: Optional[str] = None
    source: Optional[str] = None
    group_by: str = "level"


class LogStats(BaseModel):
    total_logs: int
    level_counts: dict
    source_counts: dict
    daily_distribution: dict
