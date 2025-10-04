"""Create logs table

Revision ID: 94bfefd14210
Revises:
Create Date: 2025-10-04 13:34:32.880150

"""
from typing import Sequence, Union

import sqlalchemy as sa

from alembic import op

revision: str = "94bfefd14210"
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        "logs",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column(
            "timestamp",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=True,
        ),
        sa.Column("level", sa.String(length=10), nullable=False),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("source", sa.String(length=50), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_logs_id"), "logs", ["id"], unique=False)
    op.create_index(op.f("ix_logs_level"), "logs", ["level"], unique=False)
    op.create_index(op.f("ix_logs_source"), "logs", ["source"], unique=False)
    op.create_index(op.f("ix_logs_timestamp"), "logs", ["timestamp"], unique=False)


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_index(op.f("ix_logs_timestamp"), table_name="logs")
    op.drop_index(op.f("ix_logs_source"), table_name="logs")
    op.drop_index(op.f("ix_logs_level"), table_name="logs")
    op.drop_index(op.f("ix_logs_id"), table_name="logs")
    op.drop_table("logs")
