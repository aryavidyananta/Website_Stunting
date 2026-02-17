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
        <AppHeader collapsed={collapsed} toggleSidebar={toggleSidebar} style={{
            position: 'fixed', // Header tetap di atas
            top: 0,
            left: collapsed ? '80px' : '220px', // Sinkron dengan sidebar
            width: collapsed ? 'calc(100% - 80px)' : 'calc(100% - 220px)', // Sesuaikan dengan lebar sidebar
            zIndex: 1000,
            transition: 'left 0.3s, width 0.3s', // Animasi untuk transisi
          }} />

        {/* Content */}
        <Content
           style={{
            marginTop: 64, // Memberi jarak untuk header (64px tinggi header)
            padding: 24,
            backgroundColor: '#fff',
          }}
        >
          {children}
          
        </Content>
      </Layout>
    </Layout>
  );
};

export default Main;
