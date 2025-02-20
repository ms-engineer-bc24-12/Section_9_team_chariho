from fastapi import APIRouter, HTTPException
import stripe
import os
import psycopg2
from pydantic import BaseModel
from dotenv import load_dotenv

# .env を読み込む
load_dotenv()

router = APIRouter()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
DATABASE_URL = os.getenv("DATABASE_URL")


class CheckoutSessionRequest(BaseModel):
    user_id: int
    bicycle_id: int
    hours: int


@router.get("/get-price-id/")
def get_price_id():
    """最新の price_id を取得するエンドポイント"""
    try:
        prices = stripe.Price.list(limit=1)  # 最新の1件を取得
        if not prices["data"]:
            raise HTTPException(status_code=404, detail="No prices found in Stripe.")
        return {"price_id": prices["data"][0]["id"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/create-checkout-session/")
def create_checkout_session(data: CheckoutSessionRequest):
    """チェックアウトセッションを作成するエンドポイント"""
    try:
        # 最新の price_id を取得
        prices = stripe.Price.list(limit=1)
        if not prices["data"]:
            raise HTTPException(status_code=404, detail="No prices found in Stripe.")
        latest_price_id = prices["data"][0]["id"]

        # metadata に user_id と bicycle_id を追加
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            mode="payment",
            line_items=[
                {
                    "price": latest_price_id,
                    "quantity": data.hours,
                }
            ],
            success_url="http://localhost:3000/rental/borrow/reserve/confirm/?status=success",
            cancel_url="http://localhost:3000/rental/borrow/reserve?status=failed",
            metadata={"bicycle_id": str(data.bicycle_id), "user_id": str(data.user_id)},
        )

        # DB に `checkout_session_id` と `status` を保存
        conn = None  # 追加
        try:
            conn = psycopg2.connect(DATABASE_URL)
            cur = conn.cursor()
            cur.execute(
                "INSERT INTO reservations (user_id, bicycle_id, hours, amount, status, checkout_session_id) VALUES (%s, %s, %s, %s, %s, %s)",
                (
                    data.user_id,
                    data.bicycle_id,
                    data.hours,
                    data.hours * 100,
                    "pending",
                    session.id,
                ),  # 🔥 "pending" をセット
            )
            conn.commit()
            cur.close()
        except Exception as db_error:
            raise HTTPException(
                status_code=500, detail=f"Database error: {str(db_error)}"
            )
        finally:
            if conn:
                conn.close()  # 確実に接続を閉じる

        return {"url": session.url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
