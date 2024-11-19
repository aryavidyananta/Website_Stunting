import { Layout, Input, Badge, Avatar, Dropdown, Menu as AntMenu } from 'antd';
import { BellOutlined, UserOutlined, SearchOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const AppHeader = ({ collapsed, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); // Navigasi ke halaman login
  };

  const userMenu = (
    <AntMenu>
      <AntMenu.Item key="1">Profile</AntMenu.Item>
      <AntMenu.Item key="2">Settings</AntMenu.Item>
      <AntMenu.Divider />
      <AntMenu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </AntMenu.Item>
    </AntMenu>
  );

  return (
    <Header
      style={{
        padding: '0 16px',
        paddingLeft: collapsed ? 80 : 220,
        backgroundColor: '#ffffff',
        color: '#048ab3',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'padding-left 0.3s',
        // Updated boxShadow to match the style in the provided image
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px', // Optional: Rounded corners
      }}
    >
      {/* Centered Search Input */}
      <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined style={{ color: '#048ab3' }} />}
          style={{
            width: 320,
            borderRadius: 25,
            padding: '8px 16px',
            border: '1px solid #d9d9d9',
            outline: 'none',
            boxShadow: 'none', // No shadow for search
            transition: 'all 0.3s ease-in-out',
          }}
          onFocus={(e) => e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'}
          onBlur={(e) => e.target.style.boxShadow = 'none'}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <Badge count={5} offset={[-2, 10]}>
          <BellOutlined
            style={{
              fontSize: 24,
              color: '#048ab3',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
        </Badge>

        <Dropdown overlay={userMenu} trigger={['click']}>
          <Avatar
            style={{
              backgroundColor: '#f0f2f5',
              cursor: 'pointer',
              border: '2px solid #048ab3',
              transition: 'transform 0.3s ease',
            }}
            icon={<UserOutlined />}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeader;
