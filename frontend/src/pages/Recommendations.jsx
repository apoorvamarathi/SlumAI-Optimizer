import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../services/api";

import "../styles/Recommendations.css";


function Recommendations() {

  const [recommendations, setRecommendations] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {

    async function loadRecommendations() {

      try {

        const response = await api.get(
          "/recommendations/"
        );

        setRecommendations(
          response.data.data || []
        );

      } catch (err) {

        console.error(
          "Recommendation loading error:",
          err
        );

        if (err.response?.status === 401) {

          setError(
            "Your login session has expired. Please login again."
          );

        } else {

          setError(
            "Unable to load recommendations."
          );
        }

      } finally {

        setLoading(false);

      }
    }


    loadRecommendations();

  }, []);


  const criticalCount =
    recommendations.filter(
      (item) =>
        String(
          item.priority_level
        ).toLowerCase() === "critical"
    ).length;


  const highCount =
    recommendations.filter(
      (item) =>
        String(
          item.priority_level
        ).toLowerCase() === "high"
    ).length;


  const totalUnmetDemand =
    recommendations.reduce(
      (total, item) =>
        total +
        Number(item.unmet_demand || 0),
      0
    );


  const averageAllocation =
    recommendations.length > 0
      ? recommendations.reduce(
          (total, item) =>
            total +
            Number(
              item.allocation_percentage || 0
            ),
          0
        ) / recommendations.length
      : 0;


  if (loading) {

    return (
      <>
        <Navbar />

        <div className="recommendations-loading">
          Loading recommendations...
        </div>
      </>
    );
  }


  if (error) {

    return (
      <>
        <Navbar />

        <div className="recommendations-error">

          <h2>
            {error}
          </h2>

          <Link to="/login">
            Go to Login
          </Link>

        </div>
      </>
    );
  }


  return (

    <div className="recommendations-page">

      <Navbar />


      <main className="recommendations-container">

        {/* ==============================
            HEADER
        =============================== */}

        <div className="recommendations-header">

          <h1>
            Resource Recommendations
          </h1>

          <p>
            Recommended water allocation and
            priority actions for each zone.
          </p>

        </div>


        {/* ==============================
            SUMMARY CARDS
        =============================== */}

        <section className="recommendation-summary">

          <div className="recommendation-summary-card">

            <span>
              Total Zones
            </span>

            <strong>
              {recommendations.length}
            </strong>

          </div>


          <div className="recommendation-summary-card">

            <span>
              Critical Priority
            </span>

            <strong>
              {criticalCount}
            </strong>

          </div>


          <div className="recommendation-summary-card">

            <span>
              High Priority
            </span>

            <strong>
              {highCount}
            </strong>

          </div>


          <div className="recommendation-summary-card">

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


          <div className="recommendation-summary-card">

            <span>
              Average Allocation
            </span>

            <strong>
              {averageAllocation.toFixed(2)}%
            </strong>

          </div>

        </section>


        {/* ==============================
            RECOMMENDATION TABLE
        =============================== */}

        <section className="recommendations-section">

          <div className="recommendations-section-header">

            <h2>
              Zone-wise Recommendations
            </h2>

            <span>
              {recommendations.length} Zones
            </span>

          </div>


          <div className="recommendations-table-wrapper">

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
                    Optimized Allocation
                  </th>

                  <th>
                    Unmet Demand
                  </th>

                  <th>
                    Allocation
                  </th>

                  <th>
                    Recommendation
                  </th>

                  <th>
                    Action
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

                        <strong>
                          {item.zone_id}
                        </strong>

                        <span className="recommendation-zone-name">
                          {item.zone_name}
                        </span>

                      </td>


                      <td>

                        {Number(
                          item.risk_score || 0
                        ).toFixed(2)}

                      </td>


                      <td>

                        <span
                          className={`recommendation-priority ${String(
                            item.priority_level
                          ).toLowerCase()}`}
                        >
                          {item.priority_level}
                        </span>

                      </td>


                      <td>

                        {Number(
                          item.predicted_water_demand || 0
                        ).toLocaleString()}

                        {" "}L

                      </td>


                      <td>

                        {Number(
                          item.optimized_allocation || 0
                        ).toLocaleString()}

                        {" "}L

                      </td>


                      <td>

                        {Number(
                          item.unmet_demand || 0
                        ).toLocaleString()}

                        {" "}L

                      </td>


                      <td>

                        {Number(
                          item.allocation_percentage || 0
                        ).toFixed(2)}%

                      </td>


                      <td>

                        <span className="recommendation-text">
                          {item.recommendation}
                        </span>

                      </td>


                      <td>

                        <Link
                          to={`/zones/${item.zone_id}`}
                          className="recommendation-view-button"
                        >
                          View Zone
                        </Link>

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


export default Recommendations;