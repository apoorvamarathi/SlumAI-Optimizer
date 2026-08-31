import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";

import "../styles/Register.css";


function Register() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");
    setSuccess("");


    // Check password
    if (password !== confirmPassword) {

      setError("Passwords do not match.");

      return;
    }


    // Check minimum password length
    if (password.length < 8) {

      setError(
        "Password must be at least 8 characters."
      );

      return;
    }


    setLoading(true);


    try {

      await api.post(
        "/auth/register",
        {
          username: username.trim(),
          email: email.trim(),
          password: password,
        }
      );


      setSuccess(
        "Registration successful! Redirecting to login..."
      );


      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");


      setTimeout(() => {

        navigate("/login");

      }, 1200);


    } catch (error) {

      console.error(
        "Registration error:",
        error
      );


      if (error.response?.data?.detail) {

        setError(
          error.response.data.detail
        );

      } else {

        setError(
          "Registration failed. Please try again."
        );
      }

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="register-page">

      <div className="register-card">


        {/* Header */}

        <div className="register-header">

          <h1>
            SlumAI Optimizer
          </h1>

          <h2>
            Create Account
          </h2>

          <p>
            Register to access the system
          </p>

        </div>


        {/* Error */}

        {error && (

          <div className="register-error">
            {error}
          </div>

        )}


        {/* Success */}

        {success && (

          <div className="register-success">
            {success}
          </div>

        )}


        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="register-form"
        >


          {/* Username */}

          <div className="register-form-group">

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
              placeholder="Enter username"
              autoComplete="username"
              required
            />

          </div>


          {/* Email */}

          <div className="register-form-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              placeholder="Enter email"
              autoComplete="email"
              required
            />

          </div>


          {/* Password */}

          <div className="register-form-group">

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
              placeholder="Enter password"
              autoComplete="new-password"
              required
            />

          </div>


          {/* Confirm Password */}

          <div className="register-form-group">

            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value
                )
              }
              placeholder="Re-enter password"
              autoComplete="new-password"
              required
            />

          </div>


          {/* Submit */}

          <button
            type="submit"
            className="register-button"
            disabled={loading}
          >

            {loading
              ? "Creating account..."
              : "Register"
            }

          </button>

        </form>


        {/* Footer */}

        <div className="register-footer">

          <p>
            Already have an account?
          </p>

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}


export default Register;