import {
  BellRing,
  Database,
  Moon,
  ShieldCheck,
  SlidersHorizontal
} from "lucide-react";

import Badge from "../components/Badge";
import SectionTitle from "../components/SectionTitle";

export default function Settings() {

  return (

    <div>

      <SectionTitle
        title="Settings"
        subtitle="Configure the FreightIQ demonstration environment."
      />


      <div className="settings-grid">

        <div className="panel setting-card">

          <SlidersHorizontal />

          <h3>
            Forecast defaults
          </h3>

          <label>

            Default vessel

            <select>

              <option>
                Capesize
              </option>

              <option>
                Panamax
              </option>

              <option>
                Supramax
              </option>

            </select>

          </label>


          <label>

            Default horizon

            <select>

              <option>
                30 days
              </option>

              <option>
                60 days
              </option>

            </select>

          </label>

        </div>


        <div className="panel setting-card">

          <BellRing />

          <h3>
            Notifications
          </h3>

          <div className="toggle-row">

            <span>
              Market alerts
            </span>

            <input
              type="checkbox"
              defaultChecked
            />

          </div>


          <div className="toggle-row">

            <span>
              Port alerts
            </span>

            <input
              type="checkbox"
              defaultChecked
            />

          </div>

        </div>


        <div className="panel setting-card">

          <ShieldCheck />

          <h3>
            Security
          </h3>

          <p>
            Frontend demo mode is enabled.
            Backend authentication can be
            connected through the API service
            layer.
          </p>

          <Badge tone="green">
            SECURE CONFIG
          </Badge>

        </div>


        <div className="panel setting-card">

          <Database />

          <h3>
            Data source
          </h3>

          <p>
            Forecast values are retrieved
            from the FastAPI prediction
            endpoint when the backend is
            available.
          </p>

        </div>


        <div className="panel setting-card">

          <Moon />

          <h3>
            Presentation mode
          </h3>

          <p>
            Dark command-center UI is
            optimized for projector and
            laptop demonstrations.
          </p>

        </div>

      </div>

    </div>

  );
}