import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Layout, Breadcrumb, Card, Row, Col, Typography } from 'antd';
import { TeamOutlined, AlertOutlined } from '@ant-design/icons';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const { Content, Footer } = Layout;
const { Title, Text } = Typography;

const Dashboard = () => {
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

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content
        style={{   
          backgroundColor: '#808080',
          padding: '24px',
          margin: '0',
          borderRadius: '15px',
        }}
      >
        {/* Breadcrumb */}
        <Breadcrumb style={{ marginBottom: 16 }}>
          <Breadcrumb.Item style>Dashboard</Breadcrumb.Item>
        </Breadcrumb>

        {/* Statistic Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={6}>
            <Card
              style={{
                backgroundColor: '#ff4d4f',
                color: 'white',
                borderRadius: '8px',
                height: '100%',
              }}
            >
              <Row align="middle">
                <Col span={16}>
                  <Title level={3} style={{ color: 'white', fontWeight: 'bold' }}>
                    21,6%
                  </Title>
                  <Text style={{ color: 'white' }}>Prevelensi Stunting</Text>
                </Col>
                <Col span={8}>
                  <TeamOutlined style={{ fontSize: '40px', color: 'white' }} />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              style={{
                backgroundColor: '#9254de',
                color: 'white',
                borderRadius: '8px',
                height: '100%',
              }}
            >
              <Row align="middle">
                <Col span={16}>
                  <Title level={3} style={{ color: 'white', fontWeight: 'bold' }}>
                    2,8%
                  </Title>
                  <Text style={{ color: 'white' }}>Penurunan Prevalensi</Text>
                </Col>
                <Col span={8}>
                  <TeamOutlined style={{ fontSize: '40px', color: 'white' }} />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              style={{
                backgroundColor: '#40a9ff',
                color: 'white',
                borderRadius: '8px',
                height: '100%',
              }}
            >
              <Row align="middle">
                <Col span={16}>
                  <Title level={3} style={{ color: 'white', fontWeight: 'bold' }}>
                    5,3 Juta
                  </Title>
                  <Text style={{ color: 'white' }}>Jumlah Terdampak</Text>
                </Col>
                <Col span={8}>
                  <TeamOutlined style={{ fontSize: '40px', color: 'white' }} />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card
              style={{
                backgroundColor: '#36cfc9',
                color: 'white',
                borderRadius: '8px',
                height: '100%',
              }}
            >
              <Row align="middle">
                <Col span={16}>
                  <Title level={3} style={{ color: 'white', fontWeight: 'bold' }}>
                    60%
                  </Title>
                  <Text style={{ color: 'white' }}>Pendidikan Rendah</Text>
                </Col>
                <Col span={8}>
                  <AlertOutlined style={{ fontSize: '40px', color: 'white' }} />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        {/* Charts */}
        <Row gutter={[16, 16]}>
          <Col xs={24} md={16}>
            <Card title="Prevalensi Balita Stunting Indonesia (2013-2024)">
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
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: 'center' }}>
        © 2025 Your Company Name. All Rights Reserved.
      </Footer>
    </Layout>
  );
};

export default Dashboard;
