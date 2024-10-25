import { Layout, Menu, Breadcrumb, Button } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  HomeOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import './dashboard.css';

const { Header, Content, Sider } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logic to handle logout (e.g., clear auth token)
    console.log("Logged out");
    navigate('/');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <div className="logo">MyDashboard</div>
        {/* Logout Button */}
        <Button
          type="primary"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          style={{ marginLeft: 'auto' }}
        >
          Logout
        </Button>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/dashboard/users">Users</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<LaptopOutlined />}>
              <Link to="/dashboard/projects">Projects</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<NotificationOutlined />}>
              <Link to="/dashboard/notifications">Notifications</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {/* This is where nested route content will be rendered */}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
