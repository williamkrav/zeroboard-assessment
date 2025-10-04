from sqlalchemy.orm import Session
from typing import List, Optional
from ..models import Log
from ..schemas import LogCreate, LogUpdate

class LogService:
    @staticmethod
    def create_log(db: Session, log: LogCreate) -> Log:
        db_log = Log(**log.dict())
        db.add(db_log)
        db.commit()
        db.refresh(db_log)
        return db_log
    
    @staticmethod
    def get_logs(db: Session, skip: int = 0, limit: int = 100) -> List[Log]:
        return db.query(Log).offset(skip).limit(limit).all()
    
    @staticmethod
    def get_log_by_id(db: Session, log_id: int) -> Optional[Log]:
        return db.query(Log).filter(Log.id == log_id).first()
    
    @staticmethod
    def update_log(db: Session, log_id: int, log_update: LogUpdate) -> Optional[Log]:
        log = db.query(Log).filter(Log.id == log_id).first()
        if log is None:
            return None
        
        update_data = log_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(log, field, value)
        
        db.commit()
        db.refresh(log)
        return log
    
    @staticmethod
    def delete_log(db: Session, log_id: int) -> bool:
        log = db.query(Log).filter(Log.id == log_id).first()
        if log is None:
            return False
        
        db.delete(log)
        db.commit()
        return True
