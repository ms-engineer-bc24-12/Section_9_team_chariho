# データベース設計書

データ管理に必要な情報を整理し、データベースを構築・運用するための設計図です。

## テーブル一覧

### 1. user（ユーザー情報）

- アプリユーザーの登録情報を管理

| **カラム名** | **データ型** | **説明**                         |
| ------------ | ------------ | -------------------------------- |
| id           | INT          | 主キー（自動増分）               |
| firebase_uid | VARCHAR(255) | Firebase 認証用 UID              |
| first_name   | VARCHAR(100) | 名                               |
| last_name    | VARCHAR(100) | 姓                               |
| email        | VARCHAR(255) | メールアドレス（ユニーク）       |
| address      | VARCHAR(255) | 住所                             |
| phone_number | VARCHAR(20)  | 電話番号                         |
| created_at   | TIMESTAMP    | 作成日時（デフォルト: 現在時刻） |
| updated_at   | TIMESTAMP    | 更新日時（自動更新）             |

### 2. bicycles（自転車情報）

- レンタル自転車の登録情報を管理

| **カラム名**          | **データ型**     | **説明**                         |
| --------------------- | ---------------- | -------------------------------- |
| id                    | BIGINT           | 主キー                           |
| owner_id              | INT              | ユーザー ID（外部キー）          |
| bikename              | VARCHAR(50)      | 自転車名                         |
| image_url             | TEXT             | 自転車の写真 URL                 |
| latitude              | DOUBLE PRECISION | 自転車の緯度                     |
| longitude             | DOUBLE PRECISION | 自転車の経度                     |
| rental_price_per_hour | DECIMAL(10,2)    | 1 時間あたりの料金（0 以上）     |
| lock_type             | VARCHAR(10)      | 鍵方式（"key" or "dial"）        |
| rental_period         | JSONB            | 貸出可能な期間情報               |
| created_at            | TIMESTAMP        | 作成日時（デフォルト: 現在時刻） |
| updated_at            | TIMESTAMP        | 更新日時（自動更新）             |

### 3. reservations（予約情報+ 決済情報）

- レンタル自転車の予約および Stripe を使用した決済情報を管理

| **カラム名**        | **データ型**  | **説明**                         |
| ------------------- | ------------- | -------------------------------- |
| id                  | INT           | 主キー（自動増分）               |
| user_id             | INT           | ユーザー ID（外部キー）          |
| bicycle_id          | BIGINT        | 自転車 ID（外部キー, NULL 可）   |
| hours               | INT           | レンタル時間（1 以上）           |
| amount              | DECIMAL(10,2) | 予約金額（0 以上）               |
| status              | VARCHAR(50)   | 予約状態（"pending" or "paid"）  |
| checkout_session_id | VARCHAR(255)  | Stripe 決済セッション ID         |
| created_at          | TIMESTAMP     | 作成日時（デフォルト: 現在時刻） |

### 4. returns（返却情報）

- 自転車の返却情報を管理

| **カラム名**            | **データ型**     | **説明**                           |
| ----------------------- | ---------------- | ---------------------------------- |
| id                      | INT              | 主キー（自動増分）                 |
| reservation_id          | INT              | 予約 ID（外部キー）                |
| bicycle_id              | BIGINT           | 自転車の ID（外部キー）            |
| user_id                 | INT              | 利用者 ID（外部キー）              |
| actual_return_latitude  | DOUBLE PRECISION | 実際の返却緯度                     |
| actual_return_longitude | DOUBLE PRECISION | 実際の返却経度                     |
| verified                | BOOLEAN          | 位置情報の一致判定（True / False） |
| return_status           | VARCHAR(50)      | "on-time", "late", "damaged"       |
| created_at              | TIMESTAMP        | 返却日時（デフォルト: 現在時刻）   |

---

### 5. earnings（収益情報）

- 貸し手（オーナー）の収益情報を管理

| **カラム名**   | **データ型**  | **説明**                                |
| -------------- | ------------- | --------------------------------------- |
| id             | INT           | 主キー（自動増分）                      |
| owner_id       | INT           | 自転車オーナーのユーザー ID（外部キー） |
| bicycle_id     | BIGINT        | 自転車 ID（外部キー）                   |
| reservation_id | INT           | 予約 ID（外部キー）                     |
| amount_earned  | DECIMAL(10,2) | 貸し手の収益額（0 以上）                |
| created_at     | TIMESTAMP     | 収益発生日時（デフォルト: 現在時刻）    |

---

### 6. rental_history（レンタル履歴情報）

- レンタル履歴情報を管理

  | **カラム名**           | **データ型**  | **説明**                                         |
  | ---------------------- | ------------- | ------------------------------------------------ |
  | id                     | INT           | 主キー                                           |
  | user_id                | INT           | 利用者ユーザー ID（外部キー）                    |
  | bicycle_id             | INT           | 自転車の ID（外部キー）                          |
  | owner_id               | INT           | 管理者のユーザー ID（外部キー）                  |
  | rental_start           | TIMESTAMP     | レンタル開始日時                                 |
  | rental_end             | TIMESTAMP     | レンタル終了日時                                 |
  | expected_location      | TEXT          | 正しい保管場所（自転車登録時の場所）             |
  | actual_return_location | TEXT          | 実際に返却された位置情報（返却時の場所）         |
  | verified               | BOOLEAN       | 位置情報が一致したかの判定                       |
  | total_amount           | DECIMAL(10,2) | 実際の請求額                                     |
  | payment_id             | INT           | 関連する支払い情報（外部キー）                   |
  | status                 | VARCHAR(50)   | completed: レンタル完了 / disputed: トラブル発生 |
  | created_at             | TIMESTAMP     | 履歴記録日時                                     |
