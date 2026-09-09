import {
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  Fuel,
  ShieldCheck,
  Ship,
  Timer
} from "lucide-react";

import Badge from "../components/Badge";
import SectionTitle from "../components/SectionTitle";

export default function Recommendation() {

  return (

    <div>

      <SectionTitle
        title="AI Recommendation"
        subtitle="Explainable decision support for vessel chartering."
        action={
          <Badge tone="green">
            91 / 100 decision score
          </Badge>
        }
      />


      <div className="decision-hero panel">

        <div className="big-score">

          91

          <span>
            /100
          </span>

        </div>

        <div className="decision-copy">

          <Badge tone="green">
            CHARTER NOW
          </Badge>

          <h1>
            Lock the vessel within 72 hours.
          </h1>

          <p>
            Freight rates are projected to
            rise from <b>$28.4/t</b> to
            <b>$31.7/t</b>. Acting now protects
            an estimated <b>$142,000</b>
            versus waiting 30 days.
          </p>

          <div className="confidence-bar">

            <span
              style={{
                width: "91%"
              }}
            />

          </div>

          <small>
            Decision confidence: High
            • Updated 6 minutes ago
          </small>

        </div>

      </div>


      <div className="grid-3">

        <div className="panel evidence">

          <Fuel />

          <h3>
            Fuel pressure
          </h3>

          <strong>
            +3.8%
          </strong>

          <p>
            Bunker costs are trending
            upward and usually flow into
            voyage rates.
          </p>

          <Badge tone="orange">
            HIGH IMPACT
          </Badge>

        </div>


        <div className="panel evidence">

          <Ship />

          <h3>
            Vessel supply
          </h3>

          <strong>
            24 open
          </strong>

          <p>
            Current Capesize supply is
            favorable, creating a narrow
            charter window.
          </p>

          <Badge tone="green">
            FAVORABLE
          </Badge>

        </div>


        <div className="panel evidence">

          <Timer />

          <h3>
            Port outlook
          </h3>

          <strong>
            2.1 days
          </strong>

          <p>
            Visakhapatnam dwell is below
            the East Coast average.
          </p>

          <Badge tone="cyan">
            STABLE
          </Badge>

        </div>

      </div>


      <section className="panel">

        <SectionTitle
          title="Cost comparison"
          subtitle="Estimated total freight for 50,000 MT"
        />

        <div className="compare">

          <div>

            <span>
              Charter now
            </span>

            <strong>
              $1.42M
            </strong>

            <em>
              <ArrowDownRight size={15} />
              Save $142K
            </em>

          </div>

          <div className="vs">
            VS
          </div>

          <div>

            <span>
              Wait 30 days
            </span>

            <strong>
              $1.56M
            </strong>

            <em className="bad">

              <ArrowUpRight size={15} />

              +9.9%

            </em>

          </div>

        </div>


        <div className="reasons">

          <div>

            <CheckCircle2 />

            Current rate below model fair value

          </div>

          <div>

            <CheckCircle2 />

            Capesize availability is improving

          </div>

          <div>

            <CheckCircle2 />

            Fuel trend supports near-term upward pressure

          </div>

          <div>

            <ShieldCheck />

            Recommendation is explainable and auditable

          </div>

        </div>

      </section>

    </div>

  );
}