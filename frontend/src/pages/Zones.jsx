import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../services/api";

import "../styles/Zones.css";


function Zones() {

  const [zones, setZones] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {

    async function loadZones() {

      try {

        const response = await api.get("/zones/");

        setZones(response.data);

      } catch (err) {

        console.error(
          "Zone loading error:",
          err
        );

        if (err.response?.status === 401) {

          setError(
            "Your login session has expired. Please login again."
          );

        } else {

          setError(
            "Unable to load zones."
          );
        }

      } finally {

        setLoading(false);

      }
    }


    loadZones();

  }, []);


  if (loading) {

    return (
      <>
        <Navbar />

        <div className="zones-loading">
          Loading zones...
        </div>
      </>
    );
  }


  if (error) {

    return (
      <>
        <Navbar />

        <div className="zones-error">

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

    <div className="zones-page">

      <Navbar />


      <main className="zones-container">

        {/* =========================
            PAGE HEADER
        ========================== */}

        <div className="zones-header">

          <div>

            <h1>
              All Zones
            </h1>

            <p>
              View all monitored zones and
              open detailed zone information.
            </p>

          </div>


          <div className="zone-count">

            <span>
              Total Zones
            </span>

            <strong>
              {zones.length}
            </strong>

          </div>

        </div>


        {/* =========================
            ZONE TABLE
        ========================== */}

        <section className="zones-card">

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>
                    Zone ID
                  </th>

                  <th>
                    Zone Name
                  </th>

                  <th>
                    City
                  </th>

                  <th>
                    Region
                  </th>

                  <th>
                    Population
                  </th>

                  <th>
                    Location
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {zones.map(
                  (zone) => (

                    <tr
                      key={zone.zone_id}
                    >

                      <td>
                        <strong>
                          {zone.zone_id}
                        </strong>
                      </td>


                      <td>
                        {zone.zone_name}
                      </td>


                      <td>
                        {zone.city || "N/A"}
                      </td>


                      <td>
                        {zone.region || "N/A"}
                      </td>


                      <td>
                        {Number(
                          zone.population_estimate || 0
                        ).toLocaleString()}
                      </td>


                      <td>

                        {zone.latitude != null &&
                         zone.longitude != null ? (

                          <span className="location-status">
                            Available
                          </span>

                        ) : (

                          <span className="location-missing">
                            Not available
                          </span>

                        )}

                      </td>


                      <td>

                        <Link
                          to={`/zones/${zone.zone_id}`}
                          className="view-zone-button"
                        >
                          View Details
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


export default Zones;