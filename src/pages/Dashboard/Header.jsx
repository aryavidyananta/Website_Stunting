import { Layout, Button, Input, Dropdown, Menu, Badge } from 'antd';
import { LogoutOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const AppHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logged out");
    navigate('/');
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="1">
        <a href="/profile">Profile</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href="/settings">Settings</a>
      </Menu.Item>
      <Menu.Item key="3" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 24px',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        height: '64px',
        width: '100%',
        maxWidth: '100vw', // Ensure it fits within the viewport
      }}
    >
      {/* Logo Section */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/logo.png" alt="Logo" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
        <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>Velonic</span>
      </div>

      {/* Search Input */}
      <div style={{ flexGrow: 1, marginLeft: '16px', maxWidth: '300px', display: 'block' }}>
        <Input
          placeholder="Search..."
          prefix={<i className="fas fa-search"></i>}
          style={{
            width: '100%',
            borderRadius: '20px',
            paddingLeft: '30px',
          }}
        />
      </div>

      {/* User Profile and Actions */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
      
        <Dropdown overlay={userMenu} trigger={['click']}>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <UserOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <span style={{ fontSize: '16px', marginLeft: '10px' }}>Arya</span>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeader;
