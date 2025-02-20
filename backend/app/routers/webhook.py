from fastapi import APIRouter, HTTPException, Request
import stripe
import os
import psycopg2
from dotenv import load_dotenv

# .env を読み込む
load_dotenv()

router = APIRouter()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
DATABASE_URL = os.getenv("DATABASE_URL")


@router.post("/payments/stripe-webhook/")
async def stripe_webhook(request: Request):
    """Stripe Webhook エンドポイント"""
    payload = await request.json()
    event_type = payload.get("type")
    event_data = payload.get("data", {}).get("object", {})

    print(f"📩 Webhook Payload: {payload}")

    if event_type == "checkout.session.completed":
        metadata = event_data.get("metadata", {})  # 🔥 metadata を取得
        bicycle_id = metadata.get("bicycle_id")
        user_id = metadata.get("user_id")

        if not bicycle_id or not user_id:
            print("🚨 metadata に bicycle_id または user_id がない")
            raise HTTPException(
                status_code=400, detail="bicycle_id または user_id が metadata にない"
            )

        # DB に支払い情報を保存
        try:
            conn = psycopg2.connect(DATABASE_URL)
            cur = conn.cursor()
            cur.execute(
                "UPDATE reservations SET status = 'paid' WHERE user_id = %s AND bicycle_id = %s",
                (int(user_id), int(bicycle_id)),
            )
            conn.commit()
            cur.close()
            conn.close()
        except Exception as e:
            print(f"❌ DB 更新エラー: {e}")
            raise HTTPException(
                status_code=500, detail="データベースの更新に失敗しました"
            )

        print("支払い成功 & DB 更新完了")

    return {"message": "Webhook received"}
