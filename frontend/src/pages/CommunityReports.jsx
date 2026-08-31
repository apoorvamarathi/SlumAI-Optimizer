import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

import "../styles/CommunityReports.css";


function CommunityReports() {

  const [reportType, setReportType] = useState("Garbage");
  const [issueType, setIssueType] = useState("Garbage not collected");
  const [severity, setSeverity] = useState("Medium");
  const [description, setDescription] = useState("");

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [loadingLocation, setLoadingLocation] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");


  const waterIssues = [
    "No water",
    "Low water supply",
    "Water leakage",
    "Dirty water",
    "Tanker required",
  ];


  const garbageIssues = [
    "Garbage not collected",
    "Garbage overflowing",
    "Illegal dumping",
    "Bad waste condition",
  ];


  const handleReportTypeChange = (event) => {

    const value = event.target.value;

    setReportType(value);

    if (value === "Water") {
      setIssueType(waterIssues[0]);
    } else {
      setIssueType(garbageIssues[0]);
    }
  };


  const detectLocation = () => {

    setError("");
    setSuccess("");

    if (!navigator.geolocation) {

      setError(
        "Geolocation is not supported by your browser."
      );

      return;
    }

    setLoadingLocation(true);


    navigator.geolocation.getCurrentPosition(

      (position) => {

        setLatitude(
          position.coords.latitude
        );

        setLongitude(
          position.coords.longitude
        );

        setLoadingLocation(false);
      },

      (locationError) => {

        console.error(
          "Location error:",
          locationError
        );

        setError(
          "Unable to get your location. Please allow location access."
        );

        setLoadingLocation(false);
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };


  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");
    setSuccess("");


    if (
      latitude === null ||
      longitude === null
    ) {

      setError(
        "Please detect your location before submitting the report."
      );

      return;
    }


    setSubmitting(true);


    try {

      const response = await api.post(
        "/complaints/",
        {
          report_type: reportType,
          issue_type: issueType,
          description: description,
          latitude: latitude,
          longitude: longitude,
          severity: severity,
        }
      );


      setSuccess(
        `Report submitted successfully. Report ID: ${response.data.report_id}`
      );


      setDescription("");


    } catch (err) {

      console.error(
        "Complaint submission error:",
        err
      );


      if (err.response?.status === 401) {

        setError(
          "Your login session has expired. Please login again."
        );

      } else {

        setError(
          err.response?.data?.detail ||
          "Unable to submit the report."
        );
      }

    } finally {

      setSubmitting(false);
    }
  };


  const issueOptions =
    reportType === "Water"
      ? waterIssues
      : garbageIssues;


  return (

    <div className="community-reports-page">

      <Navbar />


      <main className="community-reports-container">

        <div className="community-reports-header">

          <h1>
            Community Reports
          </h1>

          <p>
            Report water and garbage problems
            in your area.
          </p>

        </div>


        <section className="community-report-card">

          <form
            onSubmit={handleSubmit}
          >

            {/* Report Type */}

            <div className="report-form-group">

              <label>
                Problem Category
              </label>

              <select
                value={reportType}
                onChange={handleReportTypeChange}
              >

                <option value="Water">
                  Water
                </option>

                <option value="Garbage">
                  Garbage
                </option>

              </select>

            </div>


            {/* Issue */}

            <div className="report-form-group">

              <label>
                Problem
              </label>

              <select
                value={issueType}
                onChange={(event) =>
                  setIssueType(
                    event.target.value
                  )
                }
              >

                {issueOptions.map(
                  (issue) => (

                    <option
                      key={issue}
                      value={issue}
                    >
                      {issue}
                    </option>

                  )
                )}

              </select>

            </div>


            {/* Severity */}

            <div className="report-form-group">

              <label>
                Severity
              </label>

              <select
                value={severity}
                onChange={(event) =>
                  setSeverity(
                    event.target.value
                  )
                }
              >

                <option value="Low">
                  Low
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="High">
                  High
                </option>

                <option value="Emergency">
                  Emergency
                </option>

              </select>

            </div>


            {/* Description */}

            <div className="report-form-group">

              <label>
                Description
              </label>

              <textarea
                value={description}
                onChange={(event) =>
                  setDescription(
                    event.target.value
                  )
                }
                placeholder="Describe the problem..."
                rows="5"
              />

            </div>


            {/* Location */}

            <div className="location-section">

              <h3>
                Location
              </h3>


              <button
                type="button"
                className="location-button"
                onClick={detectLocation}
                disabled={loadingLocation}
              >

                {loadingLocation
                  ? "Getting Location..."
                  : "📍 Use My Location"
                }

              </button>


              {latitude !== null &&
               longitude !== null && (

                <div className="location-result">

                  <p>
                    <strong>
                      Latitude:
                    </strong>{" "}
                    {latitude.toFixed(6)}
                  </p>

                  <p>
                    <strong>
                      Longitude:
                    </strong>{" "}
                    {longitude.toFixed(6)}
                  </p>

                  <p>
                    <strong>
                      Zone:
                    </strong>{" "}
                    Detected automatically after submission
                  </p>

                </div>

              )}

            </div>


            {/* Messages */}

            {error && (

              <div className="report-error">
                {error}
              </div>

            )}


            {success && (

              <div className="report-success">
                {success}
              </div>

            )}


            {/* Submit */}

            <button
              type="submit"
              className="submit-report-button"
              disabled={submitting}
            >

              {submitting
                ? "Submitting..."
                : "Submit Report"
              }

            </button>

          </form>

        </section>

      </main>

    </div>
  );
}


export default CommunityReports;