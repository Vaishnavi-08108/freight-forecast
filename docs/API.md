# Freight Forecast API — /predict

## Base URL (local dev)
http://127.0.0.1:8000

## Endpoint
POST /predict
Content-Type: application/json

## Request body
{
  "cargo_type": "Coal",
  "cargo_tonnes": 50000,
  "destination": "Paradip Port",
  "contract_duration_months": 3
}

Notes:
- cargo_type: string, e.g. "Coal", "Iron Ore" (must match a commodity the destination port handles)
- cargo_tonnes: number
- destination: string — MUST exactly match a port name in port_details.csv (e.g. "Paradip Port", not "Paradip")
- contract_duration_months: number

## Success response (status: "SUCCESS")
{
  "status": "SUCCESS",
  "forecast": {
    "date": "2026-09-04",
    "current_bdi": 2161.0,
    "predicted_bdi": 2556.41,
    "predicted_change": 395.41,
    "predicted_change_pct": 18.3,
    "market_condition": "Strong Rise",
    "model_uncertainty": 478.02,
    "risk_level": "High Risk",
    "charter_action": "CHARTER SOON — HIGH UNCERTAINTY"
  },
  "cargo": { "type": "Coal", "quantity_tonnes": 50000.0 },
  "contract": {
    "duration_months": 3.0,
    "contract_type": "Short-Term Multiple-Voyage",
    "strategy": "Secure capacity soon, but avoid overcommitting to a long-term contract."
  },
  "port": {
    "destination": "Paradip Port",
    "operational_risk": "Low",
    "warning": "No monsoon restriction reported"
  },
  "vessel": {
    "status": "SUCCESS",
    "message": null,
    "recommended": "Supramax",
    "capacity_utilization": 90.91,
    "ranking": [
      { "vessel_class": "Supramax", "typical_dwt": 55000.0, "draft": 11.0, "loa": 200.0, "beam": 32.0, "capacity_utilization_pct": 90.91, "suitability_score": 90.91 },
      { "vessel_class": "Panamax", "typical_dwt": 75000.0, "draft": 13.5, "loa": 225.0, "beam": 32.0, "capacity_utilization_pct": 66.67, "suitability_score": 66.67 },
      { "vessel_class": "Capesize", "typical_dwt": 150000.0, "draft": 17.0, "loa": 290.0, "beam": 45.0, "capacity_utilization_pct": 33.33, "suitability_score": 33.33 }
    ]
  }
}

## Other possible statuses
- "PORT-CARGO MISMATCH" — cargo type isn't handled at that port. Response has "forecast" + "port_warning" only, no "cargo"/"vessel" keys — handle this shape separately in the UI.
- vessel.status: "NO SUITABLE VESSEL" — no vessel class fits port + cargo size; "ranking" will be an empty array.

## CORS
Enabled for all origins in dev — call directly from your frontend dev server, no proxy needed.