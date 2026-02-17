import { useState, useContext } from "react";
import { notification, Input } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";
import "./login.css";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

const LoginPage = () => {
  const [signIn, setSignIn] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const { login, isLoggedIn, userProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  if (isLoggedIn) {
    return (
      <Navigate
        to={userProfile.roles === "Admin" ? "/dashboard" : "/"}
        replace
      />
    );
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (signIn) {
      if (!formData.username) newErrors.username = "Username is required";
      if (!formData.password) newErrors.password = "Password is required";
    } else {
      if (!formData.username) newErrors.username = "Name is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.password) newErrors.password = "Password is required";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuth = async (e, type) => {
    e.preventDefault();
    if (!validateForm()) return;

    const url =
      type === "login"
        ? `${API_BASE_URL}/api/v1/auth/login`
        : `${API_BASE_URL}/api/v1/auth/register`;

    const body = new URLSearchParams(
      type === "login"
        ? {
          username: formData.username,
          password: formData.password,
        }
        : {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          roles: "User",
        }
    );

    console.log("Body being sent:", Object.fromEntries(body));

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      const data = await response.json();

      if (response.ok) {
        if (type === "login") {
          login(data.access_token);
          notification.success({
            message: "Login Successful",
            description: "Welcome to the dashboard.",
          });
          navigate("/dashboard");
        } else {
          notification.success({
            message: "Registration Successful",
            description: "You can now sign in.",
          });
          setSignIn(true);
        }
      } else {
        notification.error({
          message: type === "login" ? "Login Failed" : "Registration Failed",
          description: data.msg || "An error occurred, please try again.",
        });
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      notification.error({
        message: "Authentication Failed",
        description: "An error occurred. Please try again later.",
      });
    }
  };

  return (
    <div className="bodysignin">
      <div className={`containersignin ${signIn ? "" : "right-panel-active"}`}>
        {/* Sign Up Form */}
        <div className="form-containersignin signUpContainersignin">
          <form
            className="formsignin"
            onSubmit={(e) => handleAuth(e, "register")}
          >
            <h1 className="signinTitlesignin">Create Account</h1>

            <input
              type="text"
              name="username"
              placeholder="Name"
              className="inputsignin"
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.username && (
              <span className="error-message">{errors.username}</span>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="inputsignin"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}

            <Input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="inputsignin"
              value={formData.password}
              onChange={handleInputChange}
              suffix={
                passwordVisible ? (
                  <EyeInvisibleOutlined
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  />
                ) : (
                  <EyeOutlined
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  />
                )
              }
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}

            <Input
              type={confirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="inputsignin"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              suffix={
                confirmPasswordVisible ? (
                  <EyeInvisibleOutlined
                    onClick={() =>
                      setConfirmPasswordVisible(!confirmPasswordVisible)
                    }
                  />
                ) : (
                  <EyeOutlined
                    onClick={() =>
                      setConfirmPasswordVisible(!confirmPasswordVisible)
                    }
                  />
                )
              }
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}

            <button className="buttonsignin">Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-containersignin signInContainersignin">
          <form className="formsignin" onSubmit={(e) => handleAuth(e, "login")}>
            <h1 className="signinTitlesignin">Sign in</h1>

            <input
              type="text"
              name="username"
              placeholder="Username"
              className="inputsignin"
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.username && (
              <span className="error-message">{errors.username}</span>
            )}

            <Input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="inputsignin"
              value={formData.password}
              onChange={handleInputChange}
              suffix={
                passwordVisible ? (
                  <EyeInvisibleOutlined
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  />
                ) : (
                  <EyeOutlined
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  />
                )
              }
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}

            <a href="#" className="anchorsignin">
              Forgot your password?
            </a>
            <button className="buttonsignin">Sign In</button>
          </form>
        </div>

        {/* Overlay */}
        <div className="overlayContainersignin">
          <div className="overlaysignin">
            <div className="overlayPanelsignin leftOverlayPanelsignin">
              <img
                src="/images/logo_icon.svg"
                alt="Logo Icon"
                className="logoIcon"
              />
              <h1 className="signinTitlesignin">Welcome Back!</h1>
              <p className="paragraphsignin">
                To keep connected with us, please login with your personal info.
              </p>
              <button
                className="ghostButtonsignin buttonsignin"
                onClick={() => setSignIn(true)}
              >
                Sign In
              </button>
            </div>

            <div className="overlayPanelsignin rightOverlayPanelsignin">
              <img
                src="/images/logo_icon.svg"
                alt="Logo Icon"
                className="logoIcon"
              />
              <h1 className="signinTitlesignin">Hello!</h1>
              <p className="paragraphsignin">
                Enter your personal details and start your journey with us.
              </p>
              <button
                className="ghostButtonsignin buttonsignin"
                onClick={() => setSignIn(false)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
