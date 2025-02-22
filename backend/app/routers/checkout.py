from fastapi import APIRouter, HTTPException, Depends
import stripe
import os
from sqlalchemy.orm import Session
from app.db import get_db
from app.models import Reservation, User  # モデルをインポート
from pydantic import BaseModel, validator
from dotenv import load_dotenv
from typing import Optional


# .env を読み込む
load_dotenv()

router = APIRouter()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")


# リクエストボディのバリデーション
class CheckoutSessionRequest(BaseModel):
    user_id: int
    bicycle_id: Optional[int] = None
    hours: int
    amount: float
    reservation_start: str
    reservation_end: str

    @validator("hours")
    def validate_hours(cls, v):
        if v < 1 or v > 100:
            raise ValueError("予約時間は1時間以上100時間以下にしてください。")
        return v

    @validator("amount")
    def validate_amount(cls, v):
        if v < 0 or v > 9999999.99:
            raise ValueError("金額が異常です。0以上9999999.99以下にしてください。")
        return v


# チェックアウトセッションを作成するエンドポイント
@router.post("/create-checkout-session/")
def create_checkout_session(
    data: CheckoutSessionRequest, db: Session = Depends(get_db)
):
    try:
        user = db.query(User).filter(User.id == data.user_id).first()
        if not user:
            raise HTTPException(
                status_code=404, detail=f"user_id {data.user_id} が見つかりません"
            )

        # `bicycle_id` をオプションとして処理
        bicycle_id = data.bicycle_id if data.bicycle_id else None

        # 1時間100円で固定
        unit_price = 100
        total_amount = unit_price * data.hours

        # 固定の金額で `price_id` を作成
        price = stripe.Price.create(
            unit_amount=unit_price,  # 1時間100円
            currency="jpy",  # 日本円
            product_data={"name": "レンタル料金"},  #
        )
        print(f"🔥 作成した価格: {price}")

        # Checkout セッションを作成
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            mode="payment",
            line_items=[
                {"price": price.id, "quantity": data.hours}
            ],  # 時間ごとに金額を計算
            success_url="http://localhost:3000/rental/borrow/reserve",
            cancel_url="http://localhost:3000/rental/borrow",
            metadata={
                "user_id": str(data.user_id),
                "reservation_start": str(data.reservation_start),
                "reservation_end": str(data.reservation_end),
            },
        )

        #  予約情報をデータベースに保存
        new_reservation = Reservation(
            user_id=data.user_id,
            bicycle_id=bicycle_id,
            hours=data.hours,
            amount=total_amount,
            status="pending",
            checkout_session_id=session.id,
        )
        db.add(new_reservation)
        db.commit()
        db.refresh(new_reservation)

        return {"url": session.url}

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"チェックアウトセッションの作成に失敗しました: {str(e)}",
        )
