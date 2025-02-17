from sqlalchemy import Column, Integer, String, Text, DECIMAL, JSON, TIMESTAMP, ForeignKey, CheckConstraint
from sqlalchemy.dialects.postgresql import DOUBLE_PRECISION # PostgreSQLのDOUBLE PRECISION型を使用するためにインポート
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func # 現在時刻を取得するために使用
from app.db import Base  # db.py から Base をインポート

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)

# ユーザーと自転車のリレーション（1対多）
    bicycles = relationship("Bicycle", back_populates="owner", cascade="all, delete-orphan")

class Bicycle(Base):
    __tablename__ = 'bicycles'

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    image_url = Column(Text)
    
    # 緯度・経度を DOUBLE PRECISION に統一
    latitude = Column(DOUBLE_PRECISION, nullable=False)
    longitude = Column(DOUBLE_PRECISION, nullable=False)

    rental_price_per_hour = Column(DECIMAL(10, 2), nullable=False)
    lock_type = Column(String(10), nullable=True)
    rental_period = Column(JSON)

    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    # ユーザーとのリレーション
    owner = relationship("User", back_populates="bicycles")

    # 制約（CHECK 制約を SQLAlchemy で追加）
    __table_args__ = (
        CheckConstraint("rental_price_per_hour >= 0", name="check_rental_price_positive"),
        CheckConstraint("lock_type IN ('key', 'dial')", name="check_lock_type"),
    )

