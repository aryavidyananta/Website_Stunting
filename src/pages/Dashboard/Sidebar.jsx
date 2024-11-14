import { Layout, Menu } from 'antd';
import { 
  DashboardOutlined, 
  HeartOutlined, 
  MedicineBoxOutlined, 
  CalendarOutlined, 
  NotificationOutlined 
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider
      width={220}
      style={{
        backgroundColor: '#001529',
        color: 'white',
        height: '100vh', // Full height of the viewport
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100,
      }}
    >
      <div style={{ padding: '20px', color: '#fff', fontSize: '24px', fontWeight: 'bold' }}>
        ProHealth
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{
          height: '100%',
          borderRight: 0,
          backgroundColor: '#001529',
        }}
      >
        <Menu.Item key="1" icon={<DashboardOutlined />} style={{ color: '#fff' }}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<HeartOutlined />} style={{ color: '#fff' }}>
          <Link to="/dashboard/AdminPlaylistPost">Playlist</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<MedicineBoxOutlined />} style={{ color: '#fff' }}>
          <Link to="/dashboard/profile">Projects</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<CalendarOutlined />} style={{ color: '#fff' }}>
          <Link to="/dashboard/Testing">Testing</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<NotificationOutlined />} style={{ color: '#fff' }}>
          <Link to="/dashboard/notifications">Notifications</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
