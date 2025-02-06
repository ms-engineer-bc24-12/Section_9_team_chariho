# データベース設計書

データ管理に必要な情報を整理し、データベースを構築・運用するための設計図です。

## テーブル一覧

### 1. user（ユーザー情報）

- アプリユーザーの登録情報を管理

  | **カラム名**   | **データ型** | **説明**       |
  | -------------- | ------------ | -------------- |
  | id             | INT          | 主キー         |
  | firebase_uid   | INT          | 認証用 UID     |
  | name           | VARCHAR(100) | ユーザー名     |
  | email          | VARCHAR(255) | メールアドレス |
  | password       | VARCHAR(255) | パスワード     |
  | adress         | TEXT         | 住所           |
  | phone          | VARCHAR(20)  | 電話番号       |
  | payment_method | JSONB        | 決済方法       |
  | created_at     | TIMESTAMP    | 作成日時       |
  | updated_at     | TIMESTAMP    | 更新日時       |

### 2. bicycles（自転車情報）

- レンタル自転車の登録情報を管理

  | **カラム名**          | **データ型**  | **説明**                          |
  | --------------------- | ------------- | --------------------------------- |
  | id                    | INT           | 主キー                            |
  | owner_id              | INT           | ユーザー ID（外部キー）           |
  | image_url             | TEXT          | 自転車の写真 URL                  |
  | location              | TEXT          | 自転車の保管住所                  |
  | rental_price_per_hour | DECIMAL(10,2) | 1 時間あたりの料金                |
  | lock_type             | VARCHAR(50)   | 鍵方式（key: 鍵, dial: ダイヤル） |
  | rental_period         | JSONB         | 貸出可能な期間情報                |
  | created_at            | TIMESTAMP     | 作成日時                          |
  | updated_at            | TIMESTAMP     | 更新日時                          |

### 3. reservations（予約情報）

- レンタル自転車の予約情報を管理

  | **カラム名**   | **データ型** | **説明**                |
  | -------------- | ------------ | ----------------------- |
  | id             | INT          | 主キー                  |
  | user_id        | INT          | ユーザー ID（外部キー） |
  | bicycle_id     | INT          | 自転車 ID（外部キー）   |
  | rental_start   | TIMESTAMP    | 希望開始日時            |
  | rental_end     | TIMESTAMP    | 希望終了日時            |
  | payment_method | JSONB        | 予約時の決済方法        |
  | status         | VARCHAR(50)  | 予約の状態              |
  | created_at     | TIMESTAMP    | 作成日時                |
  | updated_at     | TIMESTAMP    | 更新日時                |

### 4. notifications（通知情報）

- アプリ内の通知情報を管理

  | **カラム名** | **データ型** | **説明**                |
  | ------------ | ------------ | ----------------------- |
  | id           | INT          | 主キー                  |
  | user_id      | INT          | ユーザー ID（外部キー） |
  | message      | TEXT         | 通知メッセージ          |
  | read         | BOOLEAN      | 既読フラグ              |
  | created_at   | TIMESTAMP    | 通知日時                |

### 5. payments（決済情報）

- 予約の決済情報を管理

  | **カラム名**   | **データ型**  | **説明**                |
  | -------------- | ------------- | ----------------------- |
  | id             | INT           | 主キー                  |
  | user_id        | INT           | ユーザー ID（外部キー） |
  | reservation_id | INT           | 予約 ID（外部キー）     |
  | amount         | DECIMAL(10,2) | 支払い金額              |
  | status         | VARCHAR(50)   | 支払いの状態            |
  | created_at     | TIMESTAMP     | 支払い日時              |

### 6. rental_history（レンタル履歴情報）

- レンタル履歴情報を管理

  | **カラム名** | **データ型**  | **説明**                                         |
  | ------------ | ------------- | ------------------------------------------------ |
  | id           | INT           | 主キー                                           |
  | user_id      | INT           | 利用者ユーザー ID（外部キー）                    |
  | bicycle_id   | INT           | 自転車の ID（外部キー）                          |
  | owner_id     | INT           | 管理者のユーザー ID（外部キー）                  |
  | rental_start | TIMESTAMP     | レンタル開始日時                                 |
  | rental_end   | TIMESTAMP     | レンタル終了日時                                 |
  | total_amount | DECIMAL(10,2) | 支払総額                                         |
  | payment_id   | INT           | 関連する支払い情報（外部キー）                   |
  | status       | VARCHAR(50)   | completed: レンタル完了 / disputed: トラブル発生 |
  | created_at   | TIMESTAMP     | 履歴記録日時                                     |
