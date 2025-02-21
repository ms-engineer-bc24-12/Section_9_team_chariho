from fastapi import FastAPI
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import stripe
from app.routers import users  # users.py ルーターをインポート
from app.routers import auth  # auth.py をインポート
from app.routers import webhook  # webhook.py をインポート
from app.routers import checkout  # checkout.py をインポート
from app.routers import upload
from contextlib import asynccontextmanager
from app.db import init_db
from app.middleware import add_cors_middleware


app = FastAPI()

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(webhook.router)
app.include_router(checkout.router)
app.include_router(upload.router)
add_cors_middleware(app)

# PostgreSQLへの接続設定
DATABASE_URL = "postgresql://postgres:password@host.docker.internal:5432/mydatabase"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# lifespan を使用して DB 初期化
@asynccontextmanager
async def lifespan():
    # アプリケーションの起動時にDBを初期化
    init_db()
    yield  # アプリケーションが実行される
    # アプリケーション終了時の処理があればここに記述


@app.get("/")
def read_root():
    return {
        "message": "FastAPI is running locally and connected to PostgreSQL in Docker!"
    }