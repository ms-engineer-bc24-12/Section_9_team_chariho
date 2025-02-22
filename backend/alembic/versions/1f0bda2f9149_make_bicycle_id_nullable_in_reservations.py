"""Make bicycle_id nullable in reservations

Revision ID: 1f0bda2f9149
Revises: 19738c21b018
Create Date: 2025-02-22 14:10:17.757028

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "1f0bda2f9149"
down_revision: Union[str, None] = "19738c21b018"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column(
        "reservations", "bicycle_id", existing_type=sa.INTEGER(), nullable=True
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column(
        "reservations", "bicycle_id", existing_type=sa.INTEGER(), nullable=False
    )
    # ### end Alembic commands ###
