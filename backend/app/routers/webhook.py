from fastapi import APIRouter, Request, Depends
import stripe
import os
from dotenv import load_dotenv
from app.db import get_db  # 🔥 psycopg2 ではなく get_db を使用
from sqlalchemy.orm import Session
from datetime import datetime, timezone

# .env の環境変数を読み込む
load_dotenv()

router = APIRouter()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")


@router.post("/payments/stripe-webhook/")
async def stripe_webhook(request: Request, db: Session = Depends(get_db)):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")

    try:
        # Stripe Webhook のリクエストを検証
        event = stripe.Webhook.construct_event(
            payload, sig_header, os.getenv("STRIPE_WEBHOOK_SECRET")
        )

        # 支払いが完了した場合の処理
        if event["type"] == "checkout.session.completed":
            session = event["data"]["object"]
            metadata = session.get("metadata", {})

            reservation_start = metadata.get("reservation_start")

            now = datetime.now(timezone.utc)

            # 日時のフォーマットを検証
            try:
                reservation_start_dt = datetime.fromisoformat(
                    reservation_start
                ).replace(tzinfo=timezone.utc)
            except ValueError:
                return {
                    "status": "failed",
                    "error": "予約開始日時の形式が正しくありません。YYYY-MM-DDTHH:MM:SSZ の形式で指定してください。",
                }, 400

            # 過去の日時をブロック
            if reservation_start_dt < now:
                return {
                    "status": "failed",
                    "error": "過去の日時での予約はできません。",
                }, 400

            # ここでDBに予約情報を保存する（例）
            # new_reservation = Reservation(...)
            # db.add(new_reservation)
            # db.commit()

        return {"status": "success"}

    except stripe.error.SignatureVerificationError:
        return {
            "status": "failed",
            "error": "署名の検証に失敗しました。不正なリクエストです。",
        }, 400
    except Exception as e:
        return {"status": "failed", "error": f"エラーが発生しました: {str(e)}"}, 400
