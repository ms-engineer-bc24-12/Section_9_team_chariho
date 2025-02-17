from pydantic import BaseModel
from datetime import datetime
from typing import Optional

#新規ユーザー作成用のスキーマ
class UserCreate(BaseModel):
    firebase_uid: str
    first_name: Optional[str]
    last_name: Optional[str]
    address: Optional[str]
    phone_number: Optional[str]
    email: Optional[str]
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

#ユーザー情報を取得する為のスキーマ
class UserResponse(UserCreate):
    id: int
