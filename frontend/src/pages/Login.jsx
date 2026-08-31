import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/useAuth";

import "../styles/Login.css";


function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");
    setLoading(true);

    try {

      await login(
        username,
        password
      );

      navigate("/dashboard");

    } catch (error) {

      console.error("Login error:", error);

      if (error.response?.data?.detail) {

        setError(
          error.response.data.detail
        );

      } else {

        setError(
          "Login failed. Please check your username and password."
        );
      }

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="login-page">

      <div className="login-card">

        <div className="login-header">

          <h1>
            SlumAI Optimizer
          </h1>

          <h2>
            Welcome Back
          </h2>

          <p>
            Login to access the management dashboard
          </p>

        </div>


        {error && (

          <div className="login-error">
            {error}
          </div>

        )}


        <form
          onSubmit={handleSubmit}
          className="login-form"
        >

          <div className="login-form-group">

            <label htmlFor="username">
              Username
            </label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) =>
                setUsername(
                  event.target.value
                )
              }
              placeholder="Enter your username"
              autoComplete="username"
              required
            />

          </div>


          <div className="login-form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />

          </div>


          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >

            {loading
              ? "Logging in..."
              : "Login"
            }

          </button>

        </form>


        <div className="login-footer">

          <p>
            Don't have an account?
          </p>

          <Link to="/register">
            Create an account
          </Link>

        </div>

      </div>

    </div>

  );
}


export default Login;