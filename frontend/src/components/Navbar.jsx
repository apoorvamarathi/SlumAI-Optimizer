
// import { NavLink, useNavigate } from "react-router-dom";

// import { useAuth } from "../context/useAuth";

// import "../styles/Navbar.css";


// function Navbar() {

//   const { logout } = useAuth();

//   const navigate = useNavigate();


//   const handleLogout = () => {

//     logout();

//     navigate("/login");
//   };


//   return (
//     <nav className="navbar">

//       {/* =========================
//           BRAND
//       ========================== */}

//       <div className="navbar-brand">

//         <NavLink
//           to="/dashboard"
//           className="brand-link"
//         >
//           SlumAI Optimizer
//         </NavLink>

//       </div>


//       {/* =========================
//           NAVIGATION LINKS
//       ========================== */}

//       <div className="navbar-links">

//         <NavLink
//           to="/dashboard"
//           className="nav-link"
//         >
//           Dashboard
//         </NavLink>


//         <NavLink
//           to="/map"
//           className="nav-link"
//         >
//           Map
//         </NavLink>


//         <NavLink
//           to="/zones"
//           className="nav-link"
//         >
//           Zones
//         </NavLink>


//         <NavLink
//           to="/optimization"
//           className="nav-link"
//         >
//           Optimization
//         </NavLink>


//         <NavLink
//           to="/recommendations"
//           className="nav-link"
//         >
//           Recommendations
//         </NavLink>


//         <NavLink
//           to="/alerts"
//           className="nav-link"
//         >
//           Alerts
//         </NavLink>


//         <NavLink
//           to="/reports"
//           className="nav-link"
//         >
//           Reports
//         </NavLink>


//         <NavLink
//           to="/ai-assistant"
//           className="nav-link ai-link"
//         >
//           AI Assistant
//         </NavLink>


//         <button
//           className="logout-button"
//           onClick={handleLogout}
//         >
//           Logout
//         </button>

//       </div>

//     </nav>
//   );
// }


// export default Navbar;


import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/useAuth";

import "../styles/Navbar.css";


function Navbar() {

  const {
    user,
    logout,
  } = useAuth();

  const navigate = useNavigate();


  const handleLogout = () => {

    logout();

    navigate("/login");
  };


  const role = user?.role;


  return (
    <nav className="navbar">

      {/* =========================
          BRAND
      ========================== */}

      <div className="navbar-brand">

        <NavLink
          to="/dashboard"
          className="brand-link"
        >
          SlumAI Optimizer
        </NavLink>

      </div>


      {/* =========================
          NAVIGATION LINKS
      ========================== */}

      <div className="navbar-links">

        <NavLink
          to="/dashboard"
          className="nav-link"
        >
          Dashboard
        </NavLink>


        <NavLink
          to="/map"
          className="nav-link"
        >
          Map
        </NavLink>


        <NavLink
          to="/zones"
          className="nav-link"
        >
          Zones
        </NavLink>


        {/* Admin + Field Officer only */}

        {(role === "admin" ||
          role === "field_officer") && (

          <NavLink
            to="/optimization"
            className="nav-link"
          >
            Optimization
          </NavLink>

        )}


        <NavLink
          to="/recommendations"
          className="nav-link"
        >
          Recommendations
        </NavLink>


        <NavLink
          to="/alerts"
          className="nav-link"
        >
          Alerts
        </NavLink>


        <NavLink
          to="/reports"
          className="nav-link"
        >
          Reports
        </NavLink>

       <NavLink
      to="/community-reports"
      className="nav-link"
    >
      Report Issue
    </NavLink>

        <NavLink
          to="/ai-assistant"
          className="nav-link ai-link"
        >
          AI Assistant
        </NavLink>



        {/* Admin only */}

        {role === "admin" && (

          <NavLink
            to="/admin"
            className="nav-link"
          >
            Admin
          </NavLink>

        )}


        {/* =========================
            USER INFO
        ========================== */}

        <div className="navbar-user">

          <span className="username">
            {user?.username || "User"}
          </span>


          <span
            className={`user-role ${role || "viewer"}`}
          >
            {role || "viewer"}
          </span>

        </div>


        {/* =========================
            LOGOUT
        ========================== */}

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}


export default Navbar;