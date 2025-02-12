from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.db import Base  # db.py から Base をインポート

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
