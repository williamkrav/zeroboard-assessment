"""populate_sample_logs

Revision ID: d756bef2a41a
Revises: 94bfefd14210
Create Date: 2025-10-04 19:46:54.388707

"""
import random
from datetime import datetime, timedelta
from typing import Sequence, Union

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "d756bef2a41a"
down_revision: Union[str, Sequence[str], None] = "94bfefd14210"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Populate database with sample logs."""

    # Sample data
    levels = ["DEBUG", "INFO", "WARNING", "ERROR"]
    sources = ["user_service", "order_service"]

    messages = [
        "User authentication successful",
        "Database connection established",
        "API request processed",
        "User registration completed",
        "Order placed successfully",
        "Payment processed",
        "Email notification sent",
        "Cache updated",
        "Session created",
        "Request validation failed",
        "Network timeout occurred",
        "Authentication token expired",
        "Invalid input parameters",
        "Service unavailable",
        "Rate limit exceeded",
        "System maintenance scheduled",
        "Data backup completed",
        "Configuration updated",
        "Monitoring alert triggered",
        "Security audit completed",
    ]

    # Get the table reference
    logs_table = sa.table(
        "logs",
        sa.column("id", sa.Integer),
        sa.column("level", sa.String),
        sa.column("message", sa.String),
        sa.column("source", sa.String),
        sa.column("timestamp", sa.DateTime),
    )

    # Generate random logs for the past month
    sample_logs = []
    end_date = datetime.utcnow()
    start_date = end_date - timedelta(days=30)

    for i in range(200):
        random_date = start_date + timedelta(
            seconds=random.randint(0, int((end_date - start_date).total_seconds()))
        )

        log_entry = {
            "level": random.choice(levels),
            "message": random.choice(messages),
            "source": random.choice(sources),
            "timestamp": random_date,
        }
        sample_logs.append(log_entry)

    # Insert the logs
    op.bulk_insert(logs_table, sample_logs)


def downgrade() -> None:
    """Remove sample logs."""
    op.execute("DELETE FROM logs WHERE id BETWEEN 1 AND 200")
