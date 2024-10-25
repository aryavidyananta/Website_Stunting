
import { Table, Typography, Card, Row, Col } from "antd";

const { Title, Paragraph } = Typography;


const annualDataSource = [
  {
    key: "1",
    Nama: "Sepatu",
    Jumlah: 20,
    Harga: "1.000.000",
  },
  {
    key: "2",
    Nama: "Sandal",
    Jumlah: 10,
    Harga: "250.000",
  },
];

const monthlyDataSource = [
  {
    key: "1",
    Nama: "Sepatu",
    Terjual: 200,
    Total: "10.000.000",
  },
  {
    key: "2",
    Nama: "Sandal",
    Terjual: 100,
    Total: "2.000.000",
  },
];

const annualColumns = [
  {
    title: "Nama",
    dataIndex: "Nama",
    key: "Nama",
  },
  {
    title: "Jumlah",
    dataIndex: "Jumlah",
    key: "Jumlah",
  },
  {
    title: "Harga",
    dataIndex: "Harga",
    key: "Harga",
  },
];


const monthlyColumns = [
  {
    title: "Nama",
    dataIndex: "Nama",
    key: "Nama",
  },
  {
    title: "Terjual",
    dataIndex: "Terjual",
    key: "Terjual",
  },
  {
    title: "Total",
    dataIndex: "Total",
    key: "Total",
  },
];


function Profile() {
  return (
    <div className="layout-content">
      <Row gutter={[24, 24]}>
        {/* Annual Orders Card */}
        <Col xs={24} md={12} lg={12}>
          <Card bordered={false} className="criclebox h-full">
            <Title level={3}>Annual Orders</Title>
            <Paragraph>Data Orders in Annual</Paragraph>
            <Table
              dataSource={annualDataSource}
              columns={annualColumns}
              pagination={{
                pageSize: 2,
              }}
            />
          </Card>
        </Col>

        {/* Monthly Orders Card */}
        <Col xs={24} md={12} lg={12}>
          <Card bordered={false} className="criclebox h-full">
            <Title level={3}>Monthly Orders</Title>
            <Paragraph>Data Orders for this month</Paragraph>
            <Table
              dataSource={monthlyDataSource}
              columns={monthlyColumns}
              pagination={{
                pageSize: 2,
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Profile;