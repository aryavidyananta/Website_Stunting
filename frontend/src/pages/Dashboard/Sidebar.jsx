import { Layout, Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  PlayCircleOutlined,
  EditOutlined,
  UserOutlined,
  ReadOutlined,
  SettingOutlined,
  QuestionOutlined,
  EllipsisOutlined,
  MenuOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProviders';
import { useContext } from 'react';

const { Sider } = Layout;

const MENU_CONFIG = [
  {
    title: 'Main Menu',
    items: [
      { key: '/dashboard', label: 'Dashboard', icon: <AppstoreOutlined />, path: '/dashboard' },
      { key: '/AdminPlaylistPost', label: 'Playlist', icon: <PlayCircleOutlined />, path: '/AdminPlaylistPost' },
      { key: '/MainBlog', label: 'Blog', icon: <EditOutlined />, path: '/MainBlog' },
    ],
  },
  {
    title: 'Team Management',
    items: [
      { key: '/Medis', label: 'Medis', icon: <ReadOutlined />, path: '/Medis' },
      { key: '/Bidan', label: 'Data User', icon: <UserOutlined />, path: '/Bidan' },
    ],
  },
  {
    title: 'Help & Setting',
    items: [
      { key: '/MainProfile', label: 'Help & Center', icon: <QuestionOutlined />, path: '/MainProfile' },
      { key: '/MainCenter', label: 'Settings', icon: <SettingOutlined />, path: '/MainCenter' },
      {
        key: 'logout',
        label: 'Logout',
        icon: <CloseOutlined />,
        onClick: 'logout', // Placeholder for logout function
      },
    ],
  },
];

const MainSidebar = ({ collapsed, toggleSidebar }) => {
  const location = useLocation();
  const { logout } = useContext(AuthContext); // Ambil fungsi logout dari AuthContext

  // Update MENU_CONFIG dengan fungsi logout
  const updatedMenuConfig = MENU_CONFIG.map((menuGroup) => ({
    ...menuGroup,
    items: menuGroup.items.map((item) =>
      item.key === 'logout' ? { ...item, onClick: logout } : item
    ),
  }));

  // Render menu items dengan mempertimbangkan path atau onClick
  const renderMenuItems = (items) =>
    items.map((item) => ({
      key: item.key,
      icon: item.icon,
      label: item.onClick ? (
        <span onClick={item.onClick} style={{ cursor: 'pointer' }}>
          {item.label}
        </span>
      ) : (
        <Link to={item.path}>{item.label}</Link>
      ),
    }));

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={220}
      collapsedWidth={80}
      style={{
        backgroundColor: '#fff',
        height: '100vh',
        position: 'fixed',
        left: 0,
        zIndex: 100,
        overflowY: 'auto',
        boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Sidebar Header */}
      <div
        style={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          padding: '0 16px',
          backgroundColor: '#f0f2f5',
          borderBottom: '1px solid #ddd',
        }}
      >
        {!collapsed && <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#048ab3' }}>Admin POS</span>}
        <Button
          type="text"
          icon={<MenuOutlined style={{ fontSize: '18px' }} />}
          onClick={toggleSidebar}
          style={{ color: '#048ab3' }}
        />
      </div>

      {/* Menu Items */}
      {updatedMenuConfig.map((menuGroup, index) => (
        <div key={index}>
          <div style={{ padding: '16px 16px 8px' }}>
            {collapsed ? (
              <EllipsisOutlined style={{ fontSize: '16px', color: '#888' }} />
            ) : (
              <h3 style={{ fontSize: '12px', color: '#888', marginBottom: 8 }}>{menuGroup.title}</h3>
            )}
          </div>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            style={{
              backgroundColor: '#fff',
              color: '#333',
              borderRight: 0,
            }}
            items={renderMenuItems(menuGroup.items)}
          />
        </div>
      ))}
    </Sider>
  );
};

export default MainSidebar;
