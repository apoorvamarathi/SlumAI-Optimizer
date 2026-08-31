import { useState } from "react";

import Navbar from "../components/Navbar";
import api from "../services/api";

import "../styles/Reports.css";


function Reports() {

  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const downloadReport = async (
    type
  ) => {

    setError("");
    setSuccess("");
    setLoading(type);


    try {

      const response = await api.get(
        `/reports/${type}`,
        {
          responseType: "blob",
        }
      );


      const contentType =
        response.headers["content-type"] || "";


      if (
        contentType.includes("application/json")
      ) {

        const text =
          await response.data.text();

        const errorData =
          JSON.parse(text);

        throw new Error(
          errorData.detail ||
          "Unable to generate report."
        );
      }


      const blob = new Blob(
        [response.data],
        {
          type: contentType
        }
      );


      const url =
        window.URL.createObjectURL(blob);


      const link =
        document.createElement("a");


      link.href = url;


      link.download =
        type === "pdf"
          ? "urban_water_risk_report.pdf"
          : "resource_optimization_report.xlsx";


      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);


      setSuccess(
        `${type.toUpperCase()} report downloaded successfully.`
      );


    } catch (err) {

      console.error(
        "Report error:",
        err
      );


      if (err.response?.status === 401) {

        setError(
          "Your login session has expired. Please login again."
        );

      } else {

        setError(
          err.message ||
          "Unable to generate report."
        );
      }

    } finally {

      setLoading("");

    }
  };


  return (

    <div className="reports-page">

      <Navbar />


      <main className="reports-container">

        <div className="reports-header">

          <h1>
            Reports
          </h1>

          <p>
            Generate reports from the latest
            resource optimization results.
          </p>

        </div>


        {error && (

          <div className="reports-message error">
            {error}
          </div>

        )}


        {success && (

          <div className="reports-message success">
            {success}
          </div>

        )}


        <section className="reports-grid">


          {/* PDF */}

          <div className="report-card">

            <div className="report-icon">
              PDF
            </div>

            <h2>
              Water & Risk Report
            </h2>

            <p>
              Generate a PDF report containing
              zone risk, priority, allocation,
              unmet demand and recommendations.
            </p>


            <button
              onClick={() =>
                downloadReport("pdf")
              }
              disabled={loading === "pdf"}
            >

              {loading === "pdf"
                ? "Generating..."
                : "Download PDF"
              }

            </button>

          </div>


          {/* Excel */}

          <div className="report-card">

            <div className="report-icon">
              XLSX
            </div>

            <h2>
              Resource Optimization Report
            </h2>

            <p>
              Generate an Excel report containing
              zone-wise recommendations and
              summary statistics.
            </p>


            <button
              onClick={() =>
                downloadReport("excel")
              }
              disabled={loading === "excel"}
            >

              {loading === "excel"
                ? "Generating..."
                : "Download Excel"
              }

            </button>

          </div>


        </section>


        <section className="report-info">

          <h2>
            Report Contents
          </h2>

          <div className="report-info-grid">

            <div>
              <strong>
                Water Demand
              </strong>

              <p>
                Predicted water demand for
                each zone.
              </p>
            </div>


            <div>
              <strong>
                Risk
              </strong>

              <p>
                Risk score and priority level.
              </p>
            </div>


            <div>
              <strong>
                Allocation
              </strong>

              <p>
                Optimized allocation and
                unmet demand.
              </p>
            </div>


            <div>
              <strong>
                Recommendation
              </strong>

              <p>
                Suggested action for each zone.
              </p>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}


export default Reports;