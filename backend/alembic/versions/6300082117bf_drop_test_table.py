"""drop test table

Revision ID: 6300082117bf
Revises: 150eda064af6
Create Date: 2025-02-17 15:40:26.415830

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6300082117bf'
down_revision: Union[str, None] = '150eda064af6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
     op.execute("DROP TABLE IF EXISTS test_table;")  # ここを追加



def downgrade() -> None:
    pass
