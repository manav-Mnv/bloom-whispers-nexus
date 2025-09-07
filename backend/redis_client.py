
import redis.asyncio as redis
import os

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")

redis_client = redis.from_url(REDIS_URL, decode_responses=True)

async def set_streak(user_id: str, streak_count: int):
    await redis_client.set(f"user:{user_id}:streak", streak_count)

async def get_streak(user_id: str):
    streak = await redis_client.get(f"user:{user_id}:streak")
    return int(streak) if streak else 0

# Cache functions for general use
async def set_cache(key: str, value: str, expire: int = None):
    if expire:
        await redis_client.setex(key, expire, value)
    else:
        await redis_client.set(key, value)

async def get_cache(key: str):
    return await redis_client.get(key)

async def delete_cache(key: str):
    await redis_client.delete(key)
