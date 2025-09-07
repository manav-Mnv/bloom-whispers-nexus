import os
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_DETAILS = os.getenv("MONGO_URI", "mongodb+srv://bloom:bloomXcode@bloom.lf7f5lx.mongodb.net/?retryWrites=true&w=majority&appName=bloom")

client = AsyncIOMotorClient(MONGO_DETAILS)
database = client.bloom_db  # Use 'bloom_db' database

# Example user CRUD functions

async def add_user(user: dict):
    result = await database.users.insert_one(user)
    return str(result.inserted_id)

async def get_user_by_username(username: str):
    user = await database.users.find_one({"username": username})
    return user
