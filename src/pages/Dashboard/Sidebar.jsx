// Sidebar.js
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './dashboard.css';

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/dashboard/AdminPlaylistPost">Admin</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<LaptopOutlined />}>
          <Link to="/dashboard/profile">Projects</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<NotificationOutlined />}>
          <Link to="/dashboard/notifications">Notifications</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
