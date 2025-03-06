from fastapi import APIRouter
from pydantic import BaseModel
from firebase_admin import messaging
from app.utils.firebase import *

router = APIRouter()

class NotificationRequest(BaseModel):
    token: str
    title: str
    body: str

@router.post("/send-notification/")
def send_notification(request: NotificationRequest):
    print(f"Received FCM Token: {request.token}")  # ここでトークンを出力

    message = messaging.Message(
        notification=messaging.Notification(
            title=request.title,
            body=request.body,
        ),
        token=request.token,
    )

    try:
        response = messaging.send(message)
        print(f"Notification sent successfully: {response}")  # 通知送信成功時のログ
        return {"message_id": response}
    except Exception as e:
        print(f"Failed to send notification: {e}")  # エラー発生時のログ
        return {"error": str(e)}