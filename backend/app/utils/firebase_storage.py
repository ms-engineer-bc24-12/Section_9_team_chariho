import os
import firebase_admin
from firebase_admin import storage
from fastapi import HTTPException, UploadFile
from datetime import datetime
import uuid

# 環境変数から Firebase のバケット名を取得
FIREBASE_STORAGE_BUCKET = os.getenv("FIREBASE_STORAGE_BUCKET")

if FIREBASE_STORAGE_BUCKET is None:
    raise ValueError("FIREBASE_STORAGE_BUCKET 環境変数が設定されていません。")

# Firebase Storage の設定
bucket = storage.bucket(FIREBASE_STORAGE_BUCKET)


def upload_image(file: UploadFile, user_id: str) -> str:
    """Firebase Storage に画像をアップロードし、URL を返す"""
    try:
        # 一意のファイル名を作成
        file_extension = file.filename.split(".")[-1]
        unique_filename = f"{uuid.uuid4()}.{file_extension}"
        blob_path = f"{user_id}/{unique_filename}"  # ユーザーごとのフォルダに保存

        # バケットにアップロード
        blob = bucket.blob(blob_path)
        blob.upload_from_file(file.file, content_type=file.content_type)

        # ファイルの公開 URL を取得
        blob.make_public()
        return blob.public_url
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"画像のアップロードに失敗しました: {str(e)}")
