import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock3
} from "lucide-react";

import Badge from "../components/Badge";
import SectionTitle from "../components/SectionTitle";

import {
  alerts
} from "../data/mockData";

export default function Alerts() {

  return (

    <div>

      <SectionTitle
        title="Alerts"
        subtitle="Operational and market events requiring attention."
        action={
          <Badge tone="red">
            3 ACTIVE
          </Badge>
        }
      />


      <div className="alert-list">

        {alerts.map(
          (alert, index) => (

            <div
              className={`panel alert-item ${alert.level}`}
              key={alert.title}
            >

              <div className="alert-icon">

                {alert.level ===
                "success" ? (

                  <CheckCircle2 />

                ) : (

                  <AlertTriangle />

                )}

              </div>


              <div>

                <h3>
                  {alert.title}
                </h3>

                <p>
                  {alert.text}
                </p>

                <span>

                  <Clock3 />

                  {alert.time}

                </span>

              </div>


              <button className="ghost">

                {index === 0
                  ? "Review"
                  : "Dismiss"}

              </button>

            </div>

          )
        )}

      </div>


      <div className="panel notification-settings">

        <Bell />

        <div>

          <h3>
            Alert rules are active
          </h3>

          <p>
            Freight moves, bunker changes,
            port congestion and charter
            windows are monitored continuously.
          </p>

        </div>

      </div>

    </div>

  );
}