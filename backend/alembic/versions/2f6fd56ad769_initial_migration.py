"""Initial migration

Revision ID: 2f6fd56ad769
Revises: 
Create Date: 2025-02-17 03:39:31.186308

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2f6fd56ad769'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('users', sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True, nullable=True))

    op.create_table('users',
        sa.Column('firebase_uid', sa.String(), nullable=False),
        sa.Column('first_name', sa.String(), nullable=True),
        sa.Column('last_name', sa.String(), nullable=True),
        sa.Column('address', sa.String(), nullable=True),
        sa.Column('phone_number', sa.String(), nullable=True),
        sa.Column('email', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint('firebase_uid')
    )
    # idカラムにデフォルト値を設定
    op.execute("UPDATE users SET id = nextval('users_id_seq')")
    
    op.alter_column('users', 'id', nullable=False)

    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)
    op.create_index(op.f('ix_users_firebase_uid'), 'users', ['firebase_uid'], unique=False)


def downgrade() -> None:
    op.drop_column('users', 'id')
    op.drop_index(op.f('ix_users_firebase_uid'), table_name='users')
    op.drop_index(op.f('ix_users_email'), table_name='users')
    op.drop_table('users')
