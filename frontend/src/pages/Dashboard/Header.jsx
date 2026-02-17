import { Layout, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Header } = Layout;

const AppHeader = ({ collapsed }) => {
  return (
    <Header
      className='z-10'
      style={{
        position: 'fixed',
        top: 0,
        width: `calc(100% - ${collapsed ? 80 : 200}px)`,
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        padding: '0 100px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        transition: 'left 0.3s ease, width 0.3s ease',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* Left Side Placeholder (Optional) */}
        <div style={{ flex: 1 }}></div>

        {/* Search Bar */}
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined />}
          style={{
            maxWidth: 500,
            width: '100%',
            borderRadius: 100,
            padding: '8px 16px',
            border: '1px solid #000',
            textAlign: 'center',
          }}
        />

        {/* Right Side Placeholder (Optional) */}
        <div style={{ flex: 1 }}></div>
      </div>
    </Header>
  );
};

export default AppHeader;
