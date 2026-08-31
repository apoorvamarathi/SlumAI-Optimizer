import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../services/api";

import "../styles/Alerts.css";


function Alerts() {

  const [alerts, setAlerts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {

    async function loadAlerts() {

      try {

        const response = await api.get(
          "/alerts/"
        );

        setAlerts(
          response.data.alerts || []
        );

      } catch (err) {

        console.error(
          "Alerts loading error:",
          err
        );

        if (err.response?.status === 401) {

          setError(
            "Your login session has expired. Please login again."
          );

        } else {

          setError(
            "Unable to load risk alerts."
          );
        }

      } finally {

        setLoading(false);
      }
    }


    loadAlerts();

  }, []);


  const highRiskAlerts =
    alerts.filter(
      (item) =>
        item.risk_level === "High"
    );


  const mediumRiskAlerts =
    alerts.filter(
      (item) =>
        item.risk_level === "Medium"
    );


  const lowRiskAlerts =
    alerts.filter(
      (item) =>
        item.risk_level === "Low"
    );


  if (loading) {

    return (
      <>
        <Navbar />

        <div className="alerts-loading">
          Loading risk alerts...
        </div>
      </>
    );
  }


  if (error) {

    return (
      <>
        <Navbar />

        <div className="alerts-error">

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

    <div className="alerts-page">

      <Navbar />


      <main className="alerts-container">

        {/* =========================
            HEADER
        ========================== */}

        <div className="alerts-header">

          <h1>
            Risk Alerts
          </h1>

          <p>
            Monitor zones that require attention
            based on their risk level.
          </p>

        </div>


        {/* =========================
            SUMMARY CARDS
        ========================== */}

        <section className="alerts-summary">

          <div className="alert-summary-card">

            <span>
              Total Alerts
            </span>

            <strong>
              {alerts.length}
            </strong>

          </div>


          <div className="alert-summary-card high-card">

            <span>
              High Risk
            </span>

            <strong>
              {highRiskAlerts.length}
            </strong>

          </div>


          <div className="alert-summary-card medium-card">

            <span>
              Medium Risk
            </span>

            <strong>
              {mediumRiskAlerts.length}
            </strong>

          </div>


          <div className="alert-summary-card low-card">

            <span>
              Low Risk
            </span>

            <strong>
              {lowRiskAlerts.length}
            </strong>

          </div>

        </section>


        {/* =========================
            HIGH RISK SECTION
        ========================== */}

        <section className="alerts-section high-risk-section">

          <div className="alerts-section-header">

            <div>

              <h2>
                High Risk Alerts
              </h2>

              <p>
                These zones require immediate attention.
              </p>

            </div>

            <span className="alert-count high-count">
              {highRiskAlerts.length}
            </span>

          </div>


          {highRiskAlerts.length === 0 ? (

            <div className="no-alerts">
              No high-risk zones found.
            </div>

          ) : (

            <div className="alert-list">

              {highRiskAlerts.map(
                (item) => (

                  <div
                    className="alert-item high-alert"
                    key={item.zone_id}
                  >

                    <div className="alert-main">

                      <div>

                        <h3>
                          {item.zone_name}
                        </h3>

                        <span className="zone-id">
                          {item.zone_id}
                        </span>

                      </div>

                      <span className="risk-badge high">
                        High
                      </span>

                    </div>


                    <div className="alert-details">

                      <div>
                        <span>
                          Risk Score
                        </span>

                        <strong>
                          {Number(
                            item.risk_score
                          ).toFixed(2)}
                        </strong>
                      </div>


                      <div>
                        <span>
                          Alert
                        </span>

                        <strong>
                          {item.alert}
                        </strong>
                      </div>

                    </div>


                    <Link
                      to={`/zones/${item.zone_id}`}
                      className="alert-view-button"
                    >
                      View Zone
                    </Link>

                  </div>

                )
              )}

            </div>

          )}

        </section>


        {/* =========================
            MEDIUM RISK SECTION
        ========================== */}

        <section className="alerts-section">

          <div className="alerts-section-header">

            <div>

              <h2>
                Medium Risk
              </h2>

              <p>
                These zones should be monitored.
              </p>

            </div>

            <span className="alert-count medium-count">
              {mediumRiskAlerts.length}
            </span>

          </div>


          {mediumRiskAlerts.length === 0 ? (

            <div className="no-alerts">
              No medium-risk zones found.
            </div>

          ) : (

            <div className="alert-table-wrapper">

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
                      Alert
                    </th>

                    <th>
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {mediumRiskAlerts.map(
                    (item) => (

                      <tr
                        key={item.zone_id}
                      >

                        <td>

                          <strong>
                            {item.zone_id}
                          </strong>

                          <span className="table-zone-name">
                            {item.zone_name}
                          </span>

                        </td>


                        <td>

                          {Number(
                            item.risk_score
                          ).toFixed(2)}

                        </td>


                        <td>
                          {item.alert}
                        </td>


                        <td>

                          <Link
                            to={`/zones/${item.zone_id}`}
                            className="table-view-button"
                          >
                            View
                          </Link>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </section>


        {/* =========================
            LOW RISK SECTION
        ========================== */}

        <section className="alerts-section">

          <div className="alerts-section-header">

            <div>

              <h2>
                Low Risk
              </h2>

              <p>
                These zones are under normal monitoring.
              </p>

            </div>

            <span className="alert-count low-count">
              {lowRiskAlerts.length}
            </span>

          </div>


          {lowRiskAlerts.length === 0 ? (

            <div className="no-alerts">
              No low-risk zones found.
            </div>

          ) : (

            <div className="low-risk-list">

              {lowRiskAlerts.map(
                (item) => (

                  <div
                    className="low-risk-item"
                    key={item.zone_id}
                  >

                    <div>

                      <strong>
                        {item.zone_id}
                      </strong>

                      <span>
                        {item.zone_name}
                      </span>

                    </div>


                    <span>
                      Risk:{" "}
                      {Number(
                        item.risk_score
                      ).toFixed(2)}
                    </span>


                    <Link
                      to={`/zones/${item.zone_id}`}
                    >
                      View
                    </Link>

                  </div>

                )
              )}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}


export default Alerts;