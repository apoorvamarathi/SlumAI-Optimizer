import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import api from "../services/api";

import "../styles/Dashboard.css";


function Dashboard() {

  const [zones, setZones] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {

    async function loadDashboard() {

      try {

        const [
          zonesResponse,
          recommendationsResponse
        ] = await Promise.all([

          api.get("/zones/"),

          api.get("/recommendations/")

        ]);


        setZones(
          zonesResponse.data
        );


        setRecommendations(
          recommendationsResponse.data.data
        );

      } catch (err) {

        console.error(err);

        setError(
          "Unable to load dashboard data."
        );

      } finally {

        setLoading(false);
      }
    }


    loadDashboard();

  }, []);


  const highRiskZones =
    recommendations.filter(
      (item) =>
        Number(item.risk_score) > 75
    ).length;


  const mediumRiskZones =
    recommendations.filter(
      (item) =>
        Number(item.risk_score) >= 60 &&
        Number(item.risk_score) <= 75
    ).length;


  const totalUnmetDemand =
    recommendations.reduce(
      (total, item) =>
        total + Number(item.unmet_demand || 0),
      0
    );


  const totalAllocation =
    recommendations.reduce(
      (total, item) =>
        total +
        Number(item.optimized_allocation || 0),
      0
    );


  if (loading) {

    return (
      <div className="dashboard-loading">
        Loading dashboard...
      </div>
    );
  }


  if (error) {

    return (
      <>
        <Navbar />

        <div className="dashboard-error">
          {error}
        </div>
      </>
    );
  }


  return (
    <div className="dashboard-page">

      <Navbar />


      <main className="dashboard-container">

        <div className="dashboard-header">

          <div>

            <h1>
              Urban Water & Risk Dashboard
            </h1>

            <p>
              Monitor zones, water demand, risk,
              and resource allocation.
            </p>

          </div>

        </div>


        {/* ==============================
            SUMMARY CARDS
        =============================== */}

        <section className="summary-grid">

          <div className="summary-card">

            <span>
              Total Zones
            </span>

            <strong>
              {zones.length}
            </strong>

          </div>


          <div className="summary-card">

            <span>
              High Risk Zones
            </span>

            <strong>
              {highRiskZones}
            </strong>

          </div>


          <div className="summary-card">

            <span>
              Medium Risk Zones
            </span>

            <strong>
              {mediumRiskZones}
            </strong>

          </div>


          <div className="summary-card">

            <span>
              Total Unmet Demand
            </span>

            <strong>
              {totalUnmetDemand.toLocaleString()}
            </strong>

            <small>
              Liters
            </small>

          </div>


          <div className="summary-card">

            <span>
              Total Allocation
            </span>

            <strong>
              {totalAllocation.toLocaleString()}
            </strong>

            <small>
              Liters
            </small>

          </div>

        </section>


        {/* ==============================
            ZONE TABLE
        =============================== */}

        <section className="dashboard-section">

          <div className="section-heading">

            <h2>
              Zone Overview
            </h2>

          </div>


          <div className="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>
                    Zone
                  </th>

                  <th>
                    Risk Score
                  </th>

                  <th>
                    Priority
                  </th>

                  <th>
                    Predicted Demand
                  </th>

                  <th>
                    Allocation
                  </th>

                  <th>
                    Unmet Demand
                  </th>

                  <th>
                    Recommendation
                  </th>

                </tr>

              </thead>


              <tbody>

                {recommendations.map(
                  (item) => (

                    <tr
                      key={item.zone_id}
                    >

                      <td>
                        {item.zone_name}
                      </td>

                      <td>
                        {Number(
                          item.risk_score
                        ).toFixed(2)}
                      </td>

                      <td>

                        <span
                          className={`priority-badge ${String(
                            item.priority_level
                          ).toLowerCase()}`}
                        >

                          {item.priority_level}

                        </span>

                      </td>

                      <td>
                        {Number(
                          item.predicted_water_demand
                        ).toLocaleString()}
                        {" "}L
                      </td>

                      <td>
                        {Number(
                          item.optimized_allocation
                        ).toLocaleString()}
                        {" "}L
                      </td>

                      <td>
                        {Number(
                          item.unmet_demand
                        ).toLocaleString()}
                        {" "}L
                      </td>

                      <td>
                        {item.recommendation}
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </section>

      </main>

    </div>
  );
}


export default Dashboard;