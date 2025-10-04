from typing import List, Optional

from sqlalchemy import and_, extract, func
from sqlalchemy.orm import Session

from ..models import Log
from ..schemas import LogAggregation, LogCreate, LogSearch, LogStats, LogUpdate


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

    @staticmethod
    def search_logs(db: Session, search_params: LogSearch) -> List[Log]:
        query = db.query(Log)

        filters = []

        if search_params.start_date:
            filters.append(Log.timestamp >= search_params.start_date)

        if search_params.end_date:
            filters.append(Log.timestamp <= search_params.end_date)

        if search_params.level:
            filters.append(Log.level == search_params.level)

        if search_params.source:
            filters.append(Log.source == search_params.source)

        if search_params.text:
            filters.append(Log.message.like(f"%{search_params.text}%"))

        if filters:
            query = query.filter(and_(*filters))

        order_by_field = getattr(Log, search_params.sort_by, Log.timestamp)
        if search_params.sort_order == "desc":
            query = query.order_by(order_by_field.desc())
        else:
            query = query.order_by(order_by_field.asc())

        return query.offset(search_params.skip).limit(search_params.limit).all()

    @staticmethod
    def get_log_stats(db: Session, aggregation_params: LogAggregation) -> LogStats:
        query = db.query(Log)

        filters = []

        if aggregation_params.start_date:
            filters.append(Log.timestamp >= aggregation_params.start_date)

        if aggregation_params.end_date:
            filters.append(Log.timestamp <= aggregation_params.end_date)

        if aggregation_params.level:
            filters.append(Log.level == aggregation_params.level)

        if aggregation_params.source:
            filters.append(Log.source == aggregation_params.source)

        if filters:
            query = query.filter(and_(*filters))

        total_logs = query.count()

        level_counts = db.query(Log.level, func.count(Log.id)).group_by(Log.level).all()
        level_counts = {level: count for level, count in level_counts}

        source_counts = (
            db.query(Log.source, func.count(Log.id)).group_by(Log.source).all()
        )
        source_counts = {source: count for source, count in source_counts if source}

        hourly_distribution = (
            db.query(
                extract("hour", Log.timestamp).label("hour"),
                func.count(Log.id).label("count"),
            )
            .group_by("hour")
            .all()
        )
        hourly_distribution = {int(hour): count for hour, count in hourly_distribution}

        return LogStats(
            total_logs=total_logs,
            level_counts=level_counts,
            source_counts=source_counts,
            hourly_distribution=hourly_distribution,
        )
