import { Breadcrumb, Card, Col, Layout, Row } from "antd";
import { Content } from "antd/es/layout/layout";

import {
  BookOpen,
  Briefcase,
  Github,
  LinkedinIcon,
  MapPin,
  Star,
  Twitter,
  User,
} from "lucide-react";
import React from "react";

const MainCenter = () => {
  const containerStyle = {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "15px",
  };

  const headerStyle = {
    backgroundColor: "#333",
    padding: "20px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "20px",
  };

  const cardStyle = {
    backgroundColor: '#389fbe',
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    textAlign: "center",
  };

  const statsContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginTop: "20px",
    
  };

  const profileHeaderStyle = {
    position: "relative",
    textAlign: "center",
    marginBottom: "20px",
    paddingBottom: "20px",
    borderBottom: "1px solid #333333",
  };

  const avatarStyle = {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    border: "4px solid #333",
    margin: "-60px auto 10px",
  };

  const socialIconStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "15px",
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={containerStyle}>
        {/* Breadcrumb */}
        <Breadcrumb style={{ marginBottom: "16px" }}>
          <Breadcrumb.Item>Profile</Breadcrumb.Item>
        </Breadcrumb>

        {/* Profile Header */}
        <div style={profileHeaderStyle}>
          <div style={{ height: "120px", background: "linear-gradient(to right, #2196f3, #673ab7)" }}></div>
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
            style={avatarStyle}
          />
          <h1>John Doe</h1>
          <p>
            <Briefcase style={{ marginRight: "5px" }} />
            Senior Software Engineer
          </p>
          <p>
            <MapPin style={{ marginRight: "5px" }} />
            San Francisco, CA
          </p>
        </div>

        {/* Stats Section */}
        <div style={statsContainerStyle}>
          <div style={cardStyle}>
            <div>
              <BookOpen style={{ color: "#333", fontSize: "24px", marginBottom: "10px" }} />
              <p>Projects</p>
              <h3>28</h3>
            </div>
          </div>
          <div style={cardStyle}>
            <div>
              <User style={{ color: "#333", fontSize: "24px", marginBottom: "10px" }} />
              <p>Followers</p>
              <h3>2.1k</h3>
            </div>
          </div>
          <div style={cardStyle}>
            <div>
              <Star style={{ color: "#333", fontSize: "24px", marginBottom: "10px" }} />
              <p>Rating</p>
              <h3>4.9</h3>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div style={{ ...cardStyle, marginTop: "20px" }}>
          <h2 style={{color: '#333'}}>About</h2>
          <p>
            Passionate software engineer with over 8 years of experience in
            full-stack development. Specialized in React, Node.js, and cloud
            architecture. Leading technical initiatives and mentoring junior
            developers.
          </p>
          {/* Social Links */}
          <div style={socialIconStyle}>
            <a href="#">
              <Github style={{ fontSize: "24px", color: "#333" }} />
            </a>
            <a href="#">
              <Twitter style={{ fontSize: "24px", color: "#333" }} />
            </a>
            <a href="#">
              <LinkedinIcon style={{ fontSize: "24px", color: "#333" }} />
            </a>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default MainCenter;
