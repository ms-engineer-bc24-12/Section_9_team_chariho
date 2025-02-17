from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
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

