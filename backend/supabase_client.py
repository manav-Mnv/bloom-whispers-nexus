import os
from supabase import create_client, Client

SUPABASE_URL = os.getenv("SUPABASE_URL", "https://lhglbsmdrwipppscagzb.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxoZ2xic21kcndpcHBwc2NhZ3piIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNTE5NzksImV4cCI6MjA3MjgyNzk3OX0.4DpBeHso5s7PErY8rUagRlZsQy5u554Yp9jjPpqxIlM")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Example functions for user management
async def sign_up_user(email: str, password: str):
    try:
        response = supabase.auth.sign_up({
            "email": email,
            "password": password,
        })
        return response
    except Exception as e:
        raise Exception(f"Sign up failed: {str(e)}")

async def sign_in_user(email: str, password: str):
    try:
        response = supabase.auth.sign_in_with_password({
            "email": email,
            "password": password,
        })
        return response
    except Exception as e:
        raise Exception(f"Sign in failed: {str(e)}")

async def sign_out_user():
    try:
        response = supabase.auth.sign_out()
        return response
    except Exception as e:
        raise Exception(f"Sign out failed: {str(e)}")

async def get_current_user():
    try:
        user = supabase.auth.get_user()
        return user
    except Exception as e:
        raise Exception(f"Get user failed: {str(e)}")
