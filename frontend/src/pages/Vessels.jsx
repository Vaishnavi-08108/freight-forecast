import {
  useState
} from "react";

import {
  Anchor,
  Check,
  Filter,
  Ship
} from "lucide-react";

import Badge from "../components/Badge";
import SectionTitle from "../components/SectionTitle";
import { getVessels } from "../services/api";
import { useEffect } from "react";

export default function Vessels() {

  const [vessels, setVessels] = useState([]);

  useEffect(() => {
    getVessels().then(setVessels).catch(() => setVessels([]));
  }, []);

  const [
    type,
    setType
  ] = useState("All");

  const rows =
    vessels.filter(
      vessel =>
        type === "All" ||
        vessel.type === type
    );

  return (

    <div>

      <SectionTitle
        title="Vessel Chartering"
        subtitle="Compare available vessels against route, rate and timing."
        action={
          <button className="ghost">
            <Filter size={15} />
            Filter
          </button>
        }
      />


      <div className="filter-row">

        {[
          "All",
          "Capesize",
          "Panamax",
          "Supramax"
        ].map(item => (

          <button
            key={item}
            className={
              type === item
                ? "filter active-filter"
                : "filter"
            }
            onClick={() =>
              setType(item)
            }
          >
            {item}
          </button>

        ))}

      </div>


      <div className="vessel-grid">

        {rows.map(vessel => (

          <div
            className="panel vessel-card"
            key={vessel.name}
          >

            <div className="vessel-head">

              <div className="ship-icon">

                <Ship size={23} />

              </div>

              <Badge
                tone={
                  vessel.score > 90
                    ? "green"
                    : "blue"
                }
              >
                {vessel.type}
              </Badge>

            </div>


            <h3>
              {vessel.name}
            </h3>

            <p>

              <Anchor size={14} />

              East Coast India lane

            </p>


            <div className="vessel-stats">

              <span>

                <small>
                  DWT
                </small>

                <b>
                  {vessel.dwt}
                </b>

              </span>

              <span>

                <small>
                  ETA
                </small>

                <b>
                  {vessel.eta}
                </b>

              </span>

              <span>

                <small>
                  RATE
                </small>

                <b>
                  {vessel.rate}
                </b>

              </span>

            </div>


            <div className="score-line">

              <span>
                AI match
              </span>

              <strong>
                {vessel.score}%
              </strong>

            </div>


            <div className="score-track">

              <i
                style={{
                  width:
                    `${vessel.score}%`
                }}
              />

            </div>


            <button className="primary wide">

              <Check size={15} />

              Shortlist vessel

            </button>

          </div>

        ))}

      </div>

    </div>

  );
}