import {
  Package,
  ShoppingCart,
  TrendingDown,
  TrendingUp
} from "lucide-react";

import Badge from "../components/Badge";
import SectionTitle from "../components/SectionTitle";

import {
  TrendChart
} from "../components/FreightChart";

import {
  historyData
} from "../data/mockData";

export default function Cargo() {

  return (

    <div>

      <SectionTitle
        title="Bulk Cargo Procurement"
        subtitle="Monitor commodity exposure and coordinate procurement timing."
        action={
          <Badge tone="cyan">
            IRON ORE
          </Badge>
        }
      />


      <div className="grid-3">

        <div className="panel procurement">

          <Package />

          <span>
            Benchmark price
          </span>

          <strong>
            $103.80/t
          </strong>

          <em>

            <TrendingUp />

            +2.4%

          </em>

        </div>


        <div className="panel procurement">

          <ShoppingCart />

          <span>
            Recommended buy
          </span>

          <strong>
            40,000 MT
          </strong>

          <em className="green-text">
            Within 14 days
          </em>

        </div>


        <div className="panel procurement">

          <TrendingDown />

          <span>
            Risk-adjusted target
          </span>

          <strong>
            $99.40/t
          </strong>

          <em>
            Downside protected
          </em>

        </div>

      </div>


      <div className="grid-2">

        <section className="panel">

          <SectionTitle
            title="Commodity price trend"
            subtitle="Indicative benchmark history"
          />

          <TrendChart
            data={historyData}
          />

        </section>


        <section className="panel">

          <SectionTitle
            title="Procurement signal"
          />

          <div className="procure-signal">

            <Badge tone="green">
              ACCUMULATE
            </Badge>

            <h2>
              Buy in tranches
            </h2>

            <p>
              Current benchmark is above
              the preferred entry level,
              but freight is expected to
              rise. Stagger procurement
              to balance commodity and
              logistics risk.
            </p>


            <div className="tranche">

              <span>
                Now
              </span>

              <b>
                30%
              </b>

            </div>


            <div className="tranche">

              <span>
                7–14 days
              </span>

              <b>
                40%
              </b>

            </div>


            <div className="tranche">

              <span>
                Optional
              </span>

              <b>
                30%
              </b>

            </div>

          </div>

        </section>

      </div>

    </div>

  );
}