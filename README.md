# Section_9_team_chariho

## 🚵 プロジェクト概要

### 背景

- 地方では公共交通機関が限られており、観光客や住民の移動手段が不足しています。また、不要になった自転車の廃棄コストが高く、活用されずに放置されるケースも多いです。
- このプロジェクトでは、使われなくなった自転車を再利用し、手軽に貸し借りできるプラットフォームを提供することで、移動の利便性向上と地域活性化を目指します。

### 目的

- 使われなくなった自転車を再活用し、廃棄コストを削減
- 観光客や住民が簡単にレンタサイクルを利用できる仕組みを提供
- 貸す側が収益を得られるシェアリングエコノミーを実現
- リアルタイムの位置追跡なしで、安全かつ簡単な貸し借りを可能にする仕組みを構築

### 想定ユーザー

**借りる側（観光客・住民）**

- スマホで簡単に自転車を借りたい人
- 観光や移動手段としてレンタサイクルを活用したい人

**貸す側（住民）**

- 使わなくなった自転車を有効活用したい人
- 自転車を廃棄せずに収益化したい人

### 収益モデル

- **レンタル料金**（ユーザーが支払う利用料）

- **貸す側への手数料**（マッチングプラットフォーム利用料）

## 🛠️ 機能一覧

**借りる側（観光客・住民向け）**

- 自転車検索 & 予約

  - GPS を活用して、近くの貸し出し可能な自転車を検索
    - 現在地や目的地周辺の自転車を検索可能
    - 空き状況をリアルタイムで確認
  - 自転車の情報から種類・位置情報を確認し、アプリで予約
    - 電動アシスト自転車、マウンテンバイクなど写真を見て種類別に選択可能
  - 予約時間になると自動的に料金が発生（利用開始が遅れても課金開始）

- 返却手続き & 決済（位置追跡なし）

  - 返却時に GPS で「貸し借り所」にいるかを判定
    - 事前に登録されたステーションでのみ返却可能
  - 正しい場所なら「決済ボタン」が表示され、決済が完了
    - 自動決済機能あり（登録済みの支払い方法で決済）
    - 利用料金の詳細を確認後、確定可能
  - 貸す側に「返却されました」の通知が送られる（リアルタイム通知）
    - 返却確認が取れると、貸し手へ通知
    - トラブル発生時はサポートへ報告可能
  - 鍵をかけて返却完了
    - 物理鍵の場合は指定の方法で施錠

- 利用履歴の確認
  - これまで貸した自転車の履歴を閲覧
    - 日時・場所・使用時間・料金の詳細を表示
  - 料金・利用時間を確認
    - 累積利用時間などの統計も表示

**貸す側（住民向け）**

- 自転車の登録・管理

  - 使わなくなった自転車を登録し、貸し出し可能な期間・時間を設定
    - 画像のアップロード
    - 保管場所・施錠方法・料金等の細かい設定
  - 貸し出し状況をリアルタイムで確認
    - どの自転車が貸出中か一覧表示
    - 予約・貸出履歴の閲覧が可能

- 収益管理

  - 貸し出し回数や収益を管理し、報酬を受け取る仕組み
    - 収益データの閲覧（週・月単位でレポート）
    - 支払い方法の選択（銀行振込・電子マネーなど）
  - 貸した回数に応じて収益が支払われる
    - 一定回数以上の貸出でボーナス報酬

- 防犯対策（リアルタイム追跡なし）

  - 返却時のみ GPS で貸し借り所を確認（それ以外では返却不可）
    - 未登録の場所での返却は禁止
  - 長時間未返却の警告通知（予約時間を超えたら自動通知）
    - 一定時間以上の超過で追加料金が発生
    - 強制返却モードの導入（運営側で回収手続き）
  - 返却完了通知（貸す側に「返却されました」の通知を送る）
    - 返却確認後、システム上でステータスが更新
  - ルール違反のペナルティ（未返却・無断延長を繰り返すユーザーは利用制限）
    - 利用制限措置（一定回数の違反でアカウント停止）
    - 保証金の導入（ルール違反時の補償対応）

## ⛑️ 主要技術

### フロントエンド

- 使用言語：Typescript
- Framework：Next.js

### バックエンド

- 使用言語：Python
- Framework：FastAPI
- Database：PostgreSQL、Firebase storage

### 認証

- Firebase

### 決済機能

- Stripe

### その他

- Google Maps
- GitHub
- Docker & Docker Compose

## 🧩 ディレクトリ構成

```
section_9_team_chariho
├── .vscode          # VSCodeのプロジェクト設定
├── backend          # バックエンドのソースコード
├── docs             # プロジェクトに関するドキュメント（各設計書、図など）
├── frontend         # フロントエンドのソースコード
└── README.md        # プロジェクト全体の説明と使用方法
```

## 🚀 セットアップと開発方法

### 前提条件

- Docker および Docker Compose がインストール済み
- 認証機能用 Firebase プロジェクト設定

### セットアップ手順

1. リポジトリをクローン

   ```
    git clone https://github.com/ms-engineer-bc24-12/Section_9_team_chariho.git
    cd Section_9_team_chariho
   ```

1. フロントエンドのセットアップ

   ```
    cd frontend
    npm install # 依存パッケージのインストール
    cp .env.example .env.local  # 環境変数を設定
   ```

1. バックエンドのセットアップ

   ```
    cd backend
    python -m venv venv # 仮想環境作成
    source venv/bin/activate  # Windows: venv\Scripts\activate # 仮想環境有効化
    pip install -r requirements.txt # 依存パッケージのインストール
    cp .env.example .env  # .envファイルを作成
    docker-compose up -d  # PostgreSQLを起動
    python create_tables.py # テーブル作成
   ```

1. Firebase 認証 & ストレージのセットアップ

   ```
    firebase login
    firebase init
    # .envファイルに記述（フロントエンド用環境変数）
    NEXT_PUBLIC_FIREBSE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   ```

1. Stripe 決済 API のセットアップ

   ```
    # .envファイルに記述（Stripe APIキーを環境変数に追加）
    STRIPE_SECRET_KEY=your_secret_key
    STRIPE_PUBLIC_KEY=your_public_key
    # Webhookリスナーを起動（決済完了イベントを取得）
    stripe login
    stripe listen --forward-to http://localhost:8000/payments/stripe-webhook/
   ```

1. Google Maps API のセットアップ

   ```
    # .envファイルに記述（APIキーを取得し、環境変数に追加）
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key
   ```

1. GPS 位置情報の取得（ブラウザ API）

   ```
    const getCurrentLocation = (): void => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
          },
          (error: GeolocationPositionError) => {
            console.error("Error getting location:", error.message);
          }
        )
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    // 関数を実行
    getCurrentLocation();
   ```

1. 開発サーバーの起動

   - フロントエンド

     ```
      cd frontend
      npm run dev # http://localhost:3000 で確認
     ```

   - バックエンド

     ```
      cd backend
      uvicorn main:app --reload  # http://127.0.0.1:8000/docs でAPI確認
     ```

## 🔑Linter & Formatter

フロントエンド

- ESLint：コード品質の維持
- prettier：コードフォーマットの統一

バックエンド

- flake8：コード品質の維持
- black：コードフォーマットの統一

## 📑 テストの実行方法

- フロントエンド

  ```
   npm test
  ```

- バックエンド

  ```
   pytest tests/
  ```

## ⚙️ 開発ルール

### 1. **ブランチ運用**

**作業内容ごとにブランチを分けて管理し、完成したらメインに統合する方法**

- **メインブランチ**: `main`
  - 常にデプロイ可能な状態を維持
  - 直接コミットはせず、必ず PR を通じてマージ
  - `name` は自分の名前
- **機能開発ブランチ**: `feature/xxx_name` (例: `feature/login_name`)
  - 新しい機能開発用
  - `main`から分岐し、開発後に PR で`main`へマージ
- **バグ修正ブランチ**: `bugfix/xxx_name` (例: `bugfix/login_name`)
  - バグ修正用
  - `main`から分岐し、修正後に PR で`main`へマージ
- **ドキュメントブランチ**: `doc/xxx_name` (例: `doc/readme_name`)
  - ドキュメントの追加や修正用
  - `main`から分岐し、完了後に PR で`main`へマージ
- **整理・変更ブランチ**: `refactor/xxx_name` (例: `refactor/project_structure_name`)
  - ディレクトリ構成やコードの整理・変更用

### 2. **PR ルール**

**コードをレビューしてもらうためのルール。変更内容を PR にまとめて、他の人に確認してもらう**

- **PR 作成フロー**:

  1. `main`から新しい`feature`や`bugfix`ブランチを作成
  2. 作業を進めて、適切なタイミングで PR を作成
  3. **PR 記載項目**:

     - ##やったこと
     - ##特にレビューして欲しい箇所
     - ##動作確認(スクショ等)
     - ##その他

  4. **レビュー**:
     - 最低 1 人以のレビューを必須
     - 大きな変更は細かく PR を分割
     - レビュー後、必要に応じて修正し再度レビューを受ける
  5. PR 承認後、`main`にマージ
  6. マージ後はブランチを削除（残す場合はコメントで明記）

- **PR のルール**:
  - `main`ブランチへの直接マージは禁止
  - PR レビュー後のマージ時にコンフリクトが発生した場合は、`feature`側で解決

### 3. **コミットメッセージ規則**

**変更内容をわかりやすくするために、メッセージの前にプレフィックス（例：`add`, `fix`）をつけるルール**

**GitHub コミットメッセージ規則**

| **Prefix**  | **用途**                           |
| ----------- | ---------------------------------- |
| `feat:`     | 新機能追加                         |
| `doc:`      | ドキュメントの更新                 |
| `fix:`      | バグ・不具合の修正                 |
| `refactor:` | リファクタリング                   |
| `style:`    | コードのフォーマットやスタイル修正 |
| `test:`     | テストコードの追加や修正           |
| `delete:`   | 不要なファイルや機能の削除         |

- **例**

  ```yaml
  "feat:ユーザーログイン機能を実装"
  "fix:ログインバグ修正"
  "doc:READMEの更新"
  ```

### 4. **コード内アノテーションコメント**

**コード内で、TODO や FIXME のように、後でやるべきことや修正が必要な場所をコメントで記載する方法**

| **annotation** | **用途**                                             |
| -------------- | ---------------------------------------------------- |
| `TODO:`        | あとで追加・修正が必要な箇所                         |
| `FIXME:`       | 既知の不具合があるコード                             |
| `HACK:`        | 一時的な解決策（本番環境で動作するが、最適ではない） |
| `XXX:`         | 危険なコード、動作が不明                             |
| `REVIEW:`      | 動作意図の確認が必要                                 |
| `OPTIMIZE:`    | パフォーマンス改善の余地あり                         |
| `CHANGED:`     | 変更点の記録                                         |
| `NOTE:`        | なぜそうしたかのメモ                                 |
| `WARNING:`     | 注意が必要な箇所                                     |

- **例**:

  ```yaml
  //TODO:あとで追加・修正が必要な箇所
  ```

### 5. **プロジェクト管理**

- **Notion**: タスク管理をカンバン形式で行い、`Todo`、`In Progress`、`Done`を用いて進捗を可視化
- **Issues**: 各タスクごとに`Issues`を作成し、作業ブランチを作成する
- **Pull Requests**:
  - ローカルで作業後、リモートの`feature`ブランチにプッシュし PR を作成
  - **PR レビュー**: チームメンバー 1 人以上のレビューを受けて、承認後に`main`へマージ
  - **マージ後**: 変更内容をチーム全員で共有し、必要に応じてブランチを削除（コメントで明記）

**Pull Request テンプレート**:

```
## issue 番号 概要
## やったこと
## 特にレビューして欲しい箇所
## 動作確認(スクショ等)
## その他
```

## 🎖️ 開発チーム

このプロジェクトは、Section9 chariho のメンバーが開発しています。

★「Chariho」から連想できるアイデア

響きや語感からの連想

**チャリ + Ho（放つ・広がる）** → **「自転車が街に広がる」イメージ**

地域活性化やシェアリングの概念と結びつく

**Ho = Home** → **「自転車の新しい居場所」**

使われなくなった自転車に新しい役割を与える

**Ho = Hop** → **「気軽にひとっ走り！」**

軽快に自転車を借りて移動するイメージ
