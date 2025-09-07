from dotenv import load_dotenv
load_dotenv()

import os
import shutil
from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel

from mongo_db import add_user, get_user_by_username  # MongoDB helper functions
from redis_client import set_streak, get_streak     # Redis helper functions

from models.hf_models import (
    get_dialogpt_medium_response,
    get_dialogpt_large_response,
    get_blenderbot_response,
    transcribe_audio,
    detect_emotion_jhartmann,
    detect_emotion_samlowe,
    detect_toxicity_toxicbert,
    detect_toxicity_martin_ha,
    detect_emotion_twitter_roberta,
    process_audio_features  # Placeholder for audio feature extraction
)

app = FastAPI(
    title="BLOOM AI Backend",
    description="API for Mental Wellness & AI Companion features",
    version="1.0.0",
)

# Request Models
class ChatRequest(BaseModel):
    prompt: str
    chat_type: str  # "study_buddy", "advisor", "general"

class TextAnalysisRequest(BaseModel):
    text: str

class ConfessionRequest(BaseModel):
    confession_text: str

# Chat endpoints
@app.post("/chat/text")
async def text_chat(request: ChatRequest):
    if request.chat_type == "study_buddy":
        response = get_dialogpt_medium_response(request.prompt)
    elif request.chat_type == "advisor":
        response = get_dialogpt_large_response(request.prompt)
    elif request.chat_type == "general":
        response = get_blenderbot_response(request.prompt)
    else:
        raise HTTPException(status_code=400, detail="Invalid chat_type")
    return {"response": response}

@app.post("/chat/voice")
async def voice_chat(audio_file: UploadFile = File(...)):
    file_location = f"temp_{audio_file.filename}"
    try:
        with open(file_location, "wb") as file_object:
            shutil.copyfileobj(audio_file.file, file_object)

        transcribed_text = transcribe_audio(file_location)
        ai_response = get_blenderbot_response(transcribed_text)
        audio_features = process_audio_features(file_location)

        return {
            "transcribed_text": transcribed_text,
            "ai_response": ai_response,
            "audio_features": audio_features
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing audio: {e}")
    finally:
        if os.path.exists(file_location):
            os.remove(file_location)

# Mood analysis endpoint
@app.post("/mood/check")
async def mood_check(request: TextAnalysisRequest):
    emotion_jhartmann = detect_emotion_jhartmann(request.text)
    emotion_samlowe = detect_emotion_samlowe(request.text)
    return {
        "j_hartmann_emotion": emotion_jhartmann,
        "sam_lowe_emotion": emotion_samlowe
    }

# Confession submission endpoint
@app.post("/confession/submit")
async def submit_confession(request: ConfessionRequest):
    toxicity_bert = detect_toxicity_toxicbert(request.confession_text)
    toxicity_martin_ha = detect_toxicity_martin_ha(request.confession_text)
    confession_emotion = detect_emotion_twitter_roberta(request.confession_text)

    ai_response = get_blenderbot_response(
        f"User confessed: {request.confession_text}. Provide a supportive response."
    )

    return {
        "moderation_results": {
            "toxic_bert": toxicity_bert,
            "martin_ha_toxic_model": toxicity_martin_ha
        },
        "confession_emotion": confession_emotion,
        "ai_response": ai_response
    }

# Text analytics endpoint
@app.post("/analytics/text-patterns")
async def analyze_text_patterns(request: TextAnalysisRequest):
    jhartmann_analysis = detect_emotion_jhartmann(request.text)
    samlowe_analysis = detect_emotion_samlowe(request.text)

    return {
        "j_hartmann_analysis": jhartmann_analysis,
        "sam_lowe_analysis": samlowe_analysis,
        "insights": "Further analysis requires historical data and trend detection."
    }

# MongoDB user endpoints
@app.post("/users/")
async def create_user(user: dict):
    existing_user = await get_user_by_username(user.get("username"))
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    user_id = await add_user(user)
    return {"user_id": user_id}

# Redis streak endpoints
@app.post("/streak/{user_id}")
def update_streak(user_id: str, count: int):
    set_streak(user_id, count)
    return {"message": f"Streak updated to {count}"}

@app.get("/streak/{user_id}")
def read_streak(user_id: str):
    streak = get_streak(user_id)
    return {"user_id": user_id, "streak": streak}
