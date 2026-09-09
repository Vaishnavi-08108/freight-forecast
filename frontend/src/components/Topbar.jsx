import {
  Bell,
  Search,
  Wifi
} from "lucide-react";

import {
  useLocation
} from "react-router-dom";

export default function Topbar() {

  const location =
    useLocation();

  const names = {

    "/":
      "Overview",

    "/forecast":
      "Freight Forecast",

    "/recommendation":
      "AI Recommendation",

    "/vessels":
      "Vessel Chartering",

    "/cargo":
      "Cargo Procurement",

    "/route":
      "Route Optimization",

    "/ports":
      "Port Intelligence",

    "/analytics":
      "Analytics",

    "/alerts":
      "Alerts",

    "/reports":
      "Reports",

    "/settings":
      "Settings"

  };

  return (

    <header className="topbar">

      <div>

        <span className="crumb">
          FreightIQ /
        </span>

        <strong>
          {names[
            location.pathname
          ] || "Overview"}
        </strong>

      </div>

      <div className="top-actions">

        <div className="search">

          <Search size={16} />

          <input
            placeholder="Search routes, vessels..."
          />

        </div>

        <div className="live">

          <Wifi size={15} />

          Live

        </div>

        <button
          className="icon-btn"
          aria-label="Notifications"
        >

          <Bell size={18} />

          <span>
            3
          </span>

        </button>

        <div className="avatar">
          VR
        </div>

      </div>

    </header>

  );
}