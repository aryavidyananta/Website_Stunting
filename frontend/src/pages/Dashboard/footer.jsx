import { Layout } from 'antd';

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer style={{
      textAlign: 'center',
      padding: '16px',
      backgroundColor: '#fff',
      boxShadow: '0 -1px 4px rgba(0,21,41,.08)'
    }}>
      Healthcare System ©{new Date().getFullYear()} Created by Your Name
    </Footer>
  );
};

export default AppFooter;