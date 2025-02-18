from fastapi import FastAPI
from app import db
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import stripe 
from datetime import datetime
from app.tasks import update_usage  # tasks.pyからupdate_usageタスクをインポート@app.post("/start-usage/")
from app.routers import users  # users.py ルーターをインポート
from app.routers import auth  # auth.py をインポート
from app.db import init_db
from contextlib import asynccontextmanager
from app.middleware import add_cors_middleware

stripe.api_key = 'sk_test_51Qpl1SJzpJ9UCOiVkKPGfNqfPkzMQsHYN8x2XKFpAvk4gpj2DyMo6shH6fD7LuKdKYW4ynl2eyPbGAMZzKOHh4Fb00yeVnWvpv'


app = FastAPI()

app.include_router(auth.router)
app.include_router(users.router)
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
    return {"message": "FastAPI is running locally and connected to PostgreSQL in Docker!"}

# 予約時にstripeのサブスクリプションを作成
def create_subscription(customer_id, price_id, start_time):
    try:
        subscription = stripe.Subscription.create(
            customer=customer_id,
            items=[{"price": price_id, "quantity": 1}],
            billing_cycle_anchor=int(start_time.timestamp()),  # 予約開始時間
            proration_behavior="create_prorations",
            payment_behavior="default_incomplete",
            expand=["latest_invoice.payment_intent"],
        )
        return subscription
    except stripe.error.StripeError as e:
        print("Error creating subscription:", e)
        return None


# 予約データ(べた書き)
customer_id = "cus_ABC123"
price_id = "price_ABC123"  # 1時間100円のメーター課金プラン
start_time = datetime.strptime("2025-02-12 14:00", "%Y-%m-%d %H:%M")

subscription = create_subscription(customer_id, price_id, start_time)
print(subscription)

# 予約時にタスクを呼び出してUsage Recordを定期的に更新
@app.post("/start-usage/")
def start_usage(subscription_item_id: str):
    update_usage.apply_async((subscription_item_id,), countdown=3600)
    return {"message": "Usage started and task scheduled"}

# NOTE:返却時に実際の利用時間を計算し、請求を確定
def finalize_payment(customer_id, subscription_id, start_time):
    end_time = datetime.now()
    usage_hours = (end_time - start_time).total_seconds() / 3600  # 使った時間（秒単位から時間単位に変換）

    # Usage Recordを更新（最後の時間を追加）
    stripe.SubscriptionItem.create_usage_record(
        subscription_item="si_ABC123",  # 顧客のサブスクリプションアイテムID
        quantity=round(usage_hours),  # 使用時間（1時間単位で記録）
        timestamp=int(end_time.timestamp()),  # 返却時刻をタイムスタンプに変換
        action="increment"  # 使用量を増加させる
    )

    # 即時請求（請求書の作成と支払い処理）
    try:
        invoice = stripe.Invoice.create(
            customer=customer_id,  # 顧客ID
            subscription=subscription_id,  # サブスクリプションID
            auto_advance=True  # 自動で請求書を確定
        )
        stripe.Invoice.finalize_invoice(invoice.id)  # 請求書を確定
        print("Invoice finalized:", invoice)  # 請求書確定後の情報を表示
        return invoice
    except stripe.error.StripeError as e:
        print("Error finalizing invoice:", e)  # エラーハンドリング
        return None

# FastAPIインスタンスの作成 （返却時に実際の使用時間を計算して、請求を確定するエンドポイント）
@app.post("/end-usage/")
def end_usage(subscription_item_id: str, start_time: str):
    start_time = datetime.strptime(start_time, "%Y-%m-%d %H:%M")  # 文字列で渡された開始時刻をdatetime型に変換
    customer_id = "cus_ABC123"  # 顧客ID（実際のIDに置き換え）
    subscription_id = "sub_ABC123"  # サブスクリプションID（実際のIDに置き換え）

    # 請求確定処理を呼び出し
    invoice = finalize_payment(customer_id, subscription_id, start_time)
    return {"message": "Payment finalized", "invoice": invoice}