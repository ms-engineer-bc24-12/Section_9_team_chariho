from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.db import get_db
from app.models import Bicycle, User
from pydantic import BaseModel
from decimal import Decimal

router = APIRouter()


# 自転車登録用のリクエストモデル
class BicycleCreate(BaseModel):
    owner_id: int  # 追加 (自転車の所有者IDが必要)
    bikename: str
    image_url: str
    latitude: float
    longitude: float
    rental_price_per_hour: Decimal
    lock_type: str
    rental_period: dict


# 自転車を登録するエンドポイント
@router.post("/bicycles/")
def create_bicycle(bike: BicycleCreate, db: Session = Depends(get_db)):
    # 1. `owner_id` が `users` テーブルに存在するか確認
    owner = db.query(User).filter(User.id == bike.owner_id).first()
    if not owner:
        raise HTTPException(
            status_code=404, detail="指定された owner_id は存在しません"
        )

    # 2. 自転車を登録
    new_bike = Bicycle(
        owner_id=bike.owner_id,
        bikename=bike.bikename,
        image_url=bike.image_url,
        latitude=bike.latitude,
        longitude=bike.longitude,
        rental_price_per_hour=bike.rental_price_per_hour,
        lock_type=bike.lock_type,
        rental_period=bike.rental_period,
    )
    db.add(new_bike)
    db.commit()
    db.refresh(new_bike)

    return {"message": "自転車を追加しました！", "bicycle_id": new_bike.id}


# 自転車のデータを取得するエンドポイント
@router.get("/bicycles/")
def get_bicycles(db: Session = Depends(get_db)):
    bikes = db.query(Bicycle).all()
    return [
        {
            "id": bike.id,
            "bikename": bike.bikename,
            "image_url": bike.image_url,
            "rental_price_per_hour": bike.rental_price_per_hour,
        }
        for bike in bikes
    ]


@router.get("/bicycles/{bicycle_id}")
def get_bicycle(bicycle_id: int, db: Session = Depends(get_db)):
    bike = db.query(Bicycle).filter(Bicycle.id == bicycle_id).first()
    if not bike:
        raise HTTPException(status_code=404, detail="自転車が見つかりません")

    return {
        "id": bike.id,
        "owner_id": bike.owner_id,
        "bikename": bike.bikename,
        "image_url": bike.image_url,
        "latitude": bike.latitude,
        "longitude": bike.longitude,
        "rental_price_per_hour": bike.rental_price_per_hour,
        "lock_type": bike.lock_type,
        "rental_period": bike.rental_period,
        "created_at": bike.created_at,
        "updated_at": bike.updated_at,
    }


# 自転車を削除するエンドポイント
@router.delete("/bicycles/{bicycle_id}")
def delete_bicycle(bicycle_id: int, db: Session = Depends(get_db)):
    bike = db.query(Bicycle).filter(Bicycle.id == bicycle_id).first()
    if not bike:
        raise HTTPException(status_code=404, detail="自転車が見つかりません")

    db.delete(bike)
    db.commit()

    return {"message": f"自転車ID {bicycle_id} を削除しました"}
