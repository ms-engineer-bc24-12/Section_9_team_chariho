# **API 設計書**

## **概要**

Charihoは、誰でも「借りる側」と「貸す側」両方の機能を利用可能 なシェアサイクルサービスです。

本 API は、ユーザー登録後、レンタル・貸し出し・決済を行うためのエンドポイントを提供 します。

---

## **ベース情報**

- Base URL：`https://api.example.com/v1`
- 認証：Firebase Authentication（Bearer Token 使用）
- データ形式：JSON

---

## **ユーザーモデル（データベース構造）**

| 項目 | 型 | 説明 |
| --- | --- | --- |
| `user_id` | `UUID` | ユーザーの一意識別ID |
| `name` | `string` | ユーザー名 |
| `email` | `string` | メールアドレス（ログイン用） |
| `phone_number` | `string` | 電話番号 |
| `password` | `string` | ハッシュ化されたパスワード |
| `created_at` | `datetime` | アカウント作成日時 |


---

## **エンドポイント一覧**

| **カテゴリ** | **メソッド** | **エンドポイント** | **説明** |
| --- | --- | --- | --- |
| **ユーザー** | `POST` | `/users/register` | ユーザー登録 |
|  | `GET` | `/users/{user_id}` | ユーザー情報取得 |
| **自転車** | `POST` | `/bicycles` | 自転車登録 |
|  | `GET` | `/bicycles` | 自転車一覧取得 |
|  | `GET` | `/bicycles/{bicycle_id}` | 自転車詳細取得 |
|  | `PUT` | `/bicycles/{bicycle_id}` | 自転車情報更新 |
|  | `DELETE` | `/bicycles/{bicycle_id}` | 自転車削除 |
| **予約** | `POST` | `/reservations` | 予約作成 |
|  | `GET` | `/reservations/{reservation_id}` | 予約詳細取得 |
|  | `PUT` | `/reservations/{reservation_id}/cancel` | 予約キャンセル |
|  | `GET` | `/users/{user_id}/reservations` | ユーザーの予約一覧取得 |
| **決済** | `POST` | `/payments` | 支払い処理 |
|  | `GET` | `/payments/{payment_id}` | 支払い詳細取得 |
| **レンタル履歴** | `GET` | `/rental_history/{user_id}` | ユーザーのレンタル履歴取得 |
|  | `GET` | `/rental_history/{history_id}` | レンタル履歴詳細取得 |
| **通知** | `GET` | `/notifications/{user_id}` | ユーザーの通知一覧取得 |
|  | `PUT` | `/notifications/{notification_id}/read` | 通知を既読にする |

---

## **各 API 詳犀**

## **1. ユーザー関連 API**

### **1.1 ユーザー登録**

**POST** `/users/register`

### **リクエスト**

```json
{
  "firebase_uid": "abcdef123456",
  "name": "田中 太郎",
  "email": "tanaka@example.com",
  "address": "東京都渋谷区",
  "phone": "090-1234-5678",
  "payment_method": {
    "card": "VISA",
    "last4": "1234"
  }
}

```

### **レスポンス**

```json
{
  "id": 1,
  "firebase_uid": "abcdef123456",
  "name": "田中 太郎",
  "email": "tanaka@example.com",
  "created_at": "2025-02-07T12:00:00Z"
}

```

---

### **1.2 ユーザー情報取得**

**GET** `/users/{user_id}`

### **レスポンス**

```json
{
  "id": 1,
  "firebase_uid": "abcdef123456",
  "name": "田中 太郎",
  "email": "tanaka@example.com",
  "address": "東京都渋谷区",
  "phone": "090-1234-5678",
  "payment_method": {
    "card": "VISA",
    "last4": "1234"
  },
  "created_at": "2025-02-07T12:00:00Z",
  "updated_at": "2025-02-07T12:30:00Z"
}

```

---

## **2. 自転車関連 API**

### **2.1 自転車登録**

**POST** `/bicycles`

### **リクエスト**

```json

{
  "owner_id": 1,
  "image_url": "https://example.com/bike1.jpg",
  "location": "東京都渋谷区",
  "rental_price_per_hour": 500,
  "lock_type": "dial",
  "rental_period": {
    "available_days": ["Monday", "Wednesday", "Friday"],
    "time_slots": ["08:00-12:00", "14:00-18:00"]
  }
}

```

### **レスポンス**

```json

{
  "id": 1,
  "owner_id": 1,
  "image_url": "https://example.com/bike1.jpg",
  "location": "東京都渋谷区",
  "rental_price_per_hour": 500,
  "lock_type": "dial",
  "created_at": "2025-02-07T12:00:00Z"
}

```

---

### **2.2 自転車一覧取得**

**GET** `/bicycles`

### **レスポンス**

```json
[
  {
    "id": 1,
    "owner_id": 1,
    "image_url": "https://example.com/bike1.jpg",
    "location": "東京都渋谷区",
    "rental_price_per_hour": 500
  },
  {
    "id": 2,
    "owner_id": 2,
    "image_url": "https://example.com/bike2.jpg",
    "location": "大阪府大阪市",
    "rental_price_per_hour": 700
  }
]

```

---

## **3. 予約関連 API**

### **3.1 予約作成**

**POST** `/reservations`

### **リクエスト**

```json
{
  "user_id": 1,
  "bicycle_id": 2,
  "rental_start": "2025-02-10T10:00:00Z",
  "rental_end": "2025-02-10T12:00:00Z",
  "payment_method": {
    "card": "VISA",
    "last4": "1234"
  }
}

```

### **レスポンス**

```json
{
  "id": 1,
  "user_id": 1,
  "bicycle_id": 2,
  "rental_start": "2025-02-10T10:00:00Z",
  "rental_end": "2025-02-10T12:00:00Z",
  "status": "pending",
  "created_at": "2025-02-07T12:10:00Z"
}

```

---

### **3.2 予約キャンセル**

**PUT** `/reservations/{reservation_id}/cancel`

### **レスポンス**

```json

{
  "id": 1,
  "status": "cancelled",
  "updated_at": "2025-02-07T12:30:00Z"
}

```

---

## **4. 決済関連 API**

### **4.1 支払い処理**

**POST** `/payments`

### **リクエスト**

```json
{
  "user_id": 1,
  "reservation_id": 1,
  "amount": 1000,
  "status": "pending"
}

```

### **レスポンス**

```json

{
  "id": 1,
  "user_id": 1,
  "reservation_id": 1,
  "amount": 1000,
  "status": "completed",
  "created_at": "2025-02-07T12:20:00Z"
}

```

---

## **5. レンタル履歴 API**

### **5.1 履歴取得**

**GET** `/rental_history/{user_id}`

### **レスポンス**

```json

[
  {
    "id": 1,
    "bicycle_id": 2,
    "rental_start": "2025-02-10T10:00:00Z",
    "rental_end": "2025-02-10T12:00:00Z",
    "total_amount": 1000,
    "status": "completed",
    "created_at": "2025-02-07T12:40:00Z"
  }
]

```

---

## **6. 通知関連 API**

### **6.1 通知一覧取得**

**GET** `/notifications/{user_id}`

### **レスポンス**

```json

[
  {
    "id": 1,
    "user_id": 1,
    "message": "予約が確定しました。",
    "read": false,
    "created_at": "2025-02-07T12:15:00Z"
  }
]
