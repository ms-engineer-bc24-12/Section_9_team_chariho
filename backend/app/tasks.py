# tasks.py
from celery import Celery
import stripe
import time
from datetime import datetime

# Stripe APIキーの設定
stripe.api_key = 'sk_test_51Qpl1SJzpJ9UCOiVkKPGfNqfPkzMQsHYN8x2XKFpAvk4gpj2DyMo6shH6fD7LuKdKYW4ynl2eyPbGAMZzKOHh4Fb00yeVnWvpv'

# Celeryアプリケーションの設定
app = Celery("tasks", broker="redis://localhost:6379/0")

# Usage Recordを送信するタスク
@app.task
def update_usage(subscription_item_id):
    now = datetime.now()
    try:
        stripe.SubscriptionItem.create_usage_record(
            subscription_item=subscription_item_id,
            quantity=1,  # 1時間ごとに1カウント
            timestamp=int(time.time()),  # 現在のタイムスタンプ
            action="increment"  # 使用量を増加させる
        )
        print(f"Usage recorded for 1 hour at {now}")
    except stripe.error.StripeError as e:
        print(f"Error recording usage: {e}")
