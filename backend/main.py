import warnings
warnings.filterwarnings("ignore", message="X has feature names")
warnings.filterwarnings("ignore", category=UserWarning, module="sklearn")

from fastapi import FastAPI
from pydantic import BaseModel
from ml_service import get_prediction

app = FastAPI(title="Freight Forecast API")

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # prototype-only; tighten before final demo if time permits
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictRequest(BaseModel):
    cargo_type: str
    cargo_tonnes: float
    destination: str
    contract_duration_months: float

@app.get("/")
def health_check():
    return {"status": "ok"}

@app.post("/predict")
def predict(req: PredictRequest):
    return get_prediction(
        cargo_type=req.cargo_type,
        cargo_tonnes=req.cargo_tonnes,
        destination=req.destination,
        contract_duration_months=req.contract_duration_months,
    )