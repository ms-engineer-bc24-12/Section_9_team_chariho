import os
import firebase_admin
from firebase_admin import credentials

# 環境変数からGOOGLE_APPLICATION_CREDENTIALSのパスを取得
firebase_credentials_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

if firebase_credentials_path is None:
    raise ValueError("GOOGLE_APPLICATION_CREDENTIALS環境変数が設定されていません。")

# Firebaseの初期化（すでに初期化済みでない場合のみ実行）
if not firebase_admin._apps:
    cred = credentials.Certificate(firebase_credentials_path)
    firebase_admin.initialize_app(cred)
