import React, { useState } from 'react';
import { Table, Button, Tag, Upload, message } from 'antd';
import { EditOutlined, DeleteOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import Papa from 'papaparse';

const Bidan = () => {
  const [data, setData] = useState([
    { key: '1', no: '1', nama: 'Super Admin', email: 'admin2023@gmail.com', role: 'Admin' },
    { key: '2', no: '2', nama: 'Arya Vidyananta', email: 'Aryavidyananta@gmail.com', role: 'Petugas' },
    { key: '3', no: '3', nama: 'Yudha', email: 'Yudha@gmail.com', role: 'Petugas' },
    { key: '4', no: '4', nama: 'Devandra', email: 'Devandra@gmail.com', role: 'Petugas' },
    { key: '5', no: '5', nama: 'Gandi Taruna', email: 'GandiTaruna@gmail.com', role: 'Petugas' },
  ]);

  // Define table columns
  const columns = [
    { title: 'No', dataIndex: 'no', key: 'no', align: 'center' },
    { title: 'Nama', dataIndex: 'nama', key: 'nama' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => <Tag color={role === 'Admin' ? 'red' : 'orange'}>{role}</Tag>,
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <>
          <Button type="primary" icon={<EditOutlined />} style={{ marginRight: '8px' }} onClick={() => handleEdit(record.key)}>
            Edit
          </Button>
          <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)}>
            Hapus
          </Button>
        </>
      ),
    },
  ];

  // Handlers for Edit and Delete actions
  const handleEdit = (key) => {
    console.log('Edit record with key:', key);
    // Add your edit logic here
  };

  const handleDelete = (key) => {
    console.log('Delete record with key:', key);
    setData((prevData) => prevData.filter((item) => item.key !== key));
  };

  // Handler for importing data from CSV
  const handleImport = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const importedData = result.data.map((item, index) => ({
          key: `${data.length + index + 1}`,
          no: `${data.length + index + 1}`,
          nama: item.nama || '',
          email: item.email || '',
          role: item.role || 'Petugas',
        }));
        setData((prevData) => [...prevData, ...importedData]);
        message.success('Data imported successfully');
      },
      error: () => {
        message.error('Failed to import data');
      },
    });
    return false; // prevent default upload behavior
  };

  // Handler for exporting data to CSV
  const handleExport = () => {
    const csvData = data.map((item) => ({
      no: item.no,
      nama: item.nama,
      email: item.email,
      role: item.role,
    }));
    
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'bidan_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <Button type="primary">New User</Button>
        <div>
          <Upload beforeUpload={handleImport} showUploadList={false} accept=".csv">
            <Button icon={<UploadOutlined />} style={{ marginRight: '8px' }}>Import Data</Button>
          </Upload>
          <Button icon={<DownloadOutlined />} onClick={handleExport}>Export Data</Button>
        </div>
      </div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} rowKey="key" bordered />
    </div>
  );
};

export default Bidan;
