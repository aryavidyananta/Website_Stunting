import React, { useState } from 'react';
import { Table, Button, Tag, Upload, message } from 'antd';
import { EditOutlined, DeleteOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import Papa from 'papaparse';

const Medis = () => {
  const [data, setData] = useState([
    {
      key: '1',
      no: '1',
      nama: 'Novelita Damanik',
      role: 'Bidan',
      deskripsi: 'Bidan Novel, inovator metode persalinan tiup-tiup, beliau aktif mengedukasi pentingnya nutrisi ibu hamil untuk mendukung tumbuh kembang optimal bayi.'
    },
    {
      key: '2',
      no: '2',
      nama: 'Yesie Aprillia',
      role: 'Bidan',
      deskripsi: 'Ahli di bidang gentle birth dengan layanan seperti prenatal gentle yoga, hypnotherapy, dan hypnobirthing untuk mendukung persalinan yang nyaman dan alami.'
    },
    {
      key: '3',
      no: '3',
      nama: 'Ony',
      role: 'Bidan',
      deskripsi: 'Menyampaikan edukasi kesehatan ibu dan anak dengan gaya santai dan humoris. Pendekatannya mempermudah pemahaman pentingnya nutrisi untuk mencegah stunting.'
    },
    {
      key: '4',
      no: '4',
      nama: 'Jamilatus Sa’diyah',
      role: 'Bidan',
      deskripsi: 'Bidan Jamilatus Sadiyah berkomitmen mencegah stunting dengan edukasi gizi dan perawatan bayi untuk tumbuh kembang optimal.'
    },
    {
      key: '5',
      no: '5',
      nama: 'Tantri',
      role: 'Bidan',
      deskripsi: 'Bidan Tantri, ahli kebidanan berpengalaman, fokus pada pencegahan stunting melalui edukasi gizi ibu dan perkembangan anak.'
    },
    {
      key: '6',
      no: '6',
      nama: 'Dr. Erlin Sp.A.',
      role: 'Dokter Spesialis Anak',
      deskripsi: 'Dengan bekal pengalaman sebagai dokter anak selama 19 tahun, dr. Erlin Sp.A. mampu memberikan layanan konsultasi di POS terkait stunting.'
    },
    {
      key: '7',
      no: '7',
      nama: 'Dr. Dandung Bawono Sp.A, M.Sc',
      role: 'Dokter Spesialis Anak',
      deskripsi: 'Dokter Dandung Bawono Sp.A, M.Sc juga bisa memberikan konsultasi terkait DBD dan penyakit tropis, pencernaan anak, alergi dan imunitas anak serta perkembangan anak.'
    },
    {
      key: '8',
      no: '8',
      nama: 'Dr. Gracia Deswita Natalya Fau Sp.A.',
      role: 'Dokter Spesialis Anak',
      deskripsi: 'Dengan pengalaman selama 13 tahun, dr. Gracia Deswita Natalya Fau Sp.A. bisa memberikan layanan konsultasi di POS terkait stunting.'
    },
    {
      key: '9',
      no: '9',
      nama: 'Dr. Bayu Kurniawan Sp.A, M.Biomed',
      role: 'Dokter Spesialis Anak',
      deskripsi: 'Dengan pengalaman selama 17 tahun, dr. Bayu Kurniawan Sp.A, M.Biomed memberikan layanan konsultasi di POS terkait stunting.'
    },
    {
      key: '10',
      no: '10',
      nama: 'dr. Dwi Lestari Avianti Sp.A, M.Ked.Klin',
      role: 'Dokter Spesialis Anak',
      deskripsi: 'Dengan pengalaman selama 16 tahun, dr. Dwi Lestari Avianti Sp.A, M.Ked.Klin memberikan layanan konsultasi di POS seputar stunting.'
    }
  ]);

  // Define table columns
  const columns = [
    { title: 'No', dataIndex: 'no', key: 'no', align: 'center' },
    { title: 'Nama', dataIndex: 'nama', key: 'nama' },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => {
        let color = 'orange'; // Default color for Petugas
        if (role === 'Admin') color = 'red';
        if (role === 'Bidan') color = 'green';
        if (role === 'Dokter Spesialis Anak') color = 'blue';
        
        return <Tag color={color}>{role}</Tag>;
      },
    },
    { title: 'Deskripsi', dataIndex: 'deskripsi', key: 'deskripsi' },
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
          nama: item.name || '',
          role: item.department || 'Petugas',
          deskripsi: item.description || '',
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
      role: item.role,
      deskripsi: item.deskripsi,
    }));
    
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'doctors_data.csv');
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

export default Medis;
