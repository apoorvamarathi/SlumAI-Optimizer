import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../services/api";

import "../styles/Optimization.css";


function Optimization() {

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {

    async function loadOptimization() {

      try {

        const response = await api.get(
          "/optimization/"
        );

        setData(
          response.data.data || []
        );

      } catch (err) {

        console.error(
          "Optimization loading error:",
          err
        );

        if (err.response?.status === 401) {

          setError(
            "Your login session has expired. Please login again."
          );

        } else {

          setError(
            "Unable to load optimization data."
          );
        }

      } finally {

        setLoading(false);

      }
    }


    loadOptimization();

  }, []);


  const totalDemand =
    data.reduce(
      (total, item) =>
        total +
        Number(
          item.predicted_water_demand || 0
        ),
      0
    );


  const totalAllocation =
    data.reduce(
      (total, item) =>
        total +
        Number(
          item.optimized_allocation || 0
        ),
      0
    );


  const totalUnmetDemand =
    data.reduce(
      (total, item) =>
        total +
        Number(
          item.unmet_demand || 0
        ),
      0
    );


  const averageAllocation =
    data.length > 0
      ? data.reduce(
          (total, item) =>
            total +
            Number(
              item.allocation_percentage || 0
            ),
          0
        ) / data.length
      : 0;


  if (loading) {

    return (
      <>
        <Navbar />

        <div className="optimization-loading">
          Loading optimization data...
        </div>
      </>
    );
  }


  if (error) {

    return (
      <>
        <Navbar />

        <div className="optimization-error">

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

    <div className="optimization-page">

      <Navbar />


      <main className="optimization-container">

        {/* ==========================
            HEADER
        =========================== */}

        <div className="optimization-header">

          <h1>
            Resource Optimization
          </h1>

          <p>
            View optimized water allocation
            across all monitored zones.
          </p>

        </div>


        {/* ==========================
            SUMMARY
        =========================== */}

        <section className="optimization-summary">

          <div className="optimization-card">

            <span>
              Total Predicted Demand
            </span>

            <strong>
              {totalDemand.toLocaleString()}
            </strong>

            <small>
              Liters
            </small>

          </div>


          <div className="optimization-card">

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


          <div className="optimization-card">

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


          <div className="optimization-card">

            <span>
              Average Allocation
            </span>

            <strong>
              {averageAllocation.toFixed(2)}%
            </strong>

          </div>

        </section>


        {/* ==========================
            OPTIMIZATION TABLE
        =========================== */}

        <section className="optimization-section">

          <div className="optimization-section-header">

            <h2>
              Zone-wise Allocation
            </h2>

            <span>
              {data.length} Zones
            </span>

          </div>


          <div className="optimization-table-wrapper">

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
                    Allocation %
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

                {data.map(
                  (item) => (

                    <tr
                      key={item.zone_id}
                    >

                      <td>

                        <strong>
                          {item.zone_id}
                        </strong>

                        <br />

                        <span className="zone-name">
                          {item.zone_name}
                        </span>

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

                        {Number(
                          item.allocation_percentage
                        ).toFixed(2)}%

                      </td>


                      <td>
                        {item.recommendation}
                      </td>


                      <td>

                        <Link
                          to={`/zones/${item.zone_id}`}
                          className="view-zone-link"
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


export default Optimization;