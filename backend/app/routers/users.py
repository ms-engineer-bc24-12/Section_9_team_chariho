from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.db import get_db
from app.models import User  # SQLAlchemyのUserモデルをインポート
from app.schemas import UserCreate, UserResponse  # Pydanticのスキーマをインポート
from sqlalchemy.sql import func

router = APIRouter()

#POST（新規ユーザーの登録）
@router.post("/users", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # 既存のメールアドレスがあるかチェック
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="既に登録済みのEmailです")

    db_user = User(
        firebase_uid=user.firebase_uid,
        first_name=user.first_name,
        last_name=user.last_name,
        address=user.address,
        phone_number=user.phone_number,
        email=user.email,
        created_at=user.created_at or func.now(),
        updated_at=user.updated_at or func.now()
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