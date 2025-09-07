
import redis
import os

REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
REDIS_DB = int(os.getenv("REDIS_DB", 0))
REDIS_USERNAME = os.getenv("REDIS_USERNAME", None)
REDIS_PASSWORD = os.getenv("REDIS_PASSWORD", None)

redis_client = redis.Redis(
    host=REDIS_HOST,
    port=REDIS_PORT,
    db=REDIS_DB,
    username=default,
    password=bYxZ3EXaznseDUgTpFS4df2qEtC6b6CR,
    decode_responses=True,
)

def set_streak(user_id: str, streak_count: int):
    redis_client.set(f"user:{user_id}:streak", streak_count)

def get_streak(user_id: str):
    streak = redis_client.get(f"user:{user_id}:streak")
    return int(streak) if streak else 0
