from freight_engine import get_shipping_decision

result = get_shipping_decision(
    cargo_type="Coal",
    cargo_tonnes=50000,
    destination="Paradip Port",   # must match a PORT value exactly in port_details.csv
    contract_duration_months=3,
)

import json
print(json.dumps(result, indent=2))