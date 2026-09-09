import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Forecast from "./pages/Forecast";
import Vessels from "./pages/Vessels";
import Ports from "./pages/Ports";
import Recommendation from "./pages/Recommendation";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";
import Cargo from "./pages/Cargo";
import Reports from "./pages/Reports";
import RouteOptimization from "./pages/RouteOptimization";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/forecast" element={<Forecast />} />
      <Route path="/vessels" element={<Vessels />} />
      <Route path="/ports" element={<Ports />} />
      <Route path="/recommendation" element={<Recommendation />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/alerts" element={<Alerts />} />
      <Route path="/cargo" element={<Cargo />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/route-optimization" element={<RouteOptimization />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;