import { useState } from 'react';
import { Layout } from 'antd';

import AppHeader from './Header';
import MainSidebar from './Sidebar';
// import Sidebar from './Sidebar'; // Import Sidebar component
// import AppHeader from './AppHeader'; // Import Header component

const { Content } = Layout;

const Main = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <MainSidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />

      {/* Main Layout */}
      <Layout
        style={{
          marginLeft: collapsed ? '80px' : '220px',
          transition: 'margin-left 0.3s',
        }}
      >
        {/* Header */}
        <AppHeader collapsed={collapsed} toggleSidebar={toggleSidebar} />

        {/* Content */}
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            backgroundColor: '#FFD700',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Main;
