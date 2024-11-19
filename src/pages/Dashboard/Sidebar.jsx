import { Layout, Menu, Button } from 'antd';
import { 
  DashboardOutlined, 
  HeartOutlined, 
  MedicineBoxOutlined, 
  CalendarOutlined, 
  NotificationOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider
      width={220}
      collapsible
      collapsed={collapsed}
      trigger={null}
      style={{
        backgroundColor: '#0D1B2A', // Dark background color for contrast
        color: '#E0E1DD', // Light text color for visibility
        height: '100vh', // Full height of the viewport
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100,
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
      }}
    >
      {/* Logo and Toggle Button */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '20px',
        justifyContent: 'space-between',
        color: '#E0E1DD', // Lighter color for logo
        fontSize: '24px',
        fontWeight: 'bold',
        backgroundColor: '#1B263B', // Slightly lighter background for the logo area
      }}>
        {!collapsed && <span>ProHealth</span>}
        <Button 
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} 
          onClick={toggleCollapse}
          style={{
            backgroundColor: 'transparent',
            color: '#E0E1DD',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
          }}
        />
      </div>

      {/* Sidebar Menu */}
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{
          height: '100%',
          borderRight: 0,
          backgroundColor: '#0D1B2A',
          color: '#E0E1DD',
        }}
        theme="dark"
      >
        <Menu.Item 
          key="1" 
          icon={<DashboardOutlined />} 
          style={{ 
            color: '#E0E1DD', 
            fontSize: '16px',
            borderRadius: '8px', // Rounded corners
            margin: '4px 0', // Space between items
          }}
        >
          <Link to="/dashboard" style={{ color: 'inherit' }}>Dashboard</Link>
        </Menu.Item>
        
        <Menu.Item 
          key="2" 
          icon={<HeartOutlined />} 
          style={{ 
            color: '#E0E1DD', 
            fontSize: '16px',
            borderRadius: '8px',
            margin: '4px 0',
          }}
        >
          <Link to="/dashboard/AdminPlaylistPost" style={{ color: 'inherit' }}>Playlist</Link>
        </Menu.Item>
        
        <Menu.Item 
          key="3" 
          icon={<MedicineBoxOutlined />} 
          style={{ 
            color: '#E0E1DD', 
            fontSize: '16px',
            borderRadius: '8px',
            margin: '4px 0',
          }}
        >
          <Link to="/dashboard/profile" style={{ color: 'inherit' }}>Blog</Link>
        </Menu.Item>
        
        <Menu.Item 
          key="4" 
          icon={<CalendarOutlined />} 
          style={{ 
            color: '#E0E1DD', 
            fontSize: '16px',
            borderRadius: '8px',
            margin: '4px 0',
          }}
        >
          <Link to="/dashboard/Testing" style={{ color: 'inherit' }}>Kalkulator</Link>
        </Menu.Item>
        
        <Menu.Item 
          key="5" 
          icon={<NotificationOutlined />} 
          style={{ 
            color: '#E0E1DD', 
            fontSize: '16px',
            borderRadius: '8px',
            margin: '4px 0',
          }}
        >
          <Link to="/dashboard/Bidan" style={{ color: 'inherit' }}>Data User</Link>
        </Menu.Item>

        <Menu.Item 
          key="6" 
          icon={<NotificationOutlined />} 
          style={{ 
            color: '#E0E1DD', 
            fontSize: '16px',
            borderRadius: '8px',
            margin: '4px 0',
          }}
        >
          <Link to="/dashboard/DataAnak" style={{ color: 'inherit' }}>Data Anak</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
