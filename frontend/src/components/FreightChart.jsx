import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line
} from "recharts";

const formatNumber = (
  value
) =>
  Math.round(value)
    .toLocaleString();

export function FreightChart({
  data = [],
  compact = false
}) {

  const key =
    data[0]?.bdi !== undefined
      ? "bdi"
      : data[0]?.value !== undefined
      ? "value"
      : "rate";

  const xKey =
    data[0]?.day
      ? "day"
      : "month";

  return (

    <ResponsiveContainer
      width="100%"
      height={
        compact
          ? 220
          : 340
      }
    >

      <AreaChart
        data={data}
        margin={{
          top: 12,
          right: 12,
          left: -8,
          bottom: 0
        }}
      >

        <defs>

          <linearGradient
            id="fillFreight"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >

            <stop
              offset="0%"
              stopColor="#22d3ee"
              stopOpacity={0.35}
            />

            <stop
              offset="100%"
              stopColor="#22d3ee"
              stopOpacity={0.02}
            />

          </linearGradient>

        </defs>

        <CartesianGrid
          stroke="#223047"
          strokeDasharray="3 3"
        />

        <XAxis
          dataKey={xKey}
          stroke="#718096"
          tickLine={false}
          axisLine={false}
        />

        <YAxis
          stroke="#718096"
          tickLine={false}
          axisLine={false}
          tickFormatter={
            formatNumber
          }
        />

        <Tooltip
          formatter={(value) => [
            Number(value)
              .toLocaleString(),
            "BDI"
          ]}
          contentStyle={{
            background:
              "#0d1728",
            border:
              "1px solid #253652",
            borderRadius:
              10,
            color:
              "#fff"
          }}
        />

        <Area
          type="monotone"
          dataKey={key}
          stroke="#22d3ee"
          strokeWidth={2.5}
          fill="url(#fillFreight)"
        />

      </AreaChart>

    </ResponsiveContainer>

  );
}


export function TrendChart({
  data = []
}) {

  return (

    <ResponsiveContainer
      width="100%"
      height={250}
    >

      <LineChart
        data={data}
      >

        <CartesianGrid
          stroke="#223047"
          strokeDasharray="3 3"
        />

        <XAxis
          dataKey="month"
          stroke="#718096"
        />

        <YAxis
          stroke="#718096"
        />

        <Tooltip
          contentStyle={{
            background:
              "#0d1728",
            border:
              "1px solid #253652"
          }}
        />

        <Line
          type="monotone"
          dataKey="rate"
          stroke="#a78bfa"
          strokeWidth={3}
          dot={{ r: 3 }}
        />

      </LineChart>

    </ResponsiveContainer>

  );
}