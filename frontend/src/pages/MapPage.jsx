import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";

import Navbar from "../components/Navbar";
import api from "../services/api";

import "../styles/MapPage.css";

import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";

function getRiskColor(riskScore) {
  const score = Number(riskScore);

  if (score > 75) {
    return "#dc2626";
  }

  if (score >= 60) {
    return "#f59e0b";
  }

  return "#16a34a";
}


function getRiskLevel(riskScore) {
  const score = Number(riskScore);

  if (score > 75) {
    return "High";
  }

  if (score >= 60) {
    return "Medium";
  }

  return "Low";
}


function MapPage() {

  const [zones, setZones] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {

    async function loadMapData() {

      try {

        const [
          zonesResponse,
          recommendationsResponse,
        ] = await Promise.all([

          api.get("/zones/"),

          api.get("/recommendations/"),

        ]);


        const zoneData = zonesResponse.data;

        const recommendationData =
          recommendationsResponse.data.data;


        const combinedData =
          recommendationData
            .map((recommendation) => {

              const zone =
                zoneData.find(
                  (item) =>
                    item.zone_id ===
                    recommendation.zone_id
                );


              if (!zone) {
                return null;
              }


              return {
                ...zone,

                risk_score:
                  recommendation.risk_score,

                priority_score:
                  recommendation.priority_score,

                priority_level:
                  recommendation.priority_level,

                predicted_water_demand:
                  recommendation.predicted_water_demand,

                optimized_allocation:
                  recommendation.optimized_allocation,

                unmet_demand:
                  recommendation.unmet_demand,

                allocation_percentage:
                  recommendation.allocation_percentage,

                recommendation:
                  recommendation.recommendation,
              };
            })
            .filter(Boolean);


        setZones(combinedData);

      } catch (err) {

        console.error(
          "Map data error:",
          err
        );

        setError(
          "Unable to load map data."
        );

      } finally {

        setLoading(false);

      }
    }


    loadMapData();

  }, []);


  if (loading) {

    return (
      <div className="map-loading">
        Loading map...
      </div>
    );
  }


  if (error) {

    return (
      <>
        <Navbar />

        <div className="map-error">
          {error}
        </div>
      </>
    );
  }


  return (

    <div className="map-page">

      <Navbar />

      <main className="map-container">

        <div className="map-header">

          <h1>
            Zone Risk Map
          </h1>

          <p>
            View water demand, risk,
            priority and allocation for each zone.
          </p>

        </div>


        <div className="map-card">

          <MapContainer
            center={[19.043, 72.854]}
            zoom={14}
            className="leaflet-map"
          >

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />


            {zones.map((zone) => {

              const riskColor =
                getRiskColor(
                  zone.risk_score
                );


              return (

                <CircleMarker
                  key={zone.zone_id}
                  center={[
                    Number(zone.latitude),
                    Number(zone.longitude),
                  ]}
                  radius={10}
                  pathOptions={{
                    color: riskColor,
                    fillColor: riskColor,
                    fillOpacity: 0.8,
                    weight: 2,
                  }}
                >

                  <Popup>

                    <div className="zone-popup">

                      <h3>
                        {zone.zone_name}
                      </h3>

                      <p>
                        <strong>
                          Zone:
                        </strong>{" "}
                        {zone.zone_id}
                      </p>

                      <p>
                        <strong>
                          Risk Score:
                        </strong>{" "}
                        {Number(
                          zone.risk_score
                        ).toFixed(2)}
                      </p>

                      <p>
                        <strong>
                          Risk Level:
                        </strong>{" "}
                        {getRiskLevel(
                          zone.risk_score
                        )}
                      </p>

                      <p>
                        <strong>
                          Priority:
                        </strong>{" "}
                        {zone.priority_level}
                      </p>

                      <p>
                        <strong>
                          Predicted Demand:
                        </strong>{" "}
                        {Number(
                          zone.predicted_water_demand
                        ).toLocaleString()} L
                      </p>

                      <p>
                        <strong>
                          Optimized Allocation:
                        </strong>{" "}
                        {Number(
                          zone.optimized_allocation
                        ).toLocaleString()} L
                      </p>

                      <p>
                        <strong>
                          Unmet Demand:
                        </strong>{" "}
                        {Number(
                          zone.unmet_demand
                        ).toLocaleString()} L
                      </p>

                      <p>
                        <strong>
                          Allocation:
                        </strong>{" "}
                        {Number(
                          zone.allocation_percentage
                        ).toFixed(2)}%
                      </p>

                      <p>
                        <strong>
                          Recommendation:
                        </strong>{" "}
                        {zone.recommendation}
                      </p>
                        <Link
                        to={`/zones/${zone.zone_id}`}
                        className="map-details-link"
                        >
                        View Zone Details
                        </Link>
                    </div>

                  </Popup>

                </CircleMarker>

              );

            })}

          </MapContainer>

        </div>


        <div className="map-legend">

          <h3>
            Risk Legend
          </h3>

          <div className="legend-item">
            <span className="legend-dot low"></span>
            Low Risk
          </div>

          <div className="legend-item">
            <span className="legend-dot medium"></span>
            Medium Risk
          </div>

          <div className="legend-item">
            <span className="legend-dot high"></span>
            High Risk
          </div>

        </div>

      </main>

    </div>
  );
}


export default MapPage;