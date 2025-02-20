from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Text,
    DECIMAL,
    JSON,
    TIMESTAMP,
    ForeignKey,
    CheckConstraint,
)
from sqlalchemy.dialects.postgresql import (
    DOUBLE_PRECISION,
)  # PostgreSQLのDOUBLE PRECISION型を使用するためにインポート
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func  # 現在時刻を取得するために使用
from app.db import Base  # db.py から Base をインポート


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    firebase_uid = Column(String, unique=True, nullable=False)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    address = Column(String, nullable=True)
    phone_number = Column(String, nullable=True)
    email = Column(String, unique=True, index=True, nullable=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    # ユーザーと自転車のリレーション（1対多）
    bicycles = relationship(
        "Bicycle", back_populates="owner", cascade="all, delete-orphan"
    )

    # NOTE:ユーザーと予約の紐づけ追加
    # ユーザーと予約のリレーション
    reservations = relationship("Reservation", back_populates="user", cascade="all, delete-orphan")


class Bicycle(Base):
    __tablename__ = "bicycles"

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(
        Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
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

    # NOTE:自転車と紐づけ追加
    # 自転車と予約のリレーション
    reservations = relationship("Reservation", back_populates="bicycle")
    
    # 制約（CHECK 制約を SQLAlchemy で追加）
    __table_args__ = (
        CheckConstraint(
            "rental_price_per_hour >= 0", name="check_rental_price_positive"
        ),
        CheckConstraint("lock_type IN ('key', 'dial')", name="check_lock_type"),
    )


class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    bicycle_id = Column(Integer, ForeignKey("bicycles.id", ondelete="CASCADE"), nullable=False)
    hours = Column(Integer, nullable=False)
    amount = Column(DECIMAL(10, 2), nullable=False)  # 金額
    status = Column(String(50), default="pending", nullable=False)  # 'pending' or 'paid'
    checkout_session_id = Column(String, unique=True, nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())

    # ユーザーと自転車のリレーション
    user = relationship("User", back_populates="reservations")
    bicycle = relationship("Bicycle", back_populates="reservations")

    # 制約
    __table_args__ = (
        CheckConstraint("hours > 0", name="check_hours_positive"),
        CheckConstraint("amount >= 0", name="check_amount_positive"),
    )