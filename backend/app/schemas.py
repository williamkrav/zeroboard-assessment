from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Any

class LogBase(BaseModel):
    level: str
    message: str
    source: Optional[str] = None
    endpoint: Optional[str] = None
    ip_address: Optional[str] = None

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
    endpoint: Optional[str] = None
    ip_address: Optional[str] = None

class APIResponse(BaseModel):
    data: Optional[Any] = None
    code: int
    error: Optional[str] = None
    message: str
