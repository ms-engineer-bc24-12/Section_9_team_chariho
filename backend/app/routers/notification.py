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
    message = messaging.Message(
        notification=messaging.Notification(
            title=request.title,
            body=request.body,
        ),
        token=request.token,
    )
    response = messaging.send(message)
    return {"message_id": response}
