/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getDataPrivate } from "../utils/api";
import { jwtStorage } from "../utils/jwt_storage";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with your logic
  const [userProfile, setUserProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const getDataProfile = () => {
    setIsLoading(true);
    getDataPrivate("/api/v1/protected/data")
      .then((resp) => {
        if (resp?.user_logged) {
          console.log(resp);
          setUserProfile(resp);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        setIsLoggedIn(false);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getDataProfile();
  }, []);

  const login = async (access_token) => {
    console.log('Login jalan')
    let decoded = jwtDecode(access_token);
    console.log('ini decode', decoded);
    // Simpan token ke storage
    jwtStorage.storeToken(access_token);
    

    try {
      // Ambil data profil pengguna
      getDataProfile(); // Pastikan fungsi ini mengembalikan data profil

      // Periksa peran pengguna dan arahkan ke rute yang sesuai
      if (decoded.roles === "Admin") {
        navigate("/dashboard", { replace: true });
      } else if (decoded.roles === "User") {
        navigate("/", { replace: true });
      } else {
        console.warn("Role not recognized:", decoded.roles);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      // Tangani kesalahan, misalnya dengan menampilkan pesan kesalahan
    }
  };

  const logout = () => {
    jwtStorage.removeItem();
    setIsLoggedIn(false);
    setUserProfile({});
    navigate("/", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userProfile,  }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
