from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from .database import Base

class Log(Base):
    __tablename__ = "logs"
    
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now(), index=True)
    level = Column(String(10), nullable=False, index=True)
    message = Column(Text, nullable=False)
    source = Column(String(50), index=True)
    endpoint = Column(String(100))
    ip_address = Column(String(45))
