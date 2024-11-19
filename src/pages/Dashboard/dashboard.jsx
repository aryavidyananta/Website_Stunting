import { Layout, Breadcrumb, Drawer, Card, Row, Col, Typography } from 'antd';
import { Outlet, useLocation, Link } from 'react-router-dom';
import AppHeader from './Header';
import Sidebar from './Sidebar';
import { TeamOutlined, WomanOutlined, ManOutlined, AlertOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const { Content } = Layout;
const { Title, Text } = Typography;

const Dashboard = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false); // Collapsed state for sidebar
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Data for the bar chart
  const barData = [
    { year: '2013', percent: 37 },
    { year: '2014', percent: 35 },
    { year: '2018', percent: 30 },
    { year: '2019', percent: 27 },
    { year: '2021', percent: 24 },
    { year: '2022', percent: 22 },
    { year: '2023', percent: 21 },
    { year: '2024', percent: 19 },
  ];

  // Data for the circular chart
  const circularData = [
    { name: 'Total', value: 30, color: '#8884d8' },
    { name: 'Absence', value: 20, color: '#FFBB28' },
    { name: 'Presence', value: 10, color: '#FF8042' },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setVisible(!visible);
    } else {
      setCollapsed(!collapsed); // Toggle collapsed state
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
      <AppHeader onMenuClick={toggleSidebar} />
      <Layout style={{ marginLeft: isMobile ? 0 : collapsed ? 80 : 220 }}>
        {isMobile ? (
          <Drawer
            title="Navigation"
            placement="left"
            onClose={toggleSidebar}
            visible={visible}
            bodyStyle={{ padding: 0 }}
          >
            <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
          </Drawer>
        ) : (
          <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
        )}
        <Layout
          style={{
            padding: '0 24px 24px',
            transition: 'margin-left 0.3s',
          }}
        >
          <Breadcrumb style={{ margin: '16px 0' }}>{breadcrumbItems}</Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              backgroundColor: '#fff',
              borderRadius: '8px',
            }}
          >
            {isDashboardHome && (
              <>
               {/* Statistic Cards */}
               <Row gutter={16} style={{ marginBottom: 24 }}>
                  {/* Total Balita */}
                  <Col xs={24} md={6}>
                    <Card style={{ backgroundColor: '#ff4d4f', color: 'white', borderRadius: '8px' }}>
                      <Row align="middle">
                        <Col span={16}>
                          <Title level={3} style={{ color: 'white' }}>21,6%</Title>
                          <Text>Pravelensi Stunting</Text>
                        </Col>
                        <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <TeamOutlined style={{ fontSize: '40px', color: 'white' }} />
                        </Col>
                      </Row>
                    </Card>
                  </Col>

                  {/* Perempuan */}
                  <Col xs={24} md={6}>
                    <Card style={{ backgroundColor: '#9254de', color: 'white', borderRadius: '8px' }}>
                      <Row align="middle">
                        <Col span={16}>
                          <Title level={3} style={{ color: 'white' }}>2,8%</Title>
                          <Text>Penurunan Prevalensi</Text>
                        </Col>
                        <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <WomanOutlined style={{ fontSize: '40px', color: 'white' }} />
                        </Col>
                      </Row>
                    </Card>
                  </Col>

                  {/* Laki-Laki */}
                  <Col xs={24} md={6}>
                    <Card style={{ backgroundColor: '#40a9ff', color: 'white', borderRadius: '8px' }}>
                      <Row align="middle">
                        <Col span={16}>
                          <Title level={3} style={{ color: 'white' }}>5,3 Juta</Title>
                          <Text>Jumlah Terdampak</Text>
                        </Col>
                        <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <ManOutlined style={{ fontSize: '40px', color: 'white' }} />
                        </Col>
                      </Row>
                    </Card>
                  </Col>

                  {/* Kasus Stunting */}
                  <Col xs={24} md={6}>
                    <Card style={{ backgroundColor: '#36cfc9', color: 'white', borderRadius: '8px' }}>
                      <Row align="middle">
                        <Col span={16}>
                          <Title level={3} style={{ color: 'white' }}>60%</Title>
                          <Text>Pendidikan Rendah</Text>
                        </Col>
                        <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <AlertOutlined style={{ fontSize: '40px', color: 'white' }} />
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
                {/* Statistic Cards */}
                <Row gutter={16} style={{ marginBottom: 24 }}>
                  {/* Your Card components */}
                </Row>
                <Row gutter={16}>
                  <Col xs={24} md={16}>
                    <Card title="Prevalensi Balita Stunting Indonesia (2013-2024*)" style={{ backgroundColor: '#f0f2f5', borderRadius: '8px' }}>
                      <div style={{ width: '100%', height: 400 }}>
                        <ResponsiveContainer>
                          <BarChart data={barData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis label={{ value: 'percent', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Bar dataKey="percent" fill="#8884d8" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </Card>
                  </Col>
                  <Col xs={24} md={8}>
                    <Card title="Riwayat Cek Stunting" style={{ backgroundColor: '#f0f2f5', borderRadius: '8px' }}>
                      <div style={{ width: '100%', height: 250 }}>
                        <ResponsiveContainer>
                          <PieChart>
                            <Pie data={circularData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>
                              {circularData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend layout="vertical" align="right" verticalAlign="middle" />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </>
            )}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
