import sys
import os

# Add ml/ folder to Python's import path
ML_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "ml")
sys.path.append(ML_DIR)

from freight_engine import (  # noqa: E402
    CARGO_KEYWORDS,
    PORT_DETAILS,
    SUPPORTED_CARGO_TYPES,
    get_shipping_decision,
)


def get_prediction(cargo_type: str, cargo_tonnes: float, destination: str, contract_duration_months: float):
    return get_shipping_decision(
        cargo_type=cargo_type,
        cargo_tonnes=cargo_tonnes,
        destination=destination,
        contract_duration_months=contract_duration_months,
    )


def get_options():
    commodities = " ".join(
        PORT_DETAILS["Commodities Handled"]
        .dropna()
        .astype(str)
        .str.lower()
    )

    cargo_types = [
        cargo_type
        for cargo_type in SUPPORTED_CARGO_TYPES
        if any(
            keyword in commodities
            for keyword in CARGO_KEYWORDS[cargo_type.lower()]
        )
    ]

    return {
        "ports": PORT_DETAILS["PORT"].dropna().tolist(),
        "cargo_types": cargo_types,
    }