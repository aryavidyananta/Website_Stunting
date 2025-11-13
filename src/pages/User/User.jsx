import { useState, useEffect } from 'react';
import { Table, message, Typography } from 'antd';

const { Title } = Typography;

const Bidan = () => {
  const [data, setData] = useState([]);

  // Fetch data from API when the component mounts
  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/v1/user/read_by_role/User')
      .then((response) => response.json())
      .then((data) => {
        if (data.datas) {
          // Format the fetched data into the structure needed for the table
          const formattedData = data.datas.map((item, index) => ({
            key: item.Id_User,
            no: index + 1,
            username: item.username,
            email: item.email,
          }));
          setData(formattedData);
        } else {
          message.error('Failed to fetch data');
        }
      })
      .catch(() => {
        message.error('Error fetching data from API');
      });
  }, []);

  // Define table columns
  const columns = [
    { title: 'No', dataIndex: 'no', key: 'no', align: 'center' },
    { title: 'Username', dataIndex: 'username', key: 'username' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      {/* Page Title */}
      <Title level={2} style={{ marginBottom: '20px', textAlign: 'center' }}>
        Data User
      </Title>
      
      {/* User Data Table */}
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} rowKey="key" bordered />
    </div>
  );
};

export default Bidan;
