import React, { useState } from "react";
import { notification } from 'antd';
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import "./login.css";

const LoginPage = () => {
  const [signIn, setSignIn] = useState(true);
  const [formData, setFormData] = useState({ nama: "", Email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (signIn) {
      if (!formData.Email) newErrors.Email = "Email is required";
      if (!formData.password) newErrors.password = "Password is required";
    } else {
      if (!formData.nama) newErrors.nama = "Name is required";
      if (!formData.Email) newErrors.Email = "Email is required";
      if (!formData.password) newErrors.password = "Password is required";
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAuth = async (e, type) => {
    e.preventDefault();
    if (!validateForm()) return;

    const url = type === "login" ? "http://192.168.18.100:5000/api/v1/auth/login" : "http://192.168.18.100:5000/api/v1/auth/register";
    const body = new URLSearchParams(type === "login"
      ? { Email: formData.Email, password: formData.password }
      : { nama: formData.nama, Email: formData.Email, password: formData.password, Roles: "User" });

    try {
      const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
      const data = await response.json();
      if (response.ok) {
        if (type === "login") {
          localStorage.setItem('access_token', data.access_token);
          notification.success({ message: 'Login Successful', description: 'Welcome to the dashboard.' });
          navigate(data.roles === 'Admin' ? "/dashboard" : "/", { replace: true });
        } else {
          notification.success({ message: 'Registration Successful', description: 'You can now sign in.' });
          setSignIn(true);
        }
      } else {
        notification.error({ message: type === "login" ? 'Login Failed' : 'Registration Failed', description: data.msg || 'Please try again.' });
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  return (
    <div className="bodysignin">
      <div className={`containersignin ${signIn ? "" : "right-panel-active"}`}>
        
        {/* Sign Up Form */}
        <div className="form-containersignin signUpContainersignin">
          <form className="formsignin" onSubmit={(e) => handleAuth(e, "register")}>
            <h1 className="signinTitlesignin">Create Account</h1>
            <input type="text" name="nama" placeholder="Name" className="inputsignin" value={formData.nama} onChange={handleInputChange} />
            {errors.nama && <span className="error-message">{errors.nama}</span>}
            <input type="email" name="Email" placeholder="Email" className="inputsignin" value={formData.Email} onChange={handleInputChange} />
            {errors.Email && <span className="error-message">{errors.Email}</span>}
            <Input type={passwordVisible ? "text" : "password"} name="password" placeholder="Password" className="inputsignin" value={formData.password} onChange={handleInputChange} suffix={passwordVisible ? <EyeInvisibleOutlined onClick={() => setPasswordVisible(!passwordVisible)} /> : <EyeOutlined onClick={() => setPasswordVisible(!passwordVisible)} />} />
            {errors.password && <span className="error-message">{errors.password}</span>}
            <Input type={confirmPasswordVisible ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" className="inputsignin" value={formData.confirmPassword} onChange={handleInputChange} suffix={confirmPasswordVisible ? <EyeInvisibleOutlined onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} /> : <EyeOutlined onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} />} />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            <button className="buttonsignin">Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-containersignin signInContainersignin">
          <form className="formsignin" onSubmit={(e) => handleAuth(e, "login")}>
            <h1 className="signinTitlesignin">Sign in</h1>
            <input type="email" name="Email" placeholder="Email" className="inputsignin" value={formData.Email} onChange={handleInputChange} />
            {errors.Email && <span className="error-message">{errors.Email}</span>}
            <Input type={passwordVisible ? "text" : "password"} name="password" placeholder="Password" className="inputsignin" value={formData.password} onChange={handleInputChange} suffix={passwordVisible ? <EyeInvisibleOutlined onClick={() => setPasswordVisible(!passwordVisible)} /> : <EyeOutlined onClick={() => setPasswordVisible(!passwordVisible)} />} />
            {errors.password && <span className="error-message">{errors.password}</span>}
            <a href="#" className="anchorsignin">Forgot your password?</a>
            <button className="buttonsignin">Sign In</button>
          </form>
        </div>

        {/* Overlay */}
        <div className="overlayContainersignin">
          <div className="overlaysignin">
            <div className="overlayPanelsignin leftOverlayPanelsignin">
              <h1 className="signinTitlesignin">Welcome Back!</h1>
              <p className="paragraphsignin">To keep connected with us, please login with your personal info.</p>
              <button className="ghostButtonsignin buttonsignin" onClick={() => setSignIn(true)}>Sign In</button>
            </div>
            <div className="overlayPanelsignin rightOverlayPanelsignin">
              <h1 className="signinTitlesignin">Hello!</h1>
              <p className="paragraphsignin">Enter your personal details and start your journey with us.</p>
              <button className="ghostButtonsignin buttonsignin" onClick={() => setSignIn(false)}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
