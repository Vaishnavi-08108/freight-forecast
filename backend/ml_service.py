import sys
import os

# Add ml/ folder to Python's import path
ML_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "ml")
sys.path.append(ML_DIR)

from freight_engine import get_shipping_decision  # noqa: E402


def get_prediction(cargo_type: str, cargo_tonnes: float, destination: str, contract_duration_months: float):
    return get_shipping_decision(
        cargo_type=cargo_type,
        cargo_tonnes=cargo_tonnes,
        destination=destination,
        contract_duration_months=contract_duration_months,
    )