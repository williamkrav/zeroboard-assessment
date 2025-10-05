from app.models import Log
from app.schemas import LogAggregation, LogCreate, LogSearch, LogUpdate
from app.services.logs import LogService


def test_create_log(db_session):
    log_data = LogCreate(level="INFO", message="Test log", source="user_service")
    log = LogService.create_log(db_session, log_data)
    assert log.id is not None
    assert log.level == "INFO"
    assert log.message == "Test log"


def test_get_logs(db_session):
    log1 = Log(level="INFO", message="Log 1", source="user_service")
    log2 = Log(level="ERROR", message="Log 2", source="order_service")
    db_session.add_all([log1, log2])
    db_session.commit()

    logs = LogService.get_logs(db_session)
    assert len(logs) == 2


def test_get_log_by_id(db_session, sample_log):
    log = LogService.get_log_by_id(db_session, sample_log.id)
    assert log.id == sample_log.id
    assert log.message == sample_log.message


def test_update_log(db_session, sample_log):
    update_data = LogUpdate(level="ERROR", message="Updated message")
    log = LogService.update_log(db_session, sample_log.id, update_data)
    assert log.level == "ERROR"
    assert log.message == "Updated message"


def test_delete_log(db_session, sample_log):
    result = LogService.delete_log(db_session, sample_log.id)
    assert result is True

    log = LogService.get_log_by_id(db_session, sample_log.id)
    assert log is None


def test_search_logs(db_session):
    log1 = Log(level="INFO", message="User login", source="user_service")
    log2 = Log(level="ERROR", message="Error log", source="order_service")
    db_session.add_all([log1, log2])
    db_session.commit()

    search_params = LogSearch(level="ERROR")
    logs, total = LogService.search_logs(db_session, search_params)
    assert len(logs) == 1
    assert logs[0].level == "ERROR"
    assert total == 1


def test_get_log_stats(db_session):
    log1 = Log(level="INFO", message="Info log", source="user_service")
    log2 = Log(level="ERROR", message="Error log", source="order_service")
    log3 = Log(level="INFO", message="Another info", source="user_service")
    db_session.add_all([log1, log2, log3])
    db_session.commit()

    aggregation_params = LogAggregation()
    stats = LogService.get_log_stats(db_session, aggregation_params)
    assert stats.total_logs == 3
    assert stats.level_counts["INFO"] == 2
    assert stats.level_counts["ERROR"] == 1
