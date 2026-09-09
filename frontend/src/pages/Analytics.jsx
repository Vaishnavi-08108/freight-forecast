import {
  BarChart3,
  BrainCircuit,
  Database,
  Gauge,
  TrendingUp
} from "lucide-react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import SectionTitle from "../components/SectionTitle";
import Badge from "../components/Badge";

const data = [

  {
    name: "Freight",
    score: 92
  },

  {
    name: "Fuel",
    score: 87
  },

  {
    name: "Vessels",
    score: 84
  },

  {
    name: "Ports",
    score: 79
  },

  {
    name: "Weather",
    score: 72
  }

];

export default function Analytics() {

  return (

    <div>

      <SectionTitle
        title="Analytics & Model Health"
        subtitle="Performance, signal contribution and system reliability."
        action={
          <Badge tone="green">
            MODEL HEALTHY
          </Badge>
        }
      />


      <div className="grid-4">

        <div className="panel metric">

          <Gauge />

          <span>
            MAE
          </span>

          <strong>
            $1.84/t
          </strong>

        </div>


        <div className="panel metric">

          <BrainCircuit />

          <span>
            Confidence
          </span>

          <strong>
            92%
          </strong>

        </div>


        <div className="panel metric">

          <Database />

          <span>
            Data freshness
          </span>

          <strong>
            6 min
          </strong>

        </div>


        <div className="panel metric">

          <TrendingUp />

          <span>
            Directional hit rate
          </span>

          <strong>
            88%
          </strong>

        </div>

      </div>


      <section className="panel">

        <SectionTitle
          title="Signal importance"
          subtitle="Relative contribution to the current freight forecast."
        />

        <ResponsiveContainer
          width="100%"
          height={330}
        >

          <BarChart
            data={data}
            layout="vertical"
            margin={{
              left: 20,
              right: 20
            }}
          >

            <CartesianGrid
              stroke="#223047"
              strokeDasharray="3 3"
            />

            <XAxis
              type="number"
              domain={[0, 100]}
              stroke="#718096"
            />

            <YAxis
              dataKey="name"
              type="category"
              stroke="#a9b5c7"
            />

            <Tooltip
              contentStyle={{
                background:
                  "#0d1728",
                border:
                  "1px solid #253652"
              }}
            />

            <Bar
              dataKey="score"
              fill="#38bdf8"
              radius={[
                0,
                6,
                6,
                0
              ]}
            />

          </BarChart>

        </ResponsiveContainer>

      </section>

    </div>

  );
}