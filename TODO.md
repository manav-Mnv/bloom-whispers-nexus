# TODO: Remove MongoDB, Add Supabase with Auth, and Redis Cache

## Tasks
- [x] Update backend/requirements.txt: Remove motor, add supabase-py
- [x] Create backend/supabase_client.py: Initialize Supabase client with environment variables
- [x] Update backend/main.py: Remove MongoDB imports and usage, add Supabase Auth endpoints
- [x] Remove backend/mongo_db.py: Delete or disable MongoDB related code
- [x] Update backend/redis_client.py: Fix issues and add cache functions
- [ ] Test backend endpoints after changes
- [ ] Update frontend if needed for Supabase Auth integration

## Notes
- Keep Redis integration as is for caching
- Add environment variables for Supabase URL and key
- Implement signup, login, logout endpoints with Supabase Auth
