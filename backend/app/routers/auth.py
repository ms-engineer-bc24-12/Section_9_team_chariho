# 既存ユーザーログイン認証(POST)
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.utils.firebase_auth import verify_firebase_token
from app.db import get_db
from app.models import User
from app.schemas import UserResponse
from pydantic import BaseModel

router = APIRouter()


class LoginRequest(BaseModel):
    id_token: str


@router.post("/login", response_model=UserResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    """FirebaseのIDトークンを検証し、ユーザーを認証"""
    firebase_uid = verify_firebase_token(request.id_token)

    # ユーザーが存在するか確認
    user = db.query(User).filter(User.firebase_uid == firebase_uid).first()
    if not user:
        raise HTTPException(status_code=404, detail="ユーザーが見つかりません")

    return user
