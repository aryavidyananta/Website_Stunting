import { Layout, Input, Badge, Avatar, Dropdown, Menu as AntMenu } from 'antd';
import { BellOutlined, UserOutlined, SearchOutlined, LogoutOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProviders'; // Import AuthContext

const { Header } = Layout;

const AppHeader = ({ collapsed }) => {
  const { logout } = useContext(AuthContext); // Ambil fungsi logout dari AuthContext

  // User dropdown menu
  const userMenu = (
    <AntMenu>
      <AntMenu.Item key="1">Profile</AntMenu.Item>
      <AntMenu.Item key="2">Settings</AntMenu.Item>
      <AntMenu.Divider />
      <AntMenu.Item key="3" icon={<LogoutOutlined />} onClick={logout}>
        Logout
      </AntMenu.Item>
    </AntMenu>
  );

  return (
    <Header className='z-10'
      style={{
        position: 'fixed',
        top: 0,
        width: `calc(100% - ${collapsed ? 80 : 200}px)`,
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 16px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        transition: 'left 0.3s ease, width 0.3s ease',
        zIndex: 1000,
        
      }}
    >
      {/* Search Bar */}
      <Input
        placeholder="Search..."
        prefix={<SearchOutlined />}
        style={{
          maxWidth: 400,
          borderRadius: 25,
          padding: '8px 16px',
          border: '1px solid #d9d9d9',
        }}
      />

      {/* Notifications and User Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Badge count={5} offset={[5, 0]} size="small">
          <BellOutlined style={{ fontSize: '20px', color: '#048ab3', cursor: 'pointer' }} />
        </Badge>
        <Dropdown overlay={userMenu} trigger={['click']} placement="bottomRight">
          <Avatar
            style={{ backgroundColor: '#f0f2f5', cursor: 'pointer' }}
            icon={<UserOutlined />}
          />
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeader;
