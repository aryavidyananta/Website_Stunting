import React, { useState, useEffect } from 'react';
import { Table, Button, Tag, message, Modal, Form, Input, Upload, Select } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';

const Medis = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://172.20.10.3:5000/api/v1/medis/read");
      const result = await response.json();
      setData(result.datas.map((item) => ({
        key: item.Id_Medis,
        ...item,
      })));
    } catch (error) {
      message.error("Failed to fetch data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await fetch(`http://172.20.10.3:5000/api/v1/medis/delete/${id}`, { method: "DELETE" });
          message.success("Data deleted successfully");
          fetchData();
        } catch (error) {
          message.error("Failed to delete data");
        }
      },
    });
  };

  const handleEdit = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleUpdate = async (values) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "Gambar" && values[key]?.file) {
          formData.append(key, values[key].file);
        } else {
          formData.append(key, values[key]);
        }
      });

      await fetch(`http://172.20.10.3:5000/api/v1/medis/update/${currentRecord.Id_Medis}`, {
        method: "PUT",
        body: formData,
      });
      message.success("Data updated successfully");
      setIsModalVisible(false);
      fetchData();
    } catch (error) {
      message.error("Failed to update data");
    }
  };

  const handleCreate = async (values) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "Gambar" && values[key]?.file) {
          formData.append(key, values[key].file);
        } else {
          formData.append(key, values[key]);
        }
      });

      await fetch("http://172.20.10.3:5000/api/v1/medis/create", {
        method: "POST",
        body: formData,
      });
      message.success("Data created successfully");
      setIsModalVisible(false);
      fetchData();
    } catch (error) {
      message.error("Failed to create data");
    }
  };

  const handleImport = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const importedData = XLSX.utils.sheet_to_json(sheet);

      // Assuming backend supports bulk create/update
      importedData.forEach(async (record) => {
        try {
          await fetch("http://172.20.10.3:5000/api/v1/medis/create", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(record),
          });
        } catch (error) {
          console.error(`Failed to import record: ${record}`, error);
        }
      });
      message.success("Data imported successfully");
      fetchData();
    };
    reader.readAsBinaryString(file);
    return false; // Prevent auto upload
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Medis");
    XLSX.writeFile(workbook, "Medis_Data.xlsx");
  };

  const columns = [
    { title: 'Id_Medis', dataIndex: 'Id_Medis', key: 'Id_Medis', align: 'center', width: 60 },
    { title: 'Nama', dataIndex: 'Nama', key: 'Nama' },
    { title: 'Kategori', dataIndex: 'Kategori', key: 'Kategori' },
    { title: 'Deskripsi', dataIndex: 'Deskripsi', key: 'Deskripsi' },
    { title: 'Tlp', dataIndex: 'Tlp', key: 'Tlp' },
    { title: 'Email', dataIndex: 'Email', key: 'Email' },
    {
      title: 'Gambar',
      dataIndex: 'Gambar',
      key: 'Gambar',
      render: (Gambar) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
            src={`http://172.20.10.3:5000/static/show_image/${Gambar}`}
            alt="Medis"
            style={{ width: 100, height: 100, objectFit: 'contain', borderRadius: '8px', border: '1px solid #ddd' }}
          />
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.Id_Medis)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setCurrentRecord(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          Create Medis
        </Button>
        <div>
          <Upload beforeUpload={handleImport} showUploadList={false} accept=".csv">
            <Button icon={<UploadOutlined />} style={{ marginRight: '8px' }}>Import Data</Button>
          </Upload>
          <Button icon={<DownloadOutlined />} onClick={handleExport}>Export Data</Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 10 }}
        rowKey="Id_Medis"
        bordered
      />
      <Modal
        title={currentRecord ? "Edit Data Medis" : "Create Data Medis"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              if (currentRecord) {
                handleUpdate(values);
              } else {
                handleCreate(values);
              }
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="Nama" label="Nama" rules={[{ required: true, message: "Please input Nama!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="Kategori" label="Kategori" rules={[{ required: true, message: "Please select Kategori!" }]}>
            <Select>
              <Select.Option value="Dokter SPA">Dokter SPA</Select.Option>
              <Select.Option value="Bidan">Bidan</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="Deskripsi" label="Deskripsi">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="Tlp" label="Tlp">
            <Input />
          </Form.Item>
          <Form.Item name="Email" label="Email">
            <Input type="email" />
          </Form.Item>
          <Form.Item name="Gambar" label="Gambar" valuePropName="file">
            <Upload beforeUpload={() => false} listType="picture">
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Medis;
