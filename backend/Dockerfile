# ベースイメージとしてPython 3.11を使用
FROM python:3.11

# 作業ディレクトリを設定
WORKDIR /app

# 依存パッケージをインストール
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# アプリケーションコードをコピー
COPY . .

# Uvicornを使ってFastAPIアプリを起動
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

