from firebase_admin import auth
from fastapi import HTTPException
from app.utils.firebase import * 

def verify_firebase_token(id_token: str) -> str:
    """FirebaseのIDトークンを検証し、UIDを取得する"""
    try:
        decoded_token = auth.verify_id_token(
            id_token, clock_skew_seconds=60
        )  # 時刻ズレ許容
        return decoded_token["uid"]
    except auth.ExpiredIdTokenError:
        raise HTTPException(
            status_code=401,
            detail="トークンが期限切れです。もう一度ログインしてください。",
        )
    except auth.InvalidIdTokenError:
        raise HTTPException(status_code=401, detail="無効なトークンです。")
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"認証エラー: {str(e)}")
