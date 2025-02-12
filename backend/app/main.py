from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app import crud, models, db
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
import os
import stripe # NOTE: Stripeのライブラリをインポート
import time

stripe.api_key = 'sk_test_51Qpl1SJzpJ9UCOiVkKPGfNqfPkzMQsHYN8x2XKFpAvk4gpj2DyMo6shH6fD7LuKdKYW4ynl2eyPbGAMZzKOHh4Fb00yeVnWvpv'

# Usage Recordを送信
def create_usage_record(subscription_item_id, hours):
    stripe.usage_records.create(
        subscription_item=subscription_item_id,  # 顧客のサブスクリプションアイテムID
        quantity=hours,  # 使用時間（1時間の場合は1）
        timestamp=int(time.time()),  # 現在のUNIXタイムスタンプ
        action="increment"  # 使用量を増加させる
    )




app = FastAPI()

# PostgreSQLへの接続設定
DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://postgres:password@host.docker.internal:5432/mydatabase')

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# アプリケーション起動時にテーブル作成
@app.on_event("startup")
def on_startup():
    db.init_db()  # 起動時にテーブルを作成

# データベースのセッションを取得する依存関数
def get_db():
    db = db.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "FastAPI is running locally and connected to PostgreSQL in Docker!"}

@app.get("/test")
def test_database():
    try:
        # セッションを使う
        with SessionLocal() as db:
            # SQLをtext()でラップ
            result = db.execute(text("SELECT 1")).fetchall()
            
            # 結果をリストに変換
            result_list = [row[0] for row in result]
            return {"message": "Connected to PostgreSQL successfully!", "result": result_list}
    except Exception as e:
        return {"message": f"Failed to connect to PostgreSQL: {str(e)}"}

@app.post("/users/")
def create_user(name: str, email: str, db: Session = Depends(get_db)):
    return crud.create_user(db=db, name=name, email=email)

@app.get("/users/{user_id}")
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = crud.get_user(db=db, user_id=user_id)
    if user:
        return user
    return {"message": "User not found"}
