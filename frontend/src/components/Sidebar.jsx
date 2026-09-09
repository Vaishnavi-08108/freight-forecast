import {
  NavLink
} from "react-router-dom";

import {
  LayoutDashboard,
  TrendingUp,
  Sparkles,
  Ship,
  Package,
  Route,
  Anchor,
  BarChart3,
  Bell,
  FileText,
  Settings,
  ChevronRight
} from "lucide-react";

const items = [

  [
    "Dashboard",
    "/",
    LayoutDashboard
  ],

  [
    "Freight Forecast",
    "/forecast",
    TrendingUp
  ],

  [
    "AI Recommendation",
    "/recommendation",
    Sparkles
  ],

  [
    "Vessel Chartering",
    "/vessels",
    Ship
  ],

  [
    "Cargo Procurement",
    "/cargo",
    Package
  ],

  [
    "Route Optimization",
    "/route-optimization",
    Route
  ],

  [
    "Port Intelligence",
    "/ports",
    Anchor
  ],

  [
    "Analytics",
    "/analytics",
    BarChart3
  ],

  [
    "Alerts",
    "/alerts",
    Bell
  ],

  [
    "Reports",
    "/reports",
    FileText
  ],

  [
    "Settings",
    "/settings",
    Settings
  ]

];

export default function Sidebar() {

  return (

    <aside className="sidebar">

      <div className="brand">

        <div className="brand-mark">
          FQ
        </div>

        <div>

          <strong>
            FreightIQ
          </strong>

          <span>
            Decision Intelligence
          </span>

        </div>

      </div>

      <div className="nav-label">
        COMMAND CENTER
      </div>

      <nav>

        {items.map(
          ([label, to, Icon]) => (

            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `nav-item ${
                  isActive
                    ? "active"
                    : ""
                }`
              }
            >

              <Icon size={18} />

              <span>
                {label}
              </span>

              {label === "Alerts" && (
                <b className="nav-badge">
                  3
                </b>
              )}

              <ChevronRight
                size={14}
                className="nav-arrow"
              />

            </NavLink>

          )
        )}

      </nav>

      <div className="sidebar-bottom">

        <div className="system-mini">

          <span className="pulse" />

          Models online

        </div>

        <small>
          v1.0 • SIH Demo Build
        </small>

      </div>

    </aside>

  );
}