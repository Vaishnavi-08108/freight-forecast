import os
import joblib
import numpy as np
import pandas as pd

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "freight_forecasting_model.joblib")
FEATURE_DATA_PATH = os.path.join(BASE_DIR, "feature_data.csv")
PORT_DATA_PATH = os.path.join(BASE_DIR, "port_details.csv")

# Load trained model package
package = joblib.load(MODEL_PATH)
MODEL = package["model"]
FEATURES = package["features"]

# Load deployment data
FEATURE_DATA = pd.read_csv(FEATURE_DATA_PATH, parse_dates=["Date"])
PORT_DETAILS = pd.read_csv(PORT_DATA_PATH)

# Prototype vessel engineering assumptions.
# These are NOT values from the Excel dataset.
VESSELS = pd.DataFrame([
    {"Vessel Class": "Handysize", "Typical DWT": 30000, "Draft": 9.0, "LOA": 190, "Beam": 30},
    {"Vessel Class": "Supramax", "Typical DWT": 55000, "Draft": 11.0, "LOA": 200, "Beam": 32},
    {"Vessel Class": "Panamax", "Typical DWT": 75000, "Draft": 13.5, "LOA": 225, "Beam": 32},
    {"Vessel Class": "Capesize", "Typical DWT": 150000, "Draft": 17.0, "LOA": 290, "Beam": 45},
])

# These thresholds are based on the historical uncertainty distribution
# used in the notebook. They are calculated when the engine starts.
_valid_rows = FEATURE_DATA.dropna(subset=FEATURES).copy()
_X_hist = _valid_rows[FEATURES]
_TREE_PREDICTIONS = np.array([
    tree.predict(_X_hist) for tree in MODEL.estimators_
])
_HIST_UNCERTAINTIES = np.std(_TREE_PREDICTIONS, axis=0)
UNCERTAINTY_MEDIAN = float(np.median(_HIST_UNCERTAINTIES))
UNCERTAINTY_HIGH = float(np.percentile(_HIST_UNCERTAINTIES, 75))


def get_market_condition(change_pct):
    if pd.isna(change_pct):
        return "Unknown"
    if change_pct <= -10:
        return "Strong Fall"
    elif change_pct <= -3:
        return "Moderate Fall"
    elif change_pct < 3:
        return "Stable"
    elif change_pct < 10:
        return "Moderate Rise"
    return "Strong Rise"


def uncertainty_risk(prediction_std):
    if pd.isna(prediction_std):
        return "Unknown"
    if prediction_std <= UNCERTAINTY_MEDIAN:
        return "Low Risk"
    elif prediction_std <= UNCERTAINTY_HIGH:
        return "Medium Risk"
    return "High Risk"


def get_charter_recommendation(change_pct, risk):
    if pd.isna(change_pct):
        return "INSUFFICIENT DATA"

    market = get_market_condition(change_pct)

    if market == "Strong Rise":
        if risk == "High Risk":
            return "CHARTER SOON — HIGH UNCERTAINTY"
        return "CHARTER NOW"
    elif market == "Moderate Rise":
        return "CHARTER SOON"
    elif market == "Stable":
        return "MONITOR / NEGOTIATE"
    elif market in ["Moderate Fall", "Strong Fall"]:
        return "WAIT"
    return "MONITOR"


def get_port_risk(port_name):
    port = PORT_DETAILS[PORT_DETAILS["PORT"] == port_name]
    if port.empty:
        return {"risk": "Unknown", "warning": "Port not found"}

    restriction = str(port.iloc[0]["Monsoon Restriction"]).strip()

    if restriction.lower() == "operates year-round":
        return {"risk": "Low", "warning": "No monsoon restriction reported"}
    elif restriction.lower() == "not specified in source":
        return {
            "risk": "Unknown",
            "warning": "Monsoon restriction information unavailable"
        }
    return {"risk": "Medium", "warning": restriction}


def check_cargo_compatibility(port_name, cargo_type):
    port = PORT_DETAILS[PORT_DETAILS["PORT"] == port_name]
    if port.empty:
        return {"compatible": False, "reason": "Port not found"}

    commodities = str(port.iloc[0]["Commodities Handled"]).lower()
    cargo = str(cargo_type).lower().strip()

    cargo_keywords = {
        "coal": ["coal"],
        "iron ore": ["iron ore", "ore"],
        "limestone": ["limestone"],
        "fertilizer": ["fertilizer"],
        "grain": ["grain", "food grain"],
        "steel": ["steel"],
        "cement": ["cement"],
        "petroleum coke": ["petroleum coke", "petcoke"],
        "bauxite": ["bauxite"],
    }

    keywords = cargo_keywords.get(cargo, [cargo])
    compatible = any(k in commodities for k in keywords)

    return {
        "compatible": compatible,
        "commodities_at_port": commodities,
        "cargo": cargo_type,
        "reason": (
            "Cargo handled by port"
            if compatible else
            "Cargo not found in port commodities"
        ),
    }


def check_vessel_compatibility(port_name, vessel_class):
    port = PORT_DETAILS[PORT_DETAILS["PORT"] == port_name]
    vessel = VESSELS[VESSELS["Vessel Class"] == vessel_class]

    if port.empty:
        return {"compatible": False, "reason": "Port not found"}
    if vessel.empty:
        return {"compatible": False, "reason": "Vessel class not found"}

    port = port.iloc[0]
    vessel = vessel.iloc[0]

    draft_ok = vessel["Draft"] <= float(port["Max Draft Numeric"])
    loa_ok = vessel["LOA"] <= float(port["Max LOA Numeric"])
    beam_ok = vessel["Beam"] <= float(port["Max Beam Numeric"])
    dwt_ok = vessel["Typical DWT"] <= float(port["Max DWT Numeric"])

    return {
        "compatible": bool(draft_ok and loa_ok and beam_ok and dwt_ok),
        "draft_ok": bool(draft_ok),
        "loa_ok": bool(loa_ok),
        "beam_ok": bool(beam_ok),
        "dwt_ok": bool(dwt_ok),
    }


def rank_vessels_for_port(port_name, cargo_tonnes):
    results = []

    for _, vessel in VESSELS.iterrows():
        compatibility = check_vessel_compatibility(
            port_name, vessel["Vessel Class"]
        )

        if not compatibility["compatible"]:
            continue

        capacity = float(vessel["Typical DWT"])
        if float(cargo_tonnes) > capacity:
            continue

        utilization = (float(cargo_tonnes) / capacity) * 100

        results.append({
            "vessel_class": vessel["Vessel Class"],
            "typical_dwt": capacity,
            "draft": float(vessel["Draft"]),
            "loa": float(vessel["LOA"]),
            "beam": float(vessel["Beam"]),
            "capacity_utilization_pct": round(utilization, 2),
            "suitability_score": round(utilization, 2),
        })

    return sorted(
        results,
        key=lambda x: x["suitability_score"],
        reverse=True
    )


def get_contract_strategy(contract_duration_months, market_condition, risk_level):
    months = float(contract_duration_months)

    if months <= 1:
        contract_type = "Spot / Very Short-Term"
    elif months <= 3:
        contract_type = "Short-Term Multiple-Voyage"
    elif months <= 6:
        contract_type = "Medium-Term"
    else:
        contract_type = "Longer-Term"

    if market_condition == "Strong Rise":
        if risk_level == "High Risk":
            strategy = (
                "Secure capacity soon, but avoid "
                "overcommitting to a long-term contract."
            )
        else:
            strategy = (
                "Consider securing capacity before "
                "freight conditions strengthen further."
            )
    elif market_condition == "Moderate Rise":
        strategy = (
            "Prefer short-term or multiple-voyage "
            "contracts and monitor market movement."
        )
    elif market_condition == "Stable":
        strategy = (
            "Negotiate contract terms aggressively "
            "and compare spot versus short-term rates."
        )
    elif market_condition in ["Moderate Fall", "Strong Fall"]:
        strategy = (
            "Avoid locking in expensive long-term "
            "freight commitments; monitor for better entry."
        )
    else:
        strategy = "Insufficient information for contract strategy."

    return {
        "contract_type": contract_type,
        "strategy": strategy,
    }


def get_shipping_decision(
    cargo_type,
    cargo_tonnes,
    destination,
    contract_duration_months,
):
    rows = FEATURE_DATA.dropna(subset=FEATURES).sort_values("Date")

    if rows.empty:
        return {"status": "ERROR", "message": "No valid feature row available"}

    latest = rows.iloc[-1]
    X_latest = pd.DataFrame(
        [latest[FEATURES].values],
        columns=FEATURES
    )

    # Use vectorized RF prediction for the point forecast.
    tree_predictions = np.array([
        tree.predict(X_latest)[0] for tree in MODEL.estimators_
    ])

    predicted_change = float(tree_predictions.mean())
    prediction_std = float(tree_predictions.std())

    current_bdi = float(latest["BDI"])
    predicted_bdi = current_bdi + predicted_change
    predicted_change_pct = (predicted_change / current_bdi) * 100

    market_condition = get_market_condition(predicted_change_pct)
    risk_level = uncertainty_risk(prediction_std)
    charter_action = get_charter_recommendation(
        predicted_change_pct, risk_level
    )

    cargo_result = check_cargo_compatibility(
        destination, cargo_type
    )

    forecast = {
        "date": str(latest["Date"].date()),
        "current_bdi": round(current_bdi, 2),
        "predicted_bdi": round(predicted_bdi, 2),
        "predicted_change": round(predicted_change, 2),
        "predicted_change_pct": round(predicted_change_pct, 2),
        "market_condition": market_condition,
        "model_uncertainty": round(prediction_std, 2),
        "risk_level": risk_level,
        "charter_action": charter_action,
    }

    if not cargo_result["compatible"]:
        return {
            "status": "PORT-CARGO MISMATCH",
            "forecast": forecast,
            "port_warning": cargo_result["reason"],
        }

    ranking = rank_vessels_for_port(destination, cargo_tonnes)

    vessel_status = "SUCCESS" if ranking else "NO SUITABLE VESSEL"
    vessel_message = (
        None if ranking else
        "No standard vessel class satisfies the current port and cargo constraints."
    )

    port_risk = get_port_risk(destination)
    contract = get_contract_strategy(
        contract_duration_months,
        market_condition,
        risk_level,
    )

    return {
        "status": "SUCCESS",
        "forecast": forecast,
        "cargo": {
            "type": cargo_type,
            "quantity_tonnes": float(cargo_tonnes),
        },
        "contract": {
            "duration_months": float(contract_duration_months),
            **contract,
        },
        "port": {
            "destination": destination,
            "operational_risk": port_risk["risk"],
            "warning": port_risk["warning"],
        },
        "vessel": {
            "status": vessel_status,
            "message": vessel_message,
            "recommended": ranking[0]["vessel_class"] if ranking else None,
            "capacity_utilization": (
                ranking[0]["capacity_utilization_pct"] if ranking else None
            ),
            "ranking": ranking,
        },
    }
