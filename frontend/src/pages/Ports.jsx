import {
  Activity,
  Anchor,
  Clock3
} from "lucide-react";

import Badge from "../components/Badge";
import SectionTitle from "../components/SectionTitle";
import { getPorts } from "../services/api";
import { useEffect, useState } from "react";

export default function Ports() {

  const [ports, setPorts] = useState([]);

  useEffect(() => {
    getPorts().then(setPorts).catch(() => setPorts([]));
  }, []);

  return (

    <div>

      <SectionTitle
        title="Port Intelligence"
        subtitle="East Coast India operational conditions."
        action={
          <Badge tone="cyan">
            LIVE SIGNALS
          </Badge>
        }
      />


      <div className="port-grid">

        {ports.map(port => (

          <div
            className="panel port-card"
            key={port.code}
          >

            <div className="port-title">

              <div>

                <span>
                  {port.code}
                </span>

                <h3>
                  {port.name}
                </h3>

              </div>

              <Badge
                tone={
                  port.status === "Healthy"
                    ? "green"
                    : port.status === "Watch"
                    ? "orange"
                    : "red"
                }
              >
                {port.status}
              </Badge>

            </div>


            <div className="port-stat">

              <span>

                <Activity />

                Congestion

              </span>

              <strong>
                {port.congestion}%
              </strong>

            </div>


            <div className="bar">

              <i
                style={{
                  width:
                    `${port.congestion}%`
                }}
              />

            </div>


            <div className="port-bottom">

              <span>

                <Clock3 />

                Dwell

                <b>
                  {port.dwell}
                </b>

              </span>

              <span>

                <Anchor />

                Berth

                <b>
                  Available
                </b>

              </span>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}