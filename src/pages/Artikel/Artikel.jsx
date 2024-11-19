import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Modal, Form, Input, Select, DatePicker, message, Tag, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;

const ArticleManagement = () => {
  const [articles, setArticles] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);

  // Load data from Local Storage when component mounts
  useEffect(() => {
    const storedArticles = JSON.parse(localStorage.getItem('articles')) || [];
    setArticles(storedArticles);
  }, []);

  // Save data to Local Storage whenever articles change
  useEffect(() => {
    if (articles.length > 0) {
      localStorage.setItem('articles', JSON.stringify(articles));
    }
  }, [articles]);

  // Handle opening the modal for adding/editing
  const handleAdd = () => {
    setEditingArticle(null);
    setIsModalVisible(true);
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
    setIsModalVisible(true);
  };

  // Handle deleting an article
  const handleDelete = (id) => {
    const updatedArticles = articles.filter((article) => article.id !== id);
    setArticles(updatedArticles);
    message.success('Artikel berhasil dihapus!');
  };

  // Handle changing the status of an article
  const toggleStatus = (id) => {
    const updatedArticles = articles.map((article) =>
      article.id === id
        ? { ...article, status: article.status === 'Draft' ? 'Uploaded' : 'Draft' }
        : article
    );
    setArticles(updatedArticles);
    message.success('Status artikel berhasil diperbarui!');
  };

  // Handle saving the form data
  const handleSave = (values) => {
    const formattedDate = values.publishDate
      ? moment(values.publishDate).format('YYYY-MM-DD')
      : null; // Format date to YYYY-MM-DD

    const photoUrl = values.photo && values.photo[0]?.url ? values.photo[0].url : ''; // Save photo URL
    const status = values.status || 'Draft'; // Default to Draft if not provided
    const articleData = { ...values, publishDate: formattedDate, status, photo: photoUrl };

    if (editingArticle) {
      // Update existing article
      const updatedArticles = articles.map((article) =>
        article.id === editingArticle.id ? { ...articleData, id: editingArticle.id } : article
      );
      setArticles(updatedArticles);
      message.success('Artikel berhasil diperbarui!');
    } else {
      // Add new article
      const newArticle = { ...articleData, id: Date.now() };
      setArticles([...articles, newArticle]);
      message.success('Artikel berhasil ditambahkan!');
    }
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Judul',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Kategori',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Tanggal Publikasi',
      dataIndex: 'publishDate',
      key: 'publishDate',
    },
    {
      title: 'Foto',
      dataIndex: 'photo',
      key: 'photo',
      render: (photo) =>
        photo ? <img src={photo} alt="Foto Artikel" style={{ width: 50, height: 50 }} /> : 'Tidak ada foto',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Uploaded' ? 'green' : 'orange'}>{status}</Tag>
      ),
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <Button
            type="link"
            onClick={() => toggleStatus(record.id)}
            style={{ color: record.status === 'Draft' ? 'green' : 'orange' }}
          >
            {record.status === 'Draft' ? 'Upload' : 'Jadikan Draft'}
          </Button> */}
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>Hapus</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Manajemen Artikel dan Edukasi</h2>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Tambah Artikel
      </Button>
      <Table dataSource={articles} columns={columns} rowKey="id" />
      <Modal
        title={editingArticle ? 'Edit Artikel' : 'Tambah Artikel'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={
            editingArticle
              ? {
                  ...editingArticle,
                  publishDate: editingArticle.publishDate
                    ? moment(editingArticle.publishDate, 'YYYY-MM-DD')
                    : null,
                  photo: editingArticle.photo ? [{ uid: '-1', url: editingArticle.photo }] : [],
                }
              : { title: '', category: '', publishDate: null, content: '', status: 'Draft', photo: [] }
          }
          onFinish={handleSave}
        >
          <Form.Item
            name="title"
            label="Judul Artikel"
            rules={[{ required: true, message: 'Judul harus diisi!' }]}
          >
            <Input placeholder="Masukkan judul artikel" />
          </Form.Item>
          <Form.Item
            name="category"
            label="Kategori"
            rules={[{ required: true, message: 'Kategori harus diisi!' }]}
          >
            <Select placeholder="Pilih kategori">
              <Option value="Kesehatan">Kesehatan</Option>
              <Option value="Pendidikan">Pendidikan</Option>
              <Option value="Pencegahan">Pencegahan</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="publishDate"
            label="Tanggal Publikasi"
            rules={[{ required: true, message: 'Tanggal harus diisi!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="photo"
            label="Foto Artikel"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
          >
            <Upload
              listType="picture"
              beforeUpload={() => false} // Disable auto upload
            >
              <Button icon={<UploadOutlined />}>Upload Foto</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Status harus diisi!' }]}
          >
            <Select placeholder="Pilih status">
              <Option value="Uploaded">Uploaded</Option>
              <Option value="Draft">Draft</Option>
            </Select>
          </Form.Item>
          <Form.Item name="content" label="Konten Artikel">
            <Input.TextArea rows={4} placeholder="Masukkan konten artikel" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Simpan
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ArticleManagement;
