import {
  Ship,
  TrendingUp,
  TrendingDown,
  Anchor,
  Package,
  MapPin,
  BarChart3,
  Bell,
  Settings,
  FileText,
  Navigation,
  Activity,
  AlertTriangle,
  ChevronRight,
  CalendarDays,
  RefreshCw
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

const freightData = [
  { month: "Jan", bdi: 1680 },
  { month: "Feb", bdi: 1760 },
  { month: "Mar", bdi: 1820 },
  { month: "Apr", bdi: 1740 },
  { month: "May", bdi: 1910 },
  { month: "Jun", bdi: 2050 },
  { month: "Jul", bdi: 1980 },
  { month: "Aug", bdi: 2161 },
  { month: "Sep", bdi: 2556 }
];

const vessels = [
  {
    name: "Supramax",
    size: "55,000 DWT",
    utilization: "90.9%",
    score: 90.9
  },
  {
    name: "Panamax",
    size: "75,000 DWT",
    utilization: "66.7%",
    score: 66.7
  },
  {
    name: "Capesize",
    size: "150,000 DWT",
    utilization: "33.3%",
    score: 33.3
  }
];

export default function Dashboard() {
  return (
    <div className="dashboard-page">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="brand">
          <div className="brand-icon">
            <Ship size={25} />
          </div>

          <div>
            <h1>FreightIQ</h1>
            <span>INTELLIGENT FREIGHT</span>
          </div>
        </div>

        <div className="nav-section">
          <p className="nav-title">MAIN MENU</p>

          <div className="nav-item active">
            <BarChart3 size={19} />
            <span>Dashboard</span>
          </div>

          <div className="nav-item">
            <TrendingUp size={19} />
            <span>Forecast</span>
          </div>

          <div className="nav-item">
            <Anchor size={19} />
            <span>Vessel Intelligence</span>
          </div>

          <div className="nav-item">
            <Package size={19} />
            <span>Cargo Planning</span>
          </div>

          <div className="nav-item">
            <Navigation size={19} />
            <span>Route Optimization</span>
          </div>

          <div className="nav-item">
            <MapPin size={19} />
            <span>Port Intelligence</span>
          </div>

          <div className="nav-item">
            <Activity size={19} />
            <span>Analytics</span>
          </div>
        </div>

        <div className="nav-section">
          <p className="nav-title">MANAGEMENT</p>

          <div className="nav-item">
            <Bell size={19} />
            <span>Alerts</span>
            <span className="notification">3</span>
          </div>

          <div className="nav-item">
            <FileText size={19} />
            <span>Reports</span>
          </div>

          <div className="nav-item">
            <Settings size={19} />
            <span>Settings</span>
          </div>
        </div>

        <div className="sidebar-bottom">
          <div className="system-status">
            <span className="status-dot"></span>

            <div>
              <strong>AI Engine Online</strong>
              <small>Model updated 2h ago</small>
            </div>
          </div>
        </div>

      </aside>


      {/* MAIN CONTENT */}
      <main className="main-content">

        {/* TOP BAR */}
        <header className="topbar">

          <div>
            <p className="breadcrumb">FREIGHT INTELLIGENCE / OVERVIEW</p>
            <h2>Freight Command Center</h2>
          </div>

          <div className="top-actions">

            <button className="icon-button">
              <Bell size={20} />
              <span className="bell-dot"></span>
            </button>

            <div className="user-profile">
              <div className="avatar">FM</div>

              <div>
                <strong>Freight Manager</strong>
                <span>Operations</span>
              </div>
            </div>

          </div>

        </header>


        {/* HERO */}
        <section className="hero-card">

          <div className="hero-content">

            <div className="live-label">
              <span></span>
              LIVE MARKET INTELLIGENCE
            </div>

            <h3>
              Predict the market.
              <br />
              <strong>Charter smarter.</strong>
            </h3>

            <p>
              AI-powered freight forecasting for smarter vessel chartering
              and bulk cargo procurement.
            </p>

            <div className="hero-buttons">

              <button
                className="run-button"
                onClick={() => {
                  window.location.href = "/forecast";
                }}
              >
                <TrendingUp size={19} />
                Run Forecast
                <ChevronRight size={18} />
              </button>

              <button className="secondary-button">
                <FileText size={18} />
                View Reports
              </button>

            </div>

          </div>

          <div className="hero-visual">

            <div className="radar-circle">
              <div className="radar-inner">
                <Ship size={50} />
              </div>
            </div>

            <div className="floating-card forecast-float">
              <span>AI FORECAST</span>
              <strong>+18.3%</strong>
              <small>Next 30 days</small>
            </div>

            <div className="floating-card market-float">
              <span>BDI INDEX</span>
              <strong>2,161</strong>
              <small>Live market</small>
            </div>

          </div>

        </section>


        {/* KPI CARDS */}
        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-top">
              <div className="stat-icon blue">
                <BarChart3 size={21} />
              </div>

              <span className="positive">
                <TrendingUp size={15} />
                18.3%
              </span>
            </div>

            <p>Current BDI</p>
            <h3>2,161</h3>
            <span className="stat-description">
              Baltic Dry Index
            </span>

          </div>


          <div className="stat-card">

            <div className="stat-top">
              <div className="stat-icon purple">
                <TrendingUp size={21} />
              </div>

              <span className="positive">
                Forecast
              </span>
            </div>

            <p>Predicted BDI</p>
            <h3>2,556</h3>
            <span className="stat-description">
              Expected market rise
            </span>

          </div>


          <div className="stat-card">

            <div className="stat-top">
              <div className="stat-icon orange">
                <Anchor size={21} />
              </div>

              <span className="warning-text">
                High
              </span>
            </div>

            <p>Market Risk</p>
            <h3>High Risk</h3>
            <span className="stat-description">
              Model uncertainty: 478
            </span>

          </div>


          <div className="stat-card">

            <div className="stat-top">
              <div className="stat-icon green">
                <Ship size={21} />
              </div>

              <span className="positive">
                90.9%
              </span>
            </div>

            <p>Best Vessel</p>
            <h3>Supramax</h3>
            <span className="stat-description">
              55,000 DWT capacity
            </span>

          </div>

        </section>


        {/* CHART + MARKET OUTLOOK */}
        <section className="dashboard-grid">

          <div className="panel chart-panel">

            <div className="panel-header">

              <div>
                <p className="panel-label">FREIGHT MARKET</p>
                <h3>BDI Forecast Trend</h3>
              </div>

              <div className="chart-period">
                <button className="selected">9M</button>
                <button>1Y</button>
                <button>5Y</button>
              </div>

            </div>

            <div className="chart-info">
              <div>
                <strong>2,556</strong>
                <span className="chart-up">
                  +18.3%
                </span>
              </div>

              <span>Projected BDI</span>
            </div>

            <div className="chart-container">

              <ResponsiveContainer width="100%" height={300}>

                <AreaChart data={freightData}>

                  <defs>
                    <linearGradient
                      id="freightGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopOpacity={0.35}
                      />

                      <stop
                        offset="100%"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="bdi"
                    strokeWidth={3}
                    fill="url(#freightGradient)"
                  />

                </AreaChart>

              </ResponsiveContainer>

            </div>

          </div>


          {/* MARKET OUTLOOK */}
          <div className="panel outlook-panel">

            <div className="panel-header">

              <div>
                <p className="panel-label">AI ANALYSIS</p>
                <h3>Market Outlook</h3>
              </div>

              <div className="ai-badge">
                AI
              </div>

            </div>

            <div className="outlook-main">

              <div className="outlook-icon">
                <TrendingUp size={30} />
              </div>

              <div>
                <strong>Strong Rise</strong>
                <span>18.3% expected increase</span>
              </div>

            </div>

            <div className="outlook-line">
              <span>Confidence</span>
              <strong>76%</strong>
            </div>

            <div className="confidence-bar">
              <div style={{ width: "76%" }}></div>
            </div>

            <div className="recommendation">

              <div className="recommendation-icon">
                <AlertTriangle size={18} />
              </div>

              <div>
                <strong>Charter Soon</strong>
                <p>
                  High market uncertainty detected.
                  Secure vessel capacity before rates rise.
                </p>
              </div>

            </div>

          </div>

        </section>


        {/* LOWER CARDS */}
        <section className="lower-grid">


          {/* VESSELS */}
          <div className="panel">

            <div className="panel-header">

              <div>
                <p className="panel-label">VESSEL INTELLIGENCE</p>
                <h3>Recommended Vessels</h3>
              </div>

              <button className="view-all">
                View all
                <ChevronRight size={15} />
              </button>

            </div>

            <div className="vessel-list">

              {vessels.map((vessel, index) => (

                <div className="vessel-row" key={vessel.name}>

                  <div className="vessel-icon">
                    <Ship size={21} />
                  </div>

                  <div className="vessel-name">
                    <strong>{vessel.name}</strong>
                    <span>{vessel.size}</span>
                  </div>

                  <div className="vessel-score">

                    <div className="score-bar">
                      <div
                        style={{
                          width: `${vessel.score}%`
                        }}
                      ></div>
                    </div>

                    <span>{vessel.utilization}</span>

                  </div>

                  {index === 0 && (
                    <span className="recommended-badge">
                      BEST
                    </span>
                  )}

                </div>

              ))}

            </div>

          </div>


          {/* CARGO */}
          <div className="panel">

            <div className="panel-header">

              <div>
                <p className="panel-label">ACTIVE CARGO</p>
                <h3>Current Shipment</h3>
              </div>

              <span className="cargo-status">
                ACTIVE
              </span>

            </div>

            <div className="cargo-main">

              <div className="cargo-icon">
                <Package size={28} />
              </div>

              <div>
                <strong>Coal</strong>
                <span>50,000 tonnes</span>
              </div>

            </div>

            <div className="route-display">

              <div className="route-location">

                <span className="route-dot"></span>

                <div>
                  <small>ORIGIN</small>
                  <strong>Australia</strong>
                </div>

              </div>

              <div className="route-line"></div>

              <div className="route-location">

                <span className="route-dot destination"></span>

                <div>
                  <small>DESTINATION</small>
                  <strong>Paradip Port</strong>
                </div>

              </div>

            </div>

            <div className="cargo-footer">

              <div>
                <small>CONTRACT</small>
                <strong>3 Months</strong>
              </div>

              <div>
                <small>VESSEL</small>
                <strong>Supramax</strong>
              </div>

            </div>

          </div>


          {/* PORT INTELLIGENCE */}
          <div className="panel">

            <div className="panel-header">

              <div>
                <p className="panel-label">PORT INTELLIGENCE</p>
                <h3>Paradip Port</h3>
              </div>

              <MapPin size={21} />

            </div>

            <div className="port-risk">

              <div className="risk-heading">
                <span>Operational Risk</span>
                <strong>LOW</strong>
              </div>

              <div className="risk-bar">
                <div></div>
              </div>

            </div>

            <div className="port-info">

              <div>
                <span>Port status</span>
                <strong className="green-text">
                  Operational
                </strong>
              </div>

              <div>
                <span>Monsoon restriction</span>
                <strong>No restriction</strong>
              </div>

              <div>
                <span>Cargo compatibility</span>
                <strong className="green-text">
                  Compatible
                </strong>
              </div>

            </div>

            <div className="port-alert">
              <Activity size={17} />
              Normal port operations detected
            </div>

          </div>

        </section>


        {/* BOTTOM STATUS */}
        <div className="bottom-status">

          <div className="status-left">

            <span className="online-circle"></span>

            <div>
              <strong>FreightIQ AI Monitoring Active</strong>
              <span>
                Continuously analyzing freight markets,
                vessel availability and port conditions
              </span>
            </div>

          </div>

          <div className="last-update">

            <RefreshCw size={15} />

            Last updated just now

          </div>

        </div>

      </main>

    </div>
  );
}