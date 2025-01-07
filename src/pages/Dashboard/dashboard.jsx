import React, { useState, useEffect, useMemo } from 'react';
import { Layout, Breadcrumb, Drawer, Card, Row, Col, Typography } from 'antd';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { TeamOutlined, AlertOutlined } from '@ant-design/icons';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

const Dashboard = ({ children }) => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const barData = useMemo(
    () => [
      { year: '2013', percent: 37 },
      { year: '2014', percent: 35 },
      { year: '2018', percent: 30 },
      { year: '2019', percent: 27 },
      { year: '2021', percent: 24 },
      { year: '2022', percent: 22 },
      { year: '2023', percent: 21 },
      { year: '2024', percent: 19 },
    ],
    []
  );

  const circularData = useMemo(
    () => [
      { name: 'Total', value: 30, color: '#8884d8' },
      { name: 'Absence', value: 20, color: '#FFBB28' },
      { name: 'Presence', value: 10, color: '#FF8042' },
    ],
    []
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setVisible(!visible);
    if (!isMobile) {
      setCollapsed(!collapsed);
    }
  };

  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const breadcrumbItems = pathSnippets.map((snippet, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{snippet.charAt(0).toUpperCase() + snippet.slice(1)}</Link>
      </Breadcrumb.Item>
    );
  });

  const isDashboardHome = location.pathname === '/dashboard';

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar (Only visible on desktop, hidden on mobile) */}
      {/* {!isMobile && (
        <Sidebar
          collapsed={collapsed}
          toggleSidebar={toggleSidebar}
          style={{
            position: 'fixed',
            height: '100vh',
            zIndex: 999,
            left: 0,
          }}
        />
      )} */}

      {/* Drawer (Sidebar on mobile) */}
      {/* {isMobile && (
        <Drawer
          title="Navigation"
          placement="left"
          onClose={toggleSidebar}
          visible={visible}
          bodyStyle={{ padding: 0 }}
        >
          <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
        </Drawer>
      )} */}

      {/* Main Layout (Header + Content) */}
      <Layout
        style={{
          marginLeft: isMobile ? 0 : collapsed ? 80 : 220, // Sync with Sidebar width
          transition: 'margin-left 0.3s',
        }}
      >
        {/* Header (Only visible on desktop, hidden on mobile) */}
        {/* {!isMobile && (
          <AppHeader
            style={{
              position: 'fixed',
              top: 0,
              left: isMobile ? 0 : collapsed ? 80 : 220, // Sync with Sidebar width
              width: isMobile ? '100%' : `calc(100% - ${collapsed ? 80 : 220}px)`, // Adjust width based on sidebar
              zIndex: 1000,
              transition: 'left 0.3s, width 0.3s',
            }}
            onMenuClick={toggleSidebar}
          />
        )} */}

        {/* Content Area */}
        <Content
          style={{
            marginTop: isMobile ? 0 : 64, // Leave space for the fixed header on desktop
            padding: 24,
            backgroundColor: '#fff',
            minHeight: 'calc(100vh - 64px)', // Adjust height based on header
          }}
        >
          {/* Breadcrumb */}
          <Breadcrumb style={{ marginBottom: 16 }}>{breadcrumbItems}</Breadcrumb>

          {/* Dashboard Content */}
          {isDashboardHome && (
            <>
              {/* Statistic Cards */}
              <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col xs={24} md={6}>
                  <Card
                    style={{
                      backgroundColor: '#ff4d4f',
                      color: 'white',
                      borderRadius: '8px',
                    }}
                  >
                    <Row align="middle">
                      <Col span={16}>
                        <Title level={3} style={{ color: 'white' }}>
                          21,6%
                        </Title>
                        <Text>Prevelensi Stunting</Text>
                      </Col>
                      <Col span={8}>
                        <TeamOutlined style={{ fontSize: '40px', color: 'white' }} />
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col xs={24} md={6}>
                  <Card
                    style={{
                      backgroundColor: '#9254de',
                      color: 'white',
                      borderRadius: '8px',
                    }}
                  >
                    <Row align="middle">
                      <Col span={16}>
                        <Title level={3} style={{ color: 'white' }}>
                          2,8%
                        </Title>
                        <Text>Penurunan Prevalensi</Text>
                      </Col>
                      <Col span={8}>
                        <TeamOutlined style={{ fontSize: '40px', color: 'white' }} />
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col xs={24} md={6}>
                  <Card
                    style={{
                      backgroundColor: '#40a9ff',
                      color: 'white',
                      borderRadius: '8px',
                    }}
                  >
                    <Row align="middle">
                      <Col span={16}>
                        <Title level={3} style={{ color: 'white' }}>
                          5,3 Juta
                        </Title>
                        <Text>Jumlah Terdampak</Text>
                      </Col>
                      <Col span={8}>
                        <TeamOutlined style={{ fontSize: '40px', color: 'white' }} />
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col xs={24} md={6}>
                  <Card
                    style={{
                      backgroundColor: '#36cfc9',
                      color: 'white',
                      borderRadius: '8px',
                    }}
                  >
                    <Row align="middle">
                      <Col span={16}>
                        <Title level={3} style={{ color: 'white' }}>
                          60%
                        </Title>
                        <Text>Pendidikan Rendah</Text>
                      </Col>
                      <Col span={8}>
                        <AlertOutlined style={{ fontSize: '40px', color: 'white' }} />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>

              {/* Charts */}
              <Row gutter={16}>
                <Col xs={24} md={16}>
                  <Card title="Prevalensi Balita Stunting Indonesia (2013-2024*)">
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={barData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="percent" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>
                <Col xs={24} md={8}>
                  <Card title="Riwayat Cek Stunting">
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={circularData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                        >
                          {circularData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend layout="vertical" align="right" verticalAlign="middle" />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>
              </Row>
            </>
          )}
          {children}
        </Content>

        {/* Footer */}
        <Footer style={{ textAlign: 'center' }}>© 2025 Your Company Name. All Rights Reserved.</Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
