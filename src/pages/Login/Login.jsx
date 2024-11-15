import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import "./login.css";

const LoginPage = () => {
  const [signIn, setSignIn] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (signIn) {
      if (!formData.email) {
        newErrors.email = "Email is required";
        isValid = false;
      }
      if (!formData.password) {
        newErrors.password = "Password is required";
        isValid = false;
      }
    } else {
      if (!formData.name) {
        newErrors.name = "Name is required";
        isValid = false;
      }
      if (!formData.email) {
        newErrors.email = "Email is required";
        isValid = false;
      }
      if (!formData.password) {
        newErrors.password = "Password is required";
        isValid = false;
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate("/dashboard", { replace: true });
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSignIn(true);
    }
  };

  return (
    <div className="bodysignin">
      <div className={`containersignin ${signIn ? "" : "right-panel-active"}`}>
        <div className="form-containersignin signUpContainersignin">
          <form className="formsignin" onSubmit={handleSignUp}>
            <h1 className="signinTitlesignin">Create Account</h1>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="inputsignin"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="inputsignin"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
            <Input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="inputsignin"
              value={formData.password}
              onChange={handleInputChange}
              suffix={
                passwordVisible ? (
                  <EyeInvisibleOutlined onClick={() => setPasswordVisible(!passwordVisible)} />
                ) : (
                  <EyeOutlined onClick={() => setPasswordVisible(!passwordVisible)} />
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
                  <EyeInvisibleOutlined onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} />
                ) : (
                  <EyeOutlined onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} />
                )
              }
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
            <button className="buttonsignin">Sign Up</button>
          </form>
        </div>

        <div className="form-containersignin signInContainersignin">
          <form className="formsignin" onSubmit={handleLogin}>
            <h1 className="signinTitlesignin">Sign in</h1>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="inputsignin"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
            <Input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="inputsignin"
              value={formData.password}
              onChange={handleInputChange}
              suffix={
                passwordVisible ? (
                  <EyeInvisibleOutlined onClick={() => setPasswordVisible(!passwordVisible)} />
                ) : (
                  <EyeOutlined onClick={() => setPasswordVisible(!passwordVisible)} />
                )
              }
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
            <a href="#" className="anchorsignin">
              Forgot your password?
            </a>
            <button className="buttonsignin" onClick={handleLogin}>
              Sign In
            </button>
          </form>
        </div>

        <div className="overlayContainersignin">
          <div className="overlaysignin">
            <div className="overlayPanelsignin leftOverlayPanelsignin">
              <h1 className="signinTitlesignin">Welcome Back!</h1>
              <p className="paragraphsignin">
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghostButtonsignin buttonsignin"
                onClick={() => setSignIn(true)}
              >
                Sign In
              </button>
            </div>

            <div className="overlayPanelsignin rightOverlayPanelsignin">
              <h1 className="signinTitlesignin">Hello, Friend!</h1>
              <p className="paragraphsignin">
                Enter your personal details and start journey with us
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
