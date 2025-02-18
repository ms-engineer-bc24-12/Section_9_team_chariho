from fastapi.middleware.cors import CORSMiddleware

def add_cors_middleware(app):
    """CORSミドルウェアをアプリケーションに追加する"""
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # フロントエンドのURLを指定（開発中は * でもOK）
        allow_credentials=True,
        allow_methods=["*"],  # すべてのHTTPメソッドを許可
        allow_headers=["*"],  # すべてのヘッダーを許可
    )
