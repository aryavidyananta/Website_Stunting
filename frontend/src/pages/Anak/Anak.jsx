import React, { useState } from 'react';
import { Table, Tag, Button, Input, Modal, Form, message } from 'antd';
import { PlusOutlined, DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import Papa from 'papaparse';

const DataAnak = () => {
  const [data, setData] = useState([
    { key: '1', no: '1', nama: 'Ali', jenisKelamin: 'Laki-laki', umur: '24', beratBadan: '12.5', tinggiBadan: '85', status: 'Normal' },
    { key: '2', no: '2', nama: 'Siti', jenisKelamin: 'Perempuan', umur: '30', beratBadan: '13', tinggiBadan: '90', status: 'Tinggi' },
    { key: '3', no: '3', nama: 'Budi', jenisKelamin: 'Laki-laki', umur: '18', beratBadan: '10', tinggiBadan: '75', status: 'Stunting' },
    { key: '4', no: '4', nama: 'Ayu', jenisKelamin: 'Perempuan', umur: '20', beratBadan: '11', tinggiBadan: '80', status: 'Normal' },
    { key: '5', no: '5', nama: 'Rani', jenisKelamin: 'Perempuan', umur: '28', beratBadan: '13.5', tinggiBadan: '92', status: 'Tinggi' },
  ]);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Define table columns
  const columns = [
    { title: 'No', dataIndex: 'no', key: 'no', align: 'center' },
    { title: 'Nama', dataIndex: 'nama', key: 'nama' },
    { title: 'Jenis Kelamin', dataIndex: 'jenisKelamin', key: 'jenisKelamin' },
    { title: 'Umur (Bulan)', dataIndex: 'umur', key: 'umur', align: 'center' },
    { title: 'Berat Badan (kg)', dataIndex: 'beratBadan', key: 'beratBadan', align: 'center' },
    { title: 'Tinggi Badan (cm)', dataIndex: 'tinggiBadan', key: 'tinggiBadan', align: 'center' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = status === 'Stunting' ? 'red' : status === 'Normal' ? 'green' : 'blue';
        return <Tag color={color} style={{ fontWeight: 'bold' }}>{status}</Tag>;
      },
      align: 'center',
    },
  ];

  // Handlers
  const handleAddData = (values) => {
    const newData = {
      key: data.length + 1,
      no: `${data.length + 1}`,
      nama: values.nama,
      jenisKelamin: values.jenisKelamin,
      umur: values.umur,
      beratBadan: values.beratBadan,
      tinggiBadan: values.tinggiBadan,
      status: values.status,
    };
    setData([...data, newData]);
    setIsModalVisible(false);
    form.resetFields();
    message.success('Data berhasil ditambahkan');
  };

  const handleExport = () => {
    const csvData = data.map((item) => ({
      no: item.no,
      nama: item.nama,
      jenisKelamin: item.jenisKelamin,
      umur: item.umur,
      beratBadan: item.beratBadan,
      tinggiBadan: item.tinggiBadan,
      status: item.status,
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data_anak.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredData = data.filter((item) =>
    item.nama.toLowerCase().includes(searchText)
  );

  return (
    <div style={{ padding: '20px' }}>
      {/* Actions: Add, Export, and Search */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
          New Data
        </Button>
        <Button 
          type="danger" 
          icon={<DownloadOutlined />} 
          onClick={handleExport}
          style={{ backgroundColor: '#FF4D4F', borderColor: '#FF4D4F', color: '#fff' }} // Custom color
        >
          Export Data
        </Button>
        <Input
          placeholder="Search by name"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearch}
          style={{ width: '200px' }}
        />
      </div>

      {/* Data Table */}
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 10 }}
        rowKey="key"
        bordered
      />

      {/* New Data Modal */}
      <Modal
        title="Add New Data"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => {
          form
            .validateFields()
            .then((values) => handleAddData(values))
            .catch((info) => console.log('Validation Failed:', info));
        }}
        okText="Add"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="nama" label="Nama" rules={[{ required: true, message: 'Please enter the name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="jenisKelamin" label="Jenis Kelamin" rules={[{ required: true, message: 'Please select gender' }]}>
            <Input placeholder="Laki-laki / Perempuan" />
          </Form.Item>
          <Form.Item name="umur" label="Umur (Bulan)" rules={[{ required: true, message: 'Please enter the age in months' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="beratBadan" label="Berat Badan (kg)" rules={[{ required: true, message: 'Please enter the weight' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="tinggiBadan" label="Tinggi Badan (cm)" rules={[{ required: true, message: 'Please enter the height' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please enter the status' }]}>
            <Input placeholder="Stunting / Normal / Tinggi" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DataAnak;
