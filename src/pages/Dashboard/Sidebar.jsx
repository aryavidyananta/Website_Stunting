import { Layout, Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  PlayCircleOutlined,
  EditOutlined,
  CalculatorOutlined,
  UserOutlined,
  TeamOutlined,
  ReadOutlined,
  MenuOutlined
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const menuItems = [
  { key: '/dashboard', label: 'Dashboard', icon: <AppstoreOutlined />, path: '/dashboard' },
  { key: '/dashboard/AdminPlaylistPost', label: 'Playlist', icon: <PlayCircleOutlined />, path: '/dashboard/AdminPlaylistPost' },
  { key: '/dashboard/Blog', label: 'Blog', icon: <EditOutlined />, path: '/dashboard/Blog' },
  // { key: '/dashboard/Testing', label: 'Kalkulator', icon: <CalculatorOutlined />, path: '/dashboard/Testing' },
  { key: '/dashboard/Bidan', label: 'Data User', icon: <UserOutlined />, path: '/dashboard/Bidan' },
  // { key: '/dashboard/Artikel', label: 'Artikel', icon: <ReadOutlined />, path: '/dashboard/Artikel' },
  { key: '/dashboard/Medis', label: 'Medis', icon: <ReadOutlined />, path: '/dashboard/Medis' },
];

const Sidebar = ({ collapsed, toggleSidebar }) => {
  const location = useLocation();

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={220}
      collapsedWidth={80}
      style={{
        backgroundColor: '#048ab3', // Menggunakan warna solid #048ab3
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100,
        overflow: 'auto',
      }}
    >
      <div
        style={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          padding: '0 16px',
          backgroundColor: '#048ab3', // Warna solid biru
          color: '#fff',
        }}
      >
        {!collapsed && <span>POS</span>}
        <Button
          type="text"
          icon={collapsed ? <MenuOutlined /> : <MenuOutlined />}
          onClick={toggleSidebar}
          style={{ color: '#fff' }}
        />
      </div>
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={[location.pathname]}
        style={{
          backgroundColor: '#048ab3', // Gunakan warna solid #048ab3
          color: '#E0E1DD',
          borderRight: 0,
        }}
      >
        {menuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.path}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
