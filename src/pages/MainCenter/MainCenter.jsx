import { Breadcrumb, Card, Layout } from "antd";
import CountUp from 'react-countup';
import { Content } from "antd/es/layout/layout";
import {
  User as UserIcon,
  Music as PlaylistIcon,
  FileText as BlogIcon,
  HeartPulse as MedisIcon,
  Cog,
  Github,
  Linkedin,
  MapPin,
  Twitter,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const AdminProfile = () => {
  const [stats, setStats] = useState({
    users: 0,
    playlists: 0,
    mediss: 0,
    blogs: 0,
  });
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userResponse = await fetch(`${API_BASE_URL}/api/v1/user/count_by_role/User`);
        const userData = await userResponse.json();

        const playlistResponse = await fetch(`${API_BASE_URL}/api/v1/playlist/count`);
        const playlistData = await playlistResponse.json();

        const medisResponse = await fetch(`${API_BASE_URL}/api/v1/medis/count`);
        const medisData = await medisResponse.json();

        const blogResponse = await fetch(`${API_BASE_URL}/api/v1/blog/count`);
        const blogData = await blogResponse.json();

        setStats({
          users: userData.total_users,
          playlists: playlistData.total_playlists,
          mediss: medisData.total_mediss,
          blogs: blogData.total_blogs,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const containerStyle = {
    backgroundColor: "#f0f8ff",
    padding: "32px",
    borderRadius: "20px",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "20px",
    paddingBottom: "20px",
    borderBottom: "2px solid #cce7ff",
  };

  const avatarStyle = {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    border: "5px solid #89c2d9",
    margin: "0 auto 20px",
  };

  const cardStyle = {
    backgroundColor: "#e3f2fd",
    borderRadius: "15px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    textAlign: "center",
  };

  const statsContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "24px",
    marginTop: "30px",
  };

  const sectionStyle = {
    marginTop: "30px",
    padding: "24px",
    backgroundColor: "#e3f2fd",
    borderRadius: "15px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const socialIconStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#e6f7ff" }}>
      <Content style={containerStyle}>
        {/* Breadcrumb */}
        <Breadcrumb style={{ marginBottom: "20px" }}>
          <Breadcrumb.Item>Admin Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Profile</Breadcrumb.Item>
        </Breadcrumb>

        {/* Profile Header */}
        <div style={headerStyle}>
          <img
            src="/images/logo_icon.svg"
            alt="Admin"
            style={avatarStyle}
          />
          <h1 style={{ color: "#007acc", marginBottom: "5px" }}>Admin POS</h1>
          <p style={{ color: "#555" }}>
            <Cog style={{ marginRight: "8px" }} /> System Administrator
          </p>
          <p style={{ color: "#555" }}>
            <MapPin style={{ marginRight: "8px" }} /> INDONESIA
          </p>
        </div>

        {/* Stats Section */}
        <div style={statsContainerStyle}>
          <div style={cardStyle}>
            <div>
              <UserIcon style={{ color: "#007acc", fontSize: "30px", marginBottom: "10px" }} />
              <p>Users</p>
              <h3 style={{ color: "#007acc" }}>
                <CountUp start={0} end={stats.users} duration={3.5} />
              </h3>
            </div>
          </div>
          <div style={cardStyle}>
            <div>
              <PlaylistIcon style={{ color: "#007acc", fontSize: "30px", marginBottom: "10px" }} />
              <p>Playlists</p>
              <h3 style={{ color: "#007acc" }}>
                <CountUp start={0} end={stats.playlists} duration={3.5} />
              </h3>
            </div>
          </div>
          <div style={cardStyle}>
            <div>
              <MedisIcon style={{ color: "#007acc", fontSize: "30px", marginBottom: "10px" }} />
              <p>Medis</p>
              <h3 style={{ color: "#007acc" }}>
                <CountUp start={0} end={stats.mediss} duration={3.5} />
              </h3>
            </div>
          </div>
          <div style={cardStyle}>
            <div>
              <BlogIcon style={{ color: "#007acc", fontSize: "30px", marginBottom: "10px" }} />
              <p>Blogs</p>
              <h3 style={{ color: "#007acc" }}>
                <CountUp start={0} end={stats.blogs} duration={3.5} />
              </h3>
            </div>
          </div>
        </div>


        {/* About Section */}
        <div style={sectionStyle}>
          <h2 style={{ color: "#007acc" }}>About</h2>
          <p style={{ color: "#555" }}>
          Kami adalah tim profesional kesehatan yang berdedikasi untuk melawan stunting dan mendukung pertumbuhan sehat anak-anak di seluruh Indonesia. Dengan komitmen penuh untuk menyediakan layanan berkualitas dan informasi yang dapat diakses, kami percaya bahwa setiap anak memiliki hak untuk tumbuh sehat dan berkembang sesuai potensinya.
          </p>
        </div>

        {/* Social Links */}
        <div style={sectionStyle}>
          <h2 style={{ color: "#007acc" }}>Connect with Me</h2>
          <div style={socialIconStyle}>
            <a href="#">
              <Twitter style={{ fontSize: "28px", color: "#007acc" }} />
            </a>
            <a href="#">
              <Linkedin style={{ fontSize: "28px", color: "#007acc" }} />
            </a>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default AdminProfile;
