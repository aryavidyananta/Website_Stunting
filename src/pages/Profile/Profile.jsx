import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Space, message, Upload } from "antd";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const { Dragger } = Upload;

const MainBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);

  const API_BASE_URL = "http://127.0.0.1:5000/api/v1/blog";

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/read`);
      const data = await response.json();
      if (data?.datas) {
        setBlogs(data.datas);
      } else {
        message.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      message.error("Terjadi kesalahan saat mengambil data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBlog = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("Judul", values.title);
      formData.append("Deskripsi", values.content);
      if (fileList.length > 0) {
        formData.append("Gambar", fileList[0].originFileObj);
      }

      const response = await fetch(`${API_BASE_URL}/create`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (response.status === 201) {
        message.success("Blog berhasil ditambahkan!");
        setBlogs((prevBlogs) => [...prevBlogs, { ...data, Id_Blog: data.Id_Blog }]);
        form.resetFields();
        setFileList([]);
        setIsModalVisible(false);
      } else {
        message.error("Gagal menambahkan blog: " + data.message);
      }
    } catch (error) {
      message.error("Mohon lengkapi semua kolom!");
    }
  };

  const handleEditBlog = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("Judul", values.title);
      formData.append("Deskripsi", values.content);
      if (fileList.length > 0) {
        formData.append("Gambar", fileList[0].originFileObj);
      }

      const response = await fetch(`${API_BASE_URL}/update/${editingBlog.Id_Blog}`, {
        method: "PUT",
        body: formData,
      });
      const data = await response.json();

      if (response.status === 200) {
        message.success("Blog berhasil diperbarui!");
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog.Id_Blog === editingBlog.Id_Blog ? { ...blog, ...data } : blog
          )
        );
        form.resetFields();
        setFileList([]);
        setIsModalVisible(false);
      } else {
        message.error("Gagal memperbarui blog: " + data.err_message);
      }
    } catch (error) {
      message.error("Mohon lengkapi semua kolom!");
    }
  };

  const handleDelete = async (Id_Blog) => {
    Modal.confirm({
      title: "Anda yakin ingin menghapus blog ini?",
      okText: "Ya",
      okType: "danger",
      cancelText: "Tidak",
      onOk: async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/delete/${Id_Blog}`, {
            method: "DELETE",
          });

          if (response.status === 200) {
            message.success("Blog berhasil dihapus!");
            setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.Id_Blog !== Id_Blog));
          } else {
            message.error("Gagal menghapus blog");
          }
        } catch (error) {
          console.error("Delete error:", error);
          message.error("Terjadi kesalahan saat menghapus blog");
        }
      },
    });
  };

  const handleModalOpen = (blog = null) => {
    setEditingBlog(blog);
    setIsModalVisible(true);
    setFileList([]);
    if (blog) {
      form.setFieldsValue({
        title: blog.Judul,
        content: blog.Deskripsi,
      });
    } else {
      form.resetFields();
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingBlog(null);
    form.resetFields();
    setFileList([]);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const toggleExpandRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const columns = [
    {
      title: "Judul",
      dataIndex: "Judul",
      key: "Judul",
    },
    {
      title: "Deskripsi",
      dataIndex: "Deskripsi",
      key: "Deskripsi",
      render: (text, record) => (
        <div>
          {expandedRows.includes(record.Id_Blog) ? (
            <span>
              {text} <Button type="link" onClick={() => toggleExpandRow(record.Id_Blog)}>Sembunyikan</Button>
            </span>
          ) : (
            <span>
              {text.substring(0, 100)}...
              {text.length > 100 && (
                <Button type="link" onClick={() => toggleExpandRow(record.Id_Blog)}>Selengkapnya</Button>
              )}
            </span>
          )}
        </div>
      ),
    },
    {
      title: "Tanggal",
      dataIndex: "tanggal",
      key: "tanggal",
      render: (date) => moment(date).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Gambar",
      dataIndex: "Gambar",
      key: "Gambar",
      render: (url) =>
        url && (
          <img
            src={`http://127.0.0.1:5000/static/show_image/${url}`}
            alt="Gambar"
            style={{ width: 100 }}
          />
        ),
    },
    {
      title: "Aksi",
      key: "aksi",
      align: "center",
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", justifyContent: "center" }}>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleModalOpen(record)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.Id_Blog)}
          >
            Hapus
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => handleModalOpen()} style={{ marginBottom: 16 }}>
        Tambah Blog
      </Button>
      <Table dataSource={blogs} columns={columns} rowKey="Id_Blog" loading={isLoading} />
      <Modal
  title={editingBlog ? "Edit Blog" : "Tambah Blog"}
  visible={isModalVisible}
  onCancel={handleModalCancel}
  footer={null}
  width={1200} // Memperlebar ukuran modal menjadi 1200px
>
  <Form
    form={form}
    layout="vertical"
    onFinish={editingBlog ? handleEditBlog : handleAddBlog}
    style={{ maxWidth: '1150px', margin: '0 auto' }} // Lebar form diperbesar menjadi 1150px dan dipusatkan
  >
    <Form.Item
      name="title"
      label="Judul"
      rules={[{ required: true, message: "Judul harus diisi!" }]}
    >
      <Input placeholder="Masukkan judul blog" />
    </Form.Item>
    <Form.Item
      name="content"
      label="Deskripsi"
      rules={[{ required: true, message: "Deskripsi harus diisi!" }]}
    >
      <ReactQuill
        theme="snow"
        value={form.getFieldValue("content")}
        onChange={(value) => form.setFieldsValue({ content: value })}
        placeholder="Masukkan deskripsi blog"
        style={{ height: '300px' }} // Kustomisasi tinggi editor
      />
    </Form.Item>
    <Form.Item name="gambar" label="Gambar">
      <Dragger
        beforeUpload={() => false}
        fileList={fileList}
        onChange={(info) => setFileList(info.fileList)}
        multiple={false}
      >
        <p className="ant-upload-text">Klik atau seret file untuk mengunggah</p>
      </Dragger>
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
        Simpan
      </Button>
      <Button onClick={handleModalCancel}>Batal</Button>
    </Form.Item>
  </Form>
</Modal>



    </div>
  );
};

export default MainBlog;
