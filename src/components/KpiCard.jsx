export default function KpiCard({
  label,
  value,
  unit,
  change,
  tone = "blue",
  icon: Icon
}) {

  return (

    <div className="kpi-card">

      <div
        className={`kpi-icon ${tone}`}
      >
        {Icon && <Icon size={18} />}
      </div>

      <div className="kpi-label">
        {label}
      </div>

      <div className="kpi-value">

        {value}

        <small>
          {unit}
        </small>

      </div>

      <div
        className={
          change?.startsWith("+")
            ? "positive"
            : "muted"
        }
      >
        {change}
      </div>

    </div>

  );
}