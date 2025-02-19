from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://postgres:password@host.docker.internal:5432/mydatabase"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# テーブルを作成する関数
def init_db():
    Base.metadata.create_all(bind=engine)


# データベースのセッションを取得する関数を追加
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
