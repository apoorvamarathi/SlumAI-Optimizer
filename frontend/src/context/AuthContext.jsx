// import {
//   createContext,
//   useEffect,
//   useState,
// } from "react";

// import api from "../services/api";


// export const AuthContext = createContext(null);


// export function AuthProvider({ children }) {

//   const [token, setToken] = useState(
//     () => localStorage.getItem("access_token")
//   );


//   const login = async (username, password) => {

//     const formData = new URLSearchParams();

//     formData.append("username", username);
//     formData.append("password", password);


//     const response = await api.post(
//       "/auth/login",
//       formData,
//       {
//         headers: {
//           "Content-Type":
//             "application/x-www-form-urlencoded",
//         },
//       }
//     );


//     const accessToken =
//       response.data.access_token;


//     localStorage.setItem(
//       "access_token",
//       accessToken
//     );

//     setToken(accessToken);

//     return response.data;
//   };


//   const logout = () => {

//     localStorage.removeItem(
//       "access_token"
//     );

//     setToken(null);
//   };


//   const isAuthenticated =
//     Boolean(token);


//   const value = {
//     token,
//     login,
//     logout,
//     isAuthenticated,
//   };


//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

import {
  createContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";


export const AuthContext = createContext(null);


export function AuthProvider({ children }) {

  const [token, setToken] = useState(
    () => localStorage.getItem("access_token")
  );

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);


  // =====================================================
  // LOAD CURRENT USER
  // =====================================================

  const loadUser = async () => {

    const savedToken =
      localStorage.getItem("access_token");


    if (!savedToken) {

      setToken(null);
      setUser(null);
      setLoading(false);

      return;
    }


    try {

      const response = await api.get(
        "/auth/me"
      );


      setToken(savedToken);

      setUser(response.data);

    } catch (error) {

      console.error(
        "Failed to load user:",
        error
      );


      localStorage.removeItem(
        "access_token"
      );


      setToken(null);
      setUser(null);

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // LOGIN
  // =====================================================

  const login = async (
    username,
    password
  ) => {

    const formData =
      new URLSearchParams();


    formData.append(
      "username",
      username
    );


    formData.append(
      "password",
      password
    );


    const response = await api.post(
      "/auth/login",
      formData,
      {
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
      }
    );


    const accessToken =
      response.data.access_token;


    localStorage.setItem(
      "access_token",
      accessToken
    );


    setToken(accessToken);


    // Get username + role
    const userResponse =
      await api.get("/auth/me");


    setUser(
      userResponse.data
    );


    return response.data;
  };


  // =====================================================
  // LOGOUT
  // =====================================================

  const logout = () => {

    localStorage.removeItem(
      "access_token"
    );


    setToken(null);

    setUser(null);

  };


  // =====================================================
  // CHECK LOGIN
  // =====================================================

  const isAuthenticated =
    Boolean(token);


  // =====================================================
  // LOAD USER WHEN APP STARTS
  // =====================================================

  useEffect(() => {

    loadUser();

  }, []);


  // =====================================================
  // CONTEXT VALUE
  // =====================================================

  const value = {

    token,

    user,

    loading,

    login,

    logout,

    loadUser,

    isAuthenticated,

  };


  return (

    <AuthContext.Provider
      value={value}
    >

      {children}

    </AuthContext.Provider>

  );
}