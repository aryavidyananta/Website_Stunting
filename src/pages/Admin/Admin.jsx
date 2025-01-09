import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Typography,
  Card,
  List,
  Skeleton,
  Divider,
  Input,
  Drawer,
  Form,
  Button,
  notification,
  Popconfirm,
  FloatButton,
  Select,
} from "antd";
import { PlusCircleOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getData, sendData, deleteData, editDataPrivatePut, editData } from "../../utils/api";
import Section from "../../components/Section";

const { Title, Text } = Typography;

const AdminPlaylistPost = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchPlaylistData();
  }, []);

  const fetchPlaylistData = () => {
    setIsLoading(true);
    getData("/api/v1/playlist/read")
      .then((response) => {
        if (response?.datas) {
          setData(response.datas);
        } else {
          showNotification("error", "Error", "Failed to fetch data");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Fetch error:", error);
        showNotification("error", "Error", "Failed to fetch data");
      });
  };

  const showNotification = (type, title, description) => {
    api[type]({
      message: title,
      description: description,
    });
  };

  const handleSubmit = () => {
  // Validasi form fields
  form.validateFields().then((values) => {
    const formData = new FormData();
    
    // Menambahkan setiap field ke FormData
    formData.append("play_name", values.play_name);
    formData.append("play_url", values.play_url);
    formData.append("play_thumbnail", values.play_thumbnail);
    formData.append("play_genre", values.play_genre);
    formData.append("play_description", values.play_description);

    // Tentukan API endpoint untuk create atau update
    const apiUrl = isEditing
      ? `/api/v1/playlist/update/${selectedItem.id_play}`  // Untuk update
      : "/api/v1/playlist/create";  // Untuk create item baru

    // Pilih fungsi yang akan dipanggil berdasarkan apakah ini edit atau create
    const apiFunction = isEditing ? editData : sendData;

    // Panggil API untuk mengirim data
    apiFunction(apiUrl, formData)
      .then((response) => {
        // Cek response dari backend
        if (response?.message === "Updated" || response?.message === "Created") {  // Cek response message
          // Tampilkan notifikasi sukses
          showNotification(
            "success",
            "Success",
            isEditing ? "Playlist item updated successfully" : "Playlist item added successfully"
          );

          // Reset form fields dan update data
          form.resetFields();
          fetchPlaylistData();

          // Tutup drawer dan reset state
          setIsDrawerVisible(false);
          setIsEditing(false);
          setSelectedItem(null);
        } else {
          // Handle gagal menyimpan item playlist
          showNotification("error", "Error", "Failed to save playlist item");
        }
      })
      .catch((error) => {
        // Tangani error dan tampilkan notifikasi error
        console.error("Submit error:", error);
        showNotification("error", "Error", "Failed to save playlist item");
      });
  }).catch(() => {
    // Jika ada error validasi (field wajib belum terisi)
    showNotification("error", "Validation Error", "Please fill in all required fields.");
  });
};

  
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };
  
  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsEditing(true);
    setIsDrawerVisible(true);
    form.setFieldsValue({
      play_name: item.play_name,
      play_url: item.play_url,
      play_thumbnail: item.play_thumbnail,
      play_genre: item.play_genre,
      play_description: item.play_description,
    });
  };
  

  const handleDelete = (id_play) => {
    deleteData(`/api/v1/playlist/de${id_play}`)
      .then((response) => {
        if (response?.status === 200) {
          showNotification("success", "Deleted", "Playlist item deleted successfully");
          fetchPlaylistData();
        } else {
          showNotification("error", "Error", "Failed to delete playlist item");
        }
      })
      .catch((error) => {
        console.error("Delete error:", error);
        showNotification("error", "Error", "Failed to delete playlist item");
      });
  };

  const filteredData = data.filter((item) =>
    item.play_name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Section>
      {contextHolder}
      <div className="layout-content">
        
        <Row gutter={[24, 0]}>
          <Col xs={24} lg={24} className="mb-24">
            <Card bordered={false} className="criclebox h-full w-full">
              <Drawer
                title={isEditing ? "Edit Playlist Item" : "Add Playlist Item"}
                onClose={() => setIsDrawerVisible(false)}
                visible={isDrawerVisible}
                width={400}
              >
                <Form layout="vertical" form={form} onFinish={handleSubmit}>
                  <Form.Item
                    name="play_name"
                    label="Play Name"
                    rules={[{ required: true, message: "Please enter the play name" }]}
                  >
                    <Input placeholder="Enter play name" />
                  </Form.Item>
                  <Form.Item
                    name="play_url"
                    label="Play URL"
                    rules={[{ required: true, message: "Please enter the play URL" }]}
                  >
                    <Input placeholder="Enter play URL" />
                  </Form.Item>
                  <Form.Item
                    name="play_thumbnail"
                    label="Play Thumbnail"
                    rules={[{ required: true, message: "Please enter the thumbnail URL" }]}
                  >
                    <Input placeholder="Enter thumbnail URL" />
                  </Form.Item>
                  <Form.Item
                    name="play_genre"
                    label="Play Genre"
                    rules={[{ required: true, message: "Please select a genre" }]}
                  >
                    <Select placeholder="Select genre">
                      <Select.Option value="Music">Music</Select.Option>
                      <Select.Option value="Song">Song</Select.Option>
                      <Select.Option value="Movie">Movie</Select.Option>
                      <Select.Option value="Education">Education</Select.Option>
                      <Select.Option value="Others">Others</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="play_description"
                    label="Play Description"
                    rules={[{ required: true, message: "Please enter the description" }]}
                  >
                    <Input.TextArea rows={3} placeholder="Enter description" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                      {isEditing ? "Update" : "Submit"}
                    </Button>
                  </Form.Item>
                </Form>
              </Drawer>

              <Title level={3}>Playlist</Title>
              <Divider />

              <Input
                placeholder="Search here..."
                prefix={<SearchOutlined />}
                className="header-search"
                allowClear
                size="large"
                onChange={handleSearch}
              />

              <Divider />

              {isLoading ? (
                <Skeleton active />
              ) : filteredData.length > 0 ? (
                <List
                  grid={{ gutter: 24, xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }}
                  dataSource={filteredData}
                  renderItem={(item) => (
                    <List.Item>
                      <Card
                        hoverable
                        style={{ cursor: "pointer" }}
                        cover={
                          <img
                            alt={item.play_name}
                            src={item.play_thumbnail}
                            onClick={() => window.open(item.play_url, "_blank")}
                            style={{ cursor: "pointer" }}
                          />
                        }
                        actions={[
                          <EditOutlined key="edit" onClick={() => handleEdit(item)} />,
                          <Popconfirm
                            key="delete"
                            title="Are you sure to delete this playlist item?"
                            onConfirm={() => handleDelete(item.id_play)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <DeleteOutlined style={{ color: "red" }} />
                          </Popconfirm>,
                        ]}
                      >
                        <Card.Meta
                          title={<Text>{item.play_name}</Text>}
                          description={
                            <>
                              <Text>{item.play_genre}</Text>
                              <br />
                              <Text ellipsis>{item.play_description}</Text>
                            </>
                          }
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              ) : (
                <Text>No data available</Text>
              )}
            </Card>
          </Col>
        </Row>

        <FloatButton
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={() => {
            setIsDrawerVisible(true);
            setIsEditing(false);
            form.resetFields();
          }}
          style={{
            position: "fixed",
            bottom: 30,
            right: 30,
            zIndex: 1000,
          }}
        />
      </div>
    </Section>
  );
};

export default AdminPlaylistPost;
