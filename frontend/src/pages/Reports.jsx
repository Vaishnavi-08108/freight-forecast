import {
  Download,
  FileBarChart,
  FileText,
  Plus
} from "lucide-react";

import Badge from "../components/Badge";
import SectionTitle from "../components/SectionTitle";

const reports = [

  [
    "Charter decision — Australia to Vizag",
    "Decision memo",
    "Today"
  ],

  [
    "East Coast freight outlook",
    "Market report",
    "Yesterday"
  ],

  [
    "Vessel shortlist — Q4",
    "Chartering analysis",
    "Sep 02"
  ]

];

export default function Reports() {

  return (

    <div>

      <SectionTitle
        title="Reports"
        subtitle="Presentation-ready decision documents."
        action={
          <button className="primary">

            <Plus size={15} />

            New report

          </button>
        }
      />


      <div className="report-grid">

        {reports.map(
          ([title, type, date]) => (

            <div
              className="panel report-card"
              key={title}
            >

              <div className="report-icon">

                <FileBarChart />

              </div>


              <div>

                <h3>
                  {title}
                </h3>

                <p>
                  {type}
                </p>

                <span>
                  {date}
                </span>

              </div>


              <button
                className="icon-btn"
                aria-label={`Download ${title}`}
              >

                <Download size={17} />

              </button>

            </div>

          )
        )}

      </div>


      <div className="panel">

        <FileText />

        <h3>
          SIH demo export
        </h3>

        <p>
          Use the reports module to show
          how a model recommendation can
          be converted into an auditable
          business decision.
        </p>

        <Badge tone="cyan">
          AUDIT READY
        </Badge>

      </div>

    </div>

  );
}