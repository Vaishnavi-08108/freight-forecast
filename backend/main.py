from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Freight Forecast API")

class PredictRequest(BaseModel):
    origin: str
    destination: str
    cargo_type: str
    quantity_tonnes: float
    vessel_type: str

class PredictResponse(BaseModel):
    current_freight: float
    predicted_freight_30d: float
    percent_change: float
    recommendation: str
    reason: str

@app.get("/")
def health_check():
    return {"status": "ok"}

@app.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest):
    # Dummy logic for now — CSE3's real model plugs in here later
    current = 25.0
    predicted = 31.0
    change = round(((predicted - current) / current) * 100, 2)
    recommendation = "CHARTER NOW" if predicted > current else "WAIT"
    reason = "Dummy prediction — real model not connected yet."

    return PredictResponse(
        current_freight=current,
        predicted_freight_30d=predicted,
        percent_change=change,
        recommendation=recommendation,
        reason=reason
    )