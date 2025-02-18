import os
import firebase_admin
from firebase_admin import credentials, auth
from fastapi import HTTPException

# 環境変数からGOOGLE_APPLICATION_CREDENTIALSのパスを取得
firebase_credentials_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

if firebase_credentials_path is None:
    raise ValueError("GOOGLE_APPLICATION_CREDENTIALS環境変数が設定されていません。")

# Firebaseの認証設定
cred = credentials.Certificate(firebase_credentials_path)
firebase_admin.initialize_app(cred)

def verify_firebase_token(id_token: str) -> str:
    """FirebaseのIDトークンを検証し、UIDを取得する"""
    try:
        decoded_token = auth.verify_id_token(id_token, clock_skew_seconds=60) # 時刻ズレ許容
        return decoded_token["uid"]
    except auth.ExpiredIdTokenError:
        raise HTTPException(status_code=401, detail="トークンが期限切れです。もう一度ログインしてください。")
    except auth.InvalidIdTokenError:
        raise HTTPException(status_code=401, detail="無効なトークンです。")
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"認証エラー: {str(e)}")
