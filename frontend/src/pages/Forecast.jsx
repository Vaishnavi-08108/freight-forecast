import {
  useMemo,
  useState
} from "react";

import {
  AlertTriangle,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Gauge,
  RotateCcw,
  Ship,
  Sparkles
} from "lucide-react";

import SectionTitle from "../components/SectionTitle";
import Badge from "../components/Badge";
import { FreightChart } from "../components/FreightChart";

import {
  buildForecastSeries,
  cargoOptions,
  defaultPredictPayload,
  getForecast,
  portOptions
} from "../services/api";

const initial = {
  ...defaultPredictPayload
};

export default function Forecast() {

  const [form, setForm] =
    useState(initial);

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const series =
    useMemo(
      () =>
        result
          ? buildForecastSeries(
              result.forecast
            )
          : [],
      [result]
    );

  const forecast =
    result?.forecast;

  const vessel =
    result?.vessel;


  function update(event) {

    const {
      name,
      value
    } = event.target;

    setForm(
      old => ({
        ...old,
        [name]: value
      })
    );

  }


  async function generate(event) {

    event.preventDefault();

    setLoading(true);
    setError("");

    try {

      const data =
        await getForecast({

          ...form,

          cargo_tonnes:
            Number(
              form.cargo_tonnes
            ),

          contract_duration_months:
            Number(
              form.contract_duration_months
            )

        });

      setResult(data);

    } catch (err) {

      setError(
        err.message
      );

    } finally {

      setLoading(false);

    }

  }


  function reset() {

    setForm(initial);
    setResult(null);
    setError("");

  }


  return (

    <div>

      <SectionTitle
        title="Intelligent Freight Forecast"
        subtitle="Connect your commercial scenario directly to the FastAPI prediction engine."
        action={
          <Badge tone="cyan">
            <BrainCircuit size={14} />
            LIVE API • /predict
          </Badge>
        }
      />


      <div className="forecast-layout">

        <form
          className="panel form-panel"
          onSubmit={generate}
        >

          <div className="form-heading">

            <Sparkles size={18} />

            <div>

              <h3>
                Voyage Scenario
              </h3>

              <p>
                Inputs match the backend
                contract exactly.
              </p>

            </div>

          </div>


          <label>

            Cargo type

            <select
              name="cargo_type"
              value={
                form.cargo_type
              }
              onChange={update}
            >

              {cargoOptions.map(
                cargo => (
                  <option
                    key={cargo}
                    value={cargo}
                  >
                    {cargo}
                  </option>
                )
              )}

            </select>

          </label>


          <label>

            Destination port

            <select
              name="destination"
              value={
                form.destination
              }
              onChange={update}
            >

              {portOptions.map(
                port => (
                  <option
                    key={port}
                    value={port}
                  >
                    {port}
                  </option>
                )
              )}

            </select>

          </label>


          <label>

            Cargo quantity (tonnes)

            <input
              name="cargo_tonnes"
              type="number"
              min="1000"
              step="1000"
              value={
                form.cargo_tonnes
              }
              onChange={update}
            />

          </label>


          <label>

            Contract duration

            <select
              name="contract_duration_months"
              value={
                form.contract_duration_months
              }
              onChange={update}
            >

              <option value="1">
                1 month
              </option>

              <option value="3">
                3 months
              </option>

              <option value="6">
                6 months
              </option>

              <option value="12">
                12 months
              </option>

            </select>

          </label>


          <div className="api-note">

            <CheckCircle2 size={15} />

            <span>
              Backend CORS enabled.
              No Vite proxy required.
            </span>

          </div>


          <button
            className="primary wide"
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Running model…"
              : "Run AI Forecast"}

            {!loading && (
              <ArrowRight size={16} />
            )}

          </button>


          <button
            className="ghost wide"
            type="button"
            onClick={reset}
          >

            <RotateCcw size={15} />

            Reset

          </button>

        </form>


        <div>

          {error && (

            <div className="error-banner">

              <AlertTriangle size={17} />

              {error}

            </div>

          )}


          {!result && (

            <div className="panel empty-state">

              <BrainCircuit
                size={36}
              />

              <h2>
                Ready for prediction
              </h2>

              <p>
                Enter the cargo and
                destination, then run
                the model to receive
                BDI forecast, market
                risk, charter action
                and vessel ranking.
              </p>

            </div>

          )}


          {result && (

            <>

              {result.status ===
                "PORT-CARGO MISMATCH" && (

                <div className="warning-banner">

                  <AlertTriangle />

                  <div>

                    <strong>
                      Port–cargo mismatch
                    </strong>

                    <p>
                      {result.port_warning ||
                        "This destination does not handle the selected cargo."}
                    </p>

                  </div>

                </div>

              )}


              <div className="result-grid">

                <div className="result-card">

                  <span>
                    Current BDI
                  </span>

                  <strong>
                    {Number(
                      forecast.current_bdi
                    ).toLocaleString()}
                  </strong>

                  <em>
                    Current benchmark
                  </em>

                </div>


                <div className="result-card purple">

                  <span>
                    Predicted BDI
                  </span>

                  <strong>
                    {Number(
                      forecast.predicted_bdi
                    ).toLocaleString()}
                  </strong>

                  <em>
                    {forecast.market_condition}
                  </em>

                </div>


                <div className="result-card green">

                  <span>
                    Expected movement
                  </span>

                  <strong>
                    {forecast.predicted_change_pct}%
                  </strong>

                  <em>
                    {forecast.predicted_change >= 0
                      ? "Upside pressure"
                      : "Downside pressure"}
                  </em>

                </div>

              </div>


              <section className="panel chart-panel">

                <SectionTitle
                  title="BDI forecast curve"
                  subtitle={`${forecast.date} • Current vs model projection`}
                  action={
                    <Badge
                      tone={
                        forecast.risk_level ===
                        "High Risk"
                          ? "red"
                          : "orange"
                      }
                    >
                      {forecast.risk_level}
                    </Badge>
                  }
                />

                <FreightChart
                  data={series}
                />

              </section>


              <div className="forecast-summary-grid">

                <div className="panel action-card">

                  <div className="action-icon">

                    <Gauge />

                  </div>

                  <div>

                    <span>
                      Charter action
                    </span>

                    <h2>
                      {forecast.charter_action}
                    </h2>

                    <p>
                      Model uncertainty:
                      {" "}
                      <b>
                        {Number(
                          forecast.model_uncertainty
                        ).toFixed(2)}
                      </b>
                      {" "}BDI points.
                    </p>

                  </div>

                </div>


                <div className="panel port-result">

                  <span>
                    Destination
                  </span>

                  <strong>
                    {result.port?.destination}
                  </strong>

                  <div>

                    <Badge tone="green">
                      {result.port
                        ?.operational_risk ||
                        "—"}
                    </Badge>

                    <small>
                      {result.port
                        ?.warning}
                    </small>

                  </div>

                </div>

              </div>


              {result.contract && (

                <div className="panel">

                  <SectionTitle
                    title="Contract strategy"
                    subtitle="Recommendation returned by the backend."
                  />

                  <div className="strategy">

                    <div>

                      <span>
                        Type
                      </span>

                      <strong>
                        {
                          result.contract
                            .contract_type
                        }
                      </strong>

                    </div>


                    <div>

                      <span>
                        Duration
                      </span>

                      <strong>
                        {
                          result.contract
                            .duration_months
                        } months
                      </strong>

                    </div>


                    <div className="strategy-wide">

                      <span>
                        Strategy
                      </span>

                      <strong>
                        {
                          result.contract
                            .strategy
                        }
                      </strong>

                    </div>

                  </div>

                </div>

              )}


              {vessel && (

                <section className="panel vessel-result">

                  <SectionTitle
                    title="Vessel suitability"
                    subtitle="Ranking supplied by the prediction service."
                    action={
                      <Badge
                        tone={
                          vessel.status ===
                          "SUCCESS"
                            ? "green"
                            : "orange"
                        }
                      >
                        {vessel.status}
                      </Badge>
                    }
                  />


                  {vessel.status ===
                    "NO SUITABLE VESSEL" ||
                  !vessel.ranking?.length ? (

                    <div className="no-vessel">

                      <Ship size={28} />

                      <div>

                        <strong>
                          No vessel recommendation available
                        </strong>

                        <p>
                          {vessel.message ||
                            "No standard vessel class satisfies the current constraints."}
                        </p>

                      </div>

                    </div>

                  ) : (

                    <>

                      <div className="recommended-vessel">

                        <div>

                          <span>
                            Recommended vessel
                          </span>

                          <strong>
                            {vessel.recommended}
                          </strong>

                        </div>

                        <div>

                          <span>
                            Capacity utilization
                          </span>

                          <strong>
                            {vessel.capacity_utilization}%
                          </strong>

                        </div>

                      </div>


                      <div className="table-wrap">

                        <table>

                          <thead>

                            <tr>

                              <th>
                                Class
                              </th>

                              <th>
                                Typical DWT
                              </th>

                              <th>
                                Draft
                              </th>

                              <th>
                                LOA
                              </th>

                              <th>
                                Utilization
                              </th>

                              <th>
                                Suitability
                              </th>

                            </tr>

                          </thead>


                          <tbody>

                            {vessel.ranking.map(
                              item => (

                                <tr
                                  key={
                                    item.vessel_class
                                  }
                                >

                                  <td>
                                    <b>
                                      {
                                        item.vessel_class
                                      }
                                    </b>
                                  </td>

                                  <td>
                                    {Number(
                                      item.typical_dwt
                                    ).toLocaleString()}
                                  </td>

                                  <td>
                                    {item.draft} m
                                  </td>

                                  <td>
                                    {item.loa} m
                                  </td>

                                  <td>
                                    {
                                      item.capacity_utilization_pct
                                    }%
                                  </td>

                                  <td>

                                    <span className="score-pill">
                                      {
                                        item.suitability_score
                                      }%
                                    </span>

                                  </td>

                                </tr>

                              )
                            )}

                          </tbody>

                        </table>

                      </div>

                    </>

                  )}

                </section>

              )}

            </>

          )}

        </div>

      </div>

    </div>

  );
}