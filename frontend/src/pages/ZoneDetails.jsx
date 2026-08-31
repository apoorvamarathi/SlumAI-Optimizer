import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../services/api";

import "../styles/ZoneDetails.css";


function ZoneDetails() {

  const { zoneId } = useParams();

  const [zone, setZone] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {

    async function loadZoneDetails() {

      try {

        const [
          zoneResponse,
          recommendationResponse
        ] = await Promise.all([

          api.get(`/zones/${zoneId}`),

          api.get(`/recommendations/${zoneId}`)

        ]);


        setZone(zoneResponse.data);

        setRecommendation(
          recommendationResponse.data
        );

      } catch (err) {

        console.error(
          "Zone details error:",
          err
        );

        if (
          err.response?.status === 404
        ) {

          setError(
            "Zone not found."
          );

        } else {

          setError(
            "Unable to load zone details."
          );
        }

      } finally {

        setLoading(false);

      }
    }


    loadZoneDetails();

  }, [zoneId]);


  if (loading) {

    return (
      <>
        <Navbar />

        <div className="zone-details-loading">
          Loading zone details...
        </div>
      </>
    );
  }


  if (error) {

    return (
      <>
        <Navbar />

        <div className="zone-details-error">
          <h2>{error}</h2>

          <Link to="/zones">
            Back to Zones
          </Link>
        </div>
      </>
    );
  }


  return (

    <div className="zone-details-page">

      <Navbar />


      <main className="zone-details-container">

        <div className="zone-details-top">

          <div>

            <Link
              to="/zones"
              className="back-link"
            >
              ← Back to Zones
            </Link>

            <h1>
              {zone.zone_name}
            </h1>

            <p>
              Zone ID: {zone.zone_id}
            </p>

          </div>

        </div>


        {/* ============================
            BASIC ZONE INFORMATION
        ============================= */}

        <section className="details-section">

          <h2>
            Zone Information
          </h2>


          <div className="info-grid">

            <div className="info-card">

              <span>
                City
              </span>

              <strong>
                {zone.city || "N/A"}
              </strong>

            </div>


            <div className="info-card">

              <span>
                Region
              </span>

              <strong>
                {zone.region || "N/A"}
              </strong>

            </div>


            <div className="info-card">

              <span>
                Population
              </span>

              <strong>
                {Number(
                  zone.population_estimate || 0
                ).toLocaleString()}
              </strong>

            </div>


            <div className="info-card">

              <span>
                Latitude
              </span>

              <strong>
                {zone.latitude ?? "N/A"}
              </strong>

            </div>


            <div className="info-card">

              <span>
                Longitude
              </span>

              <strong>
                {zone.longitude ?? "N/A"}
              </strong>

            </div>

          </div>

        </section>


        {/* ============================
            RISK INFORMATION
        ============================= */}

        <section className="details-section">

          <h2>
            Risk Information
          </h2>


          <div className="info-grid">

            <div className="info-card">

              <span>
                Risk Score
              </span>

              <strong>
                {Number(
                  recommendation.risk_score
                ).toFixed(2)}
              </strong>

            </div>


            <div className="info-card">

              <span>
                Priority Score
              </span>

              <strong>
                {Number(
                  recommendation.priority_score
                ).toFixed(3)}
              </strong>

            </div>


            <div className="info-card">

              <span>
                Priority Level
              </span>

              <strong
                className={`priority-text ${String(
                  recommendation.priority_level
                ).toLowerCase()}`}
              >
                {recommendation.priority_level}
              </strong>

            </div>

          </div>

        </section>


        {/* ============================
            WATER INFORMATION
        ============================= */}

        <section className="details-section">

          <h2>
            Water Resource Information
          </h2>


          <div className="info-grid">

            <div className="info-card">

              <span>
                Predicted Demand
              </span>

              <strong>
                {Number(
                  recommendation.predicted_water_demand
                ).toLocaleString()} L
              </strong>

            </div>


            <div className="info-card">

              <span>
                Optimized Allocation
              </span>

              <strong>
                {Number(
                  recommendation.optimized_allocation
                ).toLocaleString()} L
              </strong>

            </div>


            <div className="info-card">

              <span>
                Unmet Demand
              </span>

              <strong>
                {Number(
                  recommendation.unmet_demand
                ).toLocaleString()} L
              </strong>

            </div>


            <div className="info-card">

              <span>
                Allocation Percentage
              </span>

              <strong>
                {Number(
                  recommendation.allocation_percentage
                ).toFixed(2)}%
              </strong>

            </div>

          </div>

        </section>


        {/* ============================
            RECOMMENDATION
        ============================= */}

        <section className="recommendation-card">

          <h2>
            Resource Recommendation
          </h2>

          <p>
            {recommendation.recommendation}
          </p>

        </section>

      </main>

    </div>
  );
}


export default ZoneDetails;