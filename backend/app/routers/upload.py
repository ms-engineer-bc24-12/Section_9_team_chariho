# app/routers/upload.py
from fastapi import APIRouter, File, UploadFile, Header, HTTPException
from app.utils.firebase_auth import verify_firebase_token
from app.utils.firebase_storage import upload_image

router = APIRouter()

@router.post("/upload-image/")
async def upload_image_api(
    file: UploadFile = File(...), authorization: str = Header(None)
):
    """画像を Firebase Storage にアップロードし、URL を返す"""
    if not authorization:
        raise HTTPException(status_code=401, detail="認証トークンが必要です")
    
    # Firebase のトークンを検証して UID を取得
    user_id = verify_firebase_token(authorization.split(" ")[1])

    # 画像をアップロードして URL を取得
    image_url = upload_image(file, user_id)

    return {"image_url": image_url}
