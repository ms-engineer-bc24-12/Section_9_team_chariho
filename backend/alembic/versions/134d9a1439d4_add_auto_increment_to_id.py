"""add auto-increment to id

Revision ID: 134d9a1439d4
Revises: ff9c89c38f28
Create Date: 2025-02-17 15:32:02.883285

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '134d9a1439d4'
down_revision: Union[str, None] = 'ff9c89c38f28'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # `id` カラムの変更 (auto-increment と nullable=False を設定)
    op.alter_column('users', 'id', 
                    existing_type=sa.Integer(),
                    nullable=False,
                    autoincrement=True)

    # 必要に応じてインデックスを再作成
    op.create_index(op.f('ix_users_id'), 'users', ['id'], unique=False)

    # firebase_uidにユニーク制約を再設定（もし適用されていない場合）
    op.create_unique_constraint(None, 'users', ['firebase_uid'])


def downgrade() -> None:
    # idカラムの変更を元に戻す（必要な場合）
    op.alter_column('users', 'id', 
                    existing_type=sa.Integer(),
                    nullable=True)

    # インデックスや制約を削除
    op.drop_index(op.f('ix_users_id'), table_name='users')
    op.drop_constraint(None, 'users', type_='unique')
