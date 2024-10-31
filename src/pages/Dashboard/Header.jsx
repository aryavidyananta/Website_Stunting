// Header.js
import { Layout, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

const { Header } = Layout;

const AppHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logic to handle logout (e.g., clear auth token)
    console.log("Logged out");
    navigate('/');
  };

  return (
    <Header className="header">
      <div className="logo">MyDashboard</div>
      <Button
        type="primary"
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        style={{ marginLeft: 'auto' }}
      >
        Logout
      </Button>
    </Header>
  );
};

export default AppHeader;
