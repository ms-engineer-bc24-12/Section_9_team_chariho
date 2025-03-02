from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from decimal import Decimal


# 新規ユーザー作成用のスキーマ
class UserCreate(BaseModel):
    firebase_uid: str
    first_name: Optional[str]
    last_name: Optional[str]
    address: Optional[str]
    phone_number: Optional[str]
    email: Optional[str]
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None


# ユーザー情報を取得する為のスキーマ
class UserResponse(UserCreate):
    id: int


# 自転車登録用のスキーマ
class BicycleCreate(BaseModel):
    owner_id: int
    bikename: str
    image_url: str
    latitude: float
    longitude: float
    rental_price_per_hour: Decimal
    lock_type: str
    rental_period: str


# 自転車情報を取得するためのスキーマ
class BicycleResponse(BicycleCreate):
    id: int
    created_at: datetime
    updated_at: datetime
