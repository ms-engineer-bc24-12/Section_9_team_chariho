#新規ユーザー登録 & 取得(GET/POST)
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from app.db import get_db
from app.models import User  # SQLAlchemyのUserモデルをインポート
from app.schemas import UserCreate, UserResponse  # Pydanticのスキーマをインポート
from app.utils.firebase_auth import verify_firebase_token

router = APIRouter()

@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):
    """新規ユーザー登録（Firebase UIDと共にデータベースへ保存）"""
    # 既存のメールアドレスがあるかチェック
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="既に登録済みのEmailです")

    db_user = User(
        firebase_uid=user.firebase_uid,
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        phone_number=user.phone_number,
        address=user.address,
        created_at=func.now(),
        updated_at=func.now()
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

#GET（登録されたデータの履歴一覧）
@router.get("/users", response_model=list[UserResponse])
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users

@router.get("/users/me", response_model=UserResponse)
def get_me(id_token: str, db: Session = Depends(get_db)):
    """現在ログイン中のユーザー情報を取得"""
    firebase_uid = verify_firebase_token(id_token)

    user = db.query(User).filter(User.firebase_uid == firebase_uid).first()
    if not user:
        raise HTTPException(status_code=404, detail="ユーザーが見つかりません")

    return user