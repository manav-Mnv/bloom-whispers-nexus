# main.py
import os
import shutil
from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import Optional
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

@app.post("/chat/text")
async def text_chat(request: ChatRequest):
    """
    Text-based chat endpoint using different AI models based on chat_type.
    """
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
    """
    Voice chat endpoint: accepts audio file, transcribes it, and generates AI response.
    """
    file_location = f"temp_{audio_file.filename}"
    try:
        with open(file_location, "wb") as file_object:
            shutil.copyfileobj(audio_file.file, file_object)

        transcribed_text = transcribe_audio(file_location)

        # Example: use general blenderbot for response
        ai_response = get_blenderbot_response(transcribed_text)

        # Optionally, extract audio features (placeholder)
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

@app.post("/mood/check")
async def mood_check(request: TextAnalysisRequest):
    """
    Analyze mood from text input using two emotion detection models.
    """
    emotion_jhartmann = detect_emotion_jhartmann(request.text)
    emotion_samlowe = detect_emotion_samlowe(request.text)
    return {
        "j_hartmann_emotion": emotion_jhartmann,
        "sam_lowe_emotion": emotion_samlowe
    }

@app.post("/confession/submit")
async def submit_confession(request: ConfessionRequest):
    """
    Submit a confession, perform content moderation, emotion analysis, and generate AI response.
    """
    toxicity_bert = detect_toxicity_toxicbert(request.confession_text)
    toxicity_martin_ha = detect_toxicity_martin_ha(request.confession_text)
    confession_emotion = detect_emotion_twitter_roberta(request.confession_text)

    ai_response = get_blenderbot_response(
        f"User  confessed: {request.confession_text}. Provide a supportive response."
    )

    return {
        "moderation_results": {
            "toxic_bert": toxicity_bert,
            "martin_ha_toxic_model": toxicity_martin_ha
        },
        "confession_emotion": confession_emotion,
        "ai_response": ai_response
    }

@app.post("/analytics/text-patterns")
async def analyze_text_patterns(request: TextAnalysisRequest):
    """
    Analyze text for mood and behavioral patterns (demo with single text).
    """
    jhartmann_analysis = detect_emotion_jhartmann(request.text)
    samlowe_analysis = detect_emotion_samlowe(request.text)

    return {
        "j_hartmann_analysis": jhartmann_analysis,
        "sam_lowe_analysis": samlowe_analysis,
        "insights": "Further analysis requires historical data and trend detection."
    }

# To run this app:
# uvicorn main:app --reload --host 0.0.0.0 --port 8000
