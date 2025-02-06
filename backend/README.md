# 🚀 バックエンド README

## 📌 プロジェクト概要

このプロジェクトは **FastAPI** を使用して構築されたバックエンドシステムです。データベースには **PostgreSQL** を使用し、認証には **Firebase** を採用しています。また、決済機能として **Stripe** を統合しています。

## 🏗️ ディレクトリ構成

```
backend/
├── app/
│   ├── api/                  # APIエンドポイント
│   │   ├── auth.py           # 認証API（Firebase）
│   │   ├── users.py          # ユーザー関連API
│   │   ├── payments.py       # Stripe決済API
│   │   ├── rentals.py        # 自転車レンタルAPI
│   │   ├── uploads.py        # Firebase Storage API
│   │   └── __init__.py
│   ├── core/                 # アプリのコア設定
│   │   ├── config.py         # 環境変数と設定
│   │   ├── security.py       # セキュリティ設定（JWT）
│   │   └── __init__.py
│   ├── models/               # SQLAlchemyのDBモデル
│   │   ├── user.py           # ユーザーモデル
│   │   ├── rental.py         # 自転車レンタルモデル
│   │   ├── payment.py        # 決済モデル
│   │   └── __init__.py
│   ├── schemas/              # Pydanticスキーマ
│   │   ├── user.py           # ユーザースキーマ
│   │   ├── rental.py         # 自転車レンタルスキーマ
│   │   ├── payment.py        # 決済スキーマ
│   │   └── __init__.py
│   ├── services/             # ビジネスロジック
│   │   ├── auth_service.py   # Firebase認証ロジック
│   │   ├── stripe_service.py # Stripe決済ロジック
│   │   ├── rental_service.py # 自転車レンタルロジック
│   │   ├── storage_service.py# Firebase Storageロジック
│   │   └── __init__.py
│   ├── db.py                 # DB接続設定（PostgreSQL）
│   ├── main.py               # FastAPIエントリーポイント
│   ├── dependencies.py       # 依存関係の管理
│   ├── firebase_utils.py     # Firebase関連ユーティリティ
│   ├── logging_config.py     # ロギング設定
│   └── __init__.py
│
├── tests/                    # テストコード
│   ├── test_auth.py          # 認証テスト
│   ├── test_users.py         # ユーザーテスト
│   ├── test_payments.py      # 決済テスト
│   ├── test_rentals.py       # 自転車レンタルテスト
│   └── __init__.py
│
├── migrations/               # Alembicマイグレーション
├── .env                      # 環境変数（.envファイルにDB情報などを管理）
├── docker-compose.yml        # Docker Compose設定（PostgreSQL & FastAPI）
├── Dockerfile                # FastAPI用Dockerfile
├── requirements.txt          # 依存ライブラリ
├── alembic.ini               # Alembic設定
└── README.md                 # バックエンドの説明
```

## 🛠️ 環境構築

### 1. 必要なツール

- Python 3.9+
- Docker & Docker Compose
- PostgreSQL
- Firebase アカウント
- Stripe アカウント

### 2. `.env` の作成

プロジェクトのルートに `.env` ファイルを作成し、以下のように記述してください。

```
DATABASE_URL=postgresql://user:password@db:5432/database_name
FIREBASE_CREDENTIALS=your_firebase_credentials.json
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### 3. Docker で環境構築

```
docker-compose up --build
```

### 4. Alembic マイグレーション実行

```
docker-compose exec backend alembic upgrade head
```

## 🚀 アプリ起動

```
docker-compose up
```

## 🧪 テスト実行

```
docker-compose exec backend pytest
```

## 📌 API エンドポイント

FastAPI のドキュメントは以下の URL で確認できます。

```
http://localhost:8000/docs
```

## 🔧 使用技術

- **バックエンド**: FastAPI (Python)
- **データベース**: PostgreSQL
- **認証**: Firebase
- **決済**: Stripe
- **コンテナ管理**: Docker & Docker Compose

---
