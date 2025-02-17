"""drop bicycles and users tables

Revision ID: 10c29e190c2e
Revises: 6300082117bf
Create Date: 2025-02-17 08:40:24.106413

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '10c29e190c2e'
down_revision: Union[str, None] = '6300082117bf'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("DROP TABLE IF EXISTS bicycles CASCADE;")
    op.execute("DROP TABLE IF EXISTS users CASCADE;")


def downgrade() -> None:
    pass
