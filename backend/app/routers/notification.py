from fastapi import APIRouter
from pydantic import BaseModel
import firebase_admin
from firebase_admin import credentials, messaging

# Firebase Admin SDKのセットアップ
cred = credentials.Certificate("app/secrets/chariho-firebase-adminsdk-fbsvc-4ee2d1943e.json")
firebase_admin.initialize_app(cred)

router = APIRouter()

class NotificationRequest(BaseModel):
    token: str
    title: str
    body: str

@router.post("/send-notification/")
def send_notification(request: NotificationRequest):
    message = messaging.Message(
        notification=messaging.Notification(
            title=request.title,
            body=request.body,
        ),
        token=request.token,
    )
    response = messaging.send(message)
    return {"message_id": response}
