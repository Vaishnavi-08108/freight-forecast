const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000"
).replace(/\/$/, "");

export const defaultPredictPayload = {
  cargo_type: "Coal",
  cargo_tonnes: 50000,
  destination: "Paradip Port",
  contract_duration_months: 3
};

export async function getOptions() {
  try {
    const response = await fetch(`${API_BASE_URL}/options`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.detail || `Backend returned ${response.status}`
      );
    }

    return data;
  } catch (error) {
    throw new Error(
      error instanceof TypeError
        ? "Unable to reach the Freight Forecast API. Start the backend on port 8000."
        : error.message
    );
  }
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
    throw new Error(
      error instanceof TypeError
        ? "Unable to reach the Freight Forecast API. Start the backend on port 8000."
        : error.message
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


export async function getVessels() {
  const result = await predictFreight(defaultPredictPayload);

  return (result.vessel?.ranking || []).map((vessel) => ({
    name: vessel.vessel_class,
    type: vessel.vessel_class,
    dwt: Number(vessel.typical_dwt).toLocaleString(),
    eta: "Model estimate",
    rate: "Backend ranked",
    score: vessel.suitability_score
  }));
}

export async function getPorts() {
  const result = await predictFreight(defaultPredictPayload);
  const port = result.port;

  if (!port) {
    return [];
  }

  return [{
    name: port.destination.replace(/ Port$/, ""),
    code: port.destination
      .replace(/ Port$/, "")
      .slice(0, 5)
      .toUpperCase(),
    congestion: null,
    dwell: "Backend supplied",
    status: port.operational_risk
  }];
}

export async function getRecommendations() {
  return null;
}

export async function getAnalytics() {
  return null;
}

export async function getAlerts() {
  const result = await predictFreight(defaultPredictPayload);
  const forecast = result.forecast;

  return [
    {
      title: "BDI forecast",
      text: `${forecast.predicted_change_pct}% expected movement from the model.`,
      time: forecast.date,
      level: forecast.predicted_change >= 0 ? "warning" : "success"
    },
    {
      title: "Port operating risk",
      text: result.port?.warning || "No port warning returned.",
      time: forecast.date,
      level: result.port?.operational_risk === "Low" ? "success" : "danger"
    },
    {
      title: "Charter recommendation",
      text: result.vessel?.recommended || "No suitable vessel returned.",
      time: forecast.date,
      level: result.vessel?.recommended ? "success" : "warning"
    }
  ];
}

export async function getCargoHistory() {
  const result = await predictFreight(defaultPredictPayload);

  return buildForecastSeries(result.forecast).map((point) => ({
    month: point.day,
    rate: point.bdi
  }));
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