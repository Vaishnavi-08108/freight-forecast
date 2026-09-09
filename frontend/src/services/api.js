const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000"
).replace(/\/$/, "");

const wait = (ms = 220) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );

export const portOptions = [
  "Paradip Port",
  "Visakhapatnam Port",
  "Kamarajar Port",
  "Chennai Port",
  "Kolkata Port",
  "Haldia Port"
];

export const cargoOptions = [
  "Coal",
  "Iron Ore",
  "Grain",
  "Limestone"
];

export const defaultPredictPayload = {
  cargo_type: "Coal",
  cargo_tonnes: 50000,
  destination: "Paradip Port",
  contract_duration_months: 3
};


/*
  Demo fallback.

  If the backend is temporarily unavailable,
  the dashboard still works for demonstration.
*/
function mockBackendResponse(payload) {

  const quantity = Number(
    payload.cargo_tonnes || 50000
  );

  const current = 2161;

  let baseRise = 0.12;

  if (payload.cargo_type === "Coal") {
    baseRise = 0.183;
  }

  if (payload.cargo_type === "Iron Ore") {
    baseRise = 0.16;
  }

  const scale = Math.min(
    1.08,
    Math.max(
      0.92,
      0.98 + quantity / 2500000
    )
  );

  const predicted = +(
    current *
    (1 + baseRise) *
    scale
  ).toFixed(2);

  const change = +(
    predicted - current
  ).toFixed(2);

  return {

    status: "SUCCESS",

    forecast: {

      date:
        new Date()
          .toISOString()
          .slice(0, 10),

      current_bdi: current,

      predicted_bdi: predicted,

      predicted_change: change,

      predicted_change_pct: +(
        (change / current) *
        100
      ).toFixed(1),

      market_condition:
        change > 0
          ? "Strong Rise"
          : "Softening",

      model_uncertainty: 478.02,

      risk_level:
        change > 0.15 * current
          ? "High Risk"
          : "Moderate Risk",

      charter_action:
        change > 0.15 * current
          ? "CHARTER SOON — HIGH UNCERTAINTY"
          : "MONITOR MARKET"
    },

    cargo: {
      type: payload.cargo_type,
      quantity_tonnes: quantity
    },

    contract: {

      duration_months:
        Number(
          payload.contract_duration_months || 3
        ),

      contract_type:
        "Short-Term Multiple-Voyage",

      strategy:
        "Secure capacity soon, but avoid overcommitting to a long-term contract."
    },

    port: {

      destination:
        payload.destination,

      operational_risk:
        "Low",

      warning:
        "No monsoon restriction reported"
    },

    vessel: {

      status: "SUCCESS",

      message: null,

      recommended: "Supramax",

      capacity_utilization: 90.91,

      ranking: [

        {
          vessel_class: "Supramax",
          typical_dwt: 55000,
          draft: 11,
          loa: 200,
          beam: 32,
          capacity_utilization_pct: 90.91,
          suitability_score: 90.91
        },

        {
          vessel_class: "Panamax",
          typical_dwt: 75000,
          draft: 13.5,
          loa: 225,
          beam: 32,
          capacity_utilization_pct: 66.67,
          suitability_score: 66.67
        },

        {
          vessel_class: "Capesize",
          typical_dwt: 150000,
          draft: 17,
          loa: 290,
          beam: 45,
          capacity_utilization_pct: 33.33,
          suitability_score: 33.33
        }

      ]

    }

  };
}


/*
  Real backend request.
*/
export async function predictFreight(
  payload = defaultPredictPayload
) {

  try {

    const response = await fetch(
      `${API_BASE_URL}/predict`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body:
          JSON.stringify(payload)
      }
    );

    const data =
      await response.json();

    if (!response.ok) {

      throw new Error(
        data?.detail ||
        `Backend returned ${response.status}`
      );

    }

    return data;

  } catch (error) {

    console.warn(
      "Backend unavailable. Using demo response:",
      error.message
    );

    await wait();

    return mockBackendResponse(
      payload
    );
  }
}


/*
  Dashboard data.
*/
export async function getDashboardData() {

  const result =
    await predictFreight(
      defaultPredictPayload
    );

  const forecast =
    result.forecast;

  return {

    result,

    kpis: {

      currentBDI:
        forecast.current_bdi,

      predictedBDI:
        forecast.predicted_bdi,

      changePct:
        forecast.predicted_change_pct,

      uncertainty:
        forecast.model_uncertainty

    }

  };
}


/*
  Forecast page.
*/
export async function getForecast(
  payload
) {
  return predictFreight(payload);
}


/*
  Other pages currently use
  presentation/demo data.
*/
export async function getVessels() {
  return [];
}

export async function getPorts() {
  return [];
}

export async function getRecommendations() {
  return null;
}

export async function getAnalytics() {
  return null;
}

export async function getAlerts() {
  return [];
}


/*
  Build chart values from
  backend forecast.
*/
export function buildForecastSeries(
  forecast
) {

  const current =
    Number(
      forecast.current_bdi || 0
    );

  const predicted =
    Number(
      forecast.predicted_bdi ||
      current
    );

  const change =
    predicted - current;

  const points = [

    ["Today", current],

    [
      "D+7",
      current + change * 0.18
    ],

    [
      "D+15",
      current + change * 0.42
    ],

    [
      "D+30",
      current + change * 0.68
    ],

    [
      "D+45",
      current + change * 0.84
    ],

    [
      "D+60",
      predicted
    ]

  ];

  return points.map(
    ([day, bdi]) => ({
      day,
      bdi: +bdi.toFixed(2)
    })
  );
}