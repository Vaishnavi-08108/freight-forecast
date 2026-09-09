import {
  ArrowRight,
  CloudRain,
  Navigation,
  Route as RouteIcon,
  Timer
} from "lucide-react";

import Badge from "../components/Badge";
import SectionTitle from "../components/SectionTitle";

export default function RouteOptimization() {

  return (

    <div>

      <SectionTitle
        title="Route Optimization"
        subtitle="Voyage planning using freight, weather and port signals."
        action={
          <Badge tone="green">
            OPTIMAL ROUTE FOUND
          </Badge>
        }
      />


      <div className="route-layout">

        <section className="panel map-card">

          <div className="fake-map">

            <div className="grid-lines" />

            <div className="ocean-route">

              <div className="route-line" />

              <div className="port-dot origin" />

              <div className="port-dot dest" />

              <span className="route-label a">
                PORT HEDLAND
              </span>

              <span className="route-label b">
                VISAKHAPATNAM
              </span>

              <div className="ship-marker">
                ⛴
              </div>

            </div>


            <div className="map-caption">

              <Navigation size={15} />

              Route visualization
              • Indicative only

            </div>

          </div>

        </section>


        <aside className="panel route-summary">

          <Badge tone="cyan">
            RECOMMENDED
          </Badge>

          <h2>
            Route A
          </h2>

          <p>
            Port Hedland → Visakhapatnam
          </p>


          <div className="route-metric">

            <Timer />

            <span>

              Transit time

              <strong>
                14.8 days
              </strong>

            </span>

          </div>


          <div className="route-metric">

            <CloudRain />

            <span>

              Weather risk

              <strong>
                Low
              </strong>

            </span>

          </div>


          <div className="route-metric">

            <RouteIcon />

            <span>

              Distance

              <strong>
                4,780 nm
              </strong>

            </span>

          </div>


          <button className="primary wide">

            Use this route

            <ArrowRight size={16} />

          </button>

        </aside>

      </div>

    </div>

  );
}