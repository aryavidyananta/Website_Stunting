import { Layout, Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  PlayCircleOutlined,
  EditOutlined,
  UserOutlined,
  ReadOutlined,
  DatabaseOutlined,
  FileOutlined,
  AppstoreAddOutlined,
  SettingOutlined,
  QuestionOutlined,
  EllipsisOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const MENU_CONFIG = [
  {
    title: 'Main Menu',
    items: [
      { key: '/dashboard', label: 'Dashboard', icon: <AppstoreOutlined />, path: '/dashboard' },
      { key: '/AdminPlaylistPost', label: 'Playlist', icon: <PlayCircleOutlined />, path: '/AdminPlaylistPost' },
      { key: '/Blog', label: 'Blog', icon: <EditOutlined />, path: '/Blog' },
      { key: '/Bidan', label: 'Data User', icon: <UserOutlined />, path: '/Bidan' },
    ],
  },
  {
    title: 'Team Management',
    items: [
      { key: '/Medis', label: 'Medis', icon: <ReadOutlined />, path: '/Medis' },
      { key: '/DataIntegrity', label: 'Data Integrity', icon: <DatabaseOutlined />, path: '/DataIntegrity' },
      { key: '/Report', label: 'Report', icon: <FileOutlined />, path: '/Report' },
      { key: '/Interoperability', label: 'Interoperability', icon: <AppstoreAddOutlined />, path: '/Interoperability' },
    ],
  },
  {
    title: 'Help & Setting',
    items: [
      { key: '/Help', label: 'Help & Center', icon: <QuestionOutlined />, path: '/Help' },
      { key: '/Settings', label: 'Settings', icon: <SettingOutlined />, path: '/Settings' },
    ],
  },
];

const MainSidebar = ({ collapsed, toggleSidebar }) => {
  const location = useLocation();

  const renderMenuItems = (items) =>
    items.map((item) => ({
      key: item.key,
      icon: item.icon,
      label: <Link to={item.path}>{item.label}</Link>,
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
        {!collapsed && <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#048ab3' }}>Healthcare</span>}
        <Button
          type="text"
          icon={<MenuOutlined style={{ fontSize: '18px' }} />}
          onClick={toggleSidebar}
          style={{ color: '#048ab3' }}
        />
      </div>

      {/* Menu Items */}
      {MENU_CONFIG.map((menuGroup, index) => (
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
