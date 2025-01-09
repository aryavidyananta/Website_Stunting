import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, Space, message, DatePicker } from "antd";
import moment from "moment";
import { getDataPrivate, sendDataPrivate, editDataPrivatePut, deleteDataPrivateJSON, editDataPrivateURLEncoded } from "../../utils/api"; // Ganti dengan path file API Anda

const { Option } = Select;

const MainBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);


  const fetchBlogs = async () => {
  setIsLoading(true);
   getDataPrivate("/api/v1/blog/read")
   .then((response) => {
    if (response?.datas) {
      setBlogs(response.datas);
    } else {
      console.log("error", "Error", "Failed to fetch data");
    }
    setIsLoading(false);
  })
  .catch((error) => {
    setIsLoading(false);
    console.error("Fetch error:", error);
    console.log("error", "Error", "Failed to fetch data");
  });
  };
  
  const handleAddBlog = () => {
    form
      .validateFields()
      .then((values) => {
        const formData = new FormData();
        formData.append("judul", values.title);
        formData.append("deskripsi", values.content);

        sendDataPrivate("/api/v1/blog/create", formData)
          .then((response) => {
            if (response?.id_blog) {
              message.success("Blog berhasil ditambahkan!");
              setBlogs((prevBlogs) => [...prevBlogs, response]);
              form.resetFields();
              setIsModalVisible(false);
            } else {
              message.error("Gagal menambahkan blog!");
            }
          })
          .catch((error) => {
            console.error("Error adding blog:", error);
            message.error("Terjadi kesalahan saat menambahkan blog!");
          });
      })
      .catch(() => {
        message.error("Mohon lengkapi semua kolom!");
      });
  };

  const handleEditBlog = () => {
    form
      .validateFields()
      .then((values) => {
        const formData = new FormData();
        formData.append("judul", values.title);
        formData.append("deskripsi", values.content);

  
        editDataPrivatePut(`/api/v1/blog/update/${editingBlog.id_blog}`, formData)
          .then((response) => {
            console.log('ini',response);
            if (response?.id_blog) {
              message.success("Blog berhasil diperbarui!");
              setBlogs((prevBlogs) =>
                prevBlogs.map((blog) =>
                  blog.id_blog === editingBlog.id_blog ? { ...blog, ...response } : blog
                )
              );
              form.resetFields();
              setIsModalVisible(false);
            } else {
              message.error("Gagal memperbarui blog!");
            }
          })
          .catch((error) => {
            console.error("Error updating blog:", error);
            message.error("Terjadi kesalahan saat memperbarui blog!");
          });
      })
      .catch(() => {
        message.error("Mohon lengkapi semua kolom!");
      });
  };
  
  const handleDelete = (id_blog) => {
      deleteDataPrivateJSON(`/api/v1/blog/delete/${id_blog}`)
        .then((response) => {
          if (response?.status === 200 || response?.message === "Deleted") {
            console.log(
              "success",
              "Deleted",
              "Playlist item deleted successfully"
            );
            fetchBlogs();
          } else {
            console.log("error", "Error", "Failed to delete playlist item");
          }
        })
        .catch((error) => {
          console.error("Delete error:", error);
          console.log("error", "Error", "Failed to delete playlist item");
        });
    };
  const handleModalOpen = (blog = null) => {
    setEditingBlog(blog);
    setIsModalVisible(true);
    if (blog) {
      form.setFieldsValue({
        title: blog.judul,
        content: blog.deskripsi,

      });
    } else {
      form.resetFields();
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingBlog(null);
    form.resetFields();
  };

  const handleFormSubmit = (values) => {
    if (editingBlog) {
      handleEditBlog(values);
    } else {
      handleAddBlog(values);
    }
  };

  useEffect(() => {
    fetchBlogs(); // Ambil data blog ketika komponen dimuat
  }, []);

  const columns = [
    {
      title: "Judul",
      dataIndex: "judul",
      key: "judul",
    },
    {
      title: "Tanggal Publikasi",
      dataIndex: "creted_blog",
      key: "creted_blog",
      render: (date) => moment(date).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Aksi",
      key: "aksi",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleModalOpen(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id_blog)}>
            Hapus
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => handleModalOpen()} style={{ marginBottom: 16 }}>
        Tambah Blog
      </Button>
      <Table dataSource={blogs} columns={columns} rowKey="id_blog" />
      <Modal
        title={editingBlog ? "Edit Blog" : "Tambah Blog"}
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            name="title"
            label="Judul"
            rules={[{ required: true, message: "Judul harus diisi!" }]}
          >
            <Input placeholder="Masukkan judul blog" />
          </Form.Item>
          <Form.Item
            name="content"
            label="Konten"
            rules={[{ required: true, message: "Konten harus diisi!" }]}
          >
            <Input.TextArea rows={4} placeholder="Masukkan konten blog" />
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
