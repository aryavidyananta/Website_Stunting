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
  FloatButton,
  Drawer,
  Form,
  Button,
  notification,
  Popconfirm,
  Tooltip,
} from "antd";
import {
  EditOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { getData, sendData, deleteData } from "../../utils/api";
import Section from "../Section";
import { ellipsGenerator } from "../../utils/ui";

const { Title, Text } = Typography;

const Galeri = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [dataGalleryFiltered, setDataGalleryFiltered] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isDrawer, setIsDrawer] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [idSelected, setIdSelected] = useState(null);

  useEffect(() => {
    getDataGallery();
  }, []);

  const getDataGallery = () => {
    setLoading(true);
    let url = "/api/natures";
    getData(url)
      .then((resp) => {
        if (resp) {
          setData(resp);
          setDataGalleryFiltered(resp);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleDrawer = () => {
    setIsDrawer(true);
  };

  const onCloseDrawer = () => {
    if (isEdit) {
      form.resetFields();
      setIsEdit(false);
      setIdSelected(null);
    }
    setIsDrawer(false);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then(() => {
        let nameNatures = form.getFieldValue("name_natures");
        let description = form.getFieldValue("description");

        let formData = new FormData();
        formData.append("name_natures", nameNatures);
        formData.append("description", description);

        let url = isEdit ? `/api/natures/${idSelected}` : "/api/natures";
        let request = sendData(url, formData);

        request
          .then((resp) => {
            if (resp?.datas) {
              showAlert("success", "Success", "Success to send data");
              form.resetFields();
              getDataGallery();
              onCloseDrawer();
            } else {
              showAlert("error", "Failed", "Failed to send data");
            }
          })
          .catch((err) => {
            showAlert("error", "Failed", "Failed to send data");
          });
      })
      .catch((error) => {
        showAlert("error", "Validation Error", "Please fill in all required fields.");
      });
  };

  const showAlert = (status, title, description) => {
    api[status]({
      message: title,
      description: description,
    });
  };

  const renderDrawer = () => {
    return (
      <Drawer
        title="Basic Drawer"
        onClose={onCloseDrawer}
        open={isDrawer}
        extra={
          <Button type="primary" onClick={() => handleSubmit()}>
            Submit
          </Button>
        }
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="name_natures"
            label="Name Natures"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Drawer>
    );
  };

  const handleDrawerEdit = (record) => {
    setIsDrawer(true);
    setIsEdit(true);
    setIdSelected(record?.id);
    form.setFieldsValue({
      name_natures: record?.name_natures,
      description: record?.description,
    });
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  let dataSourceFiltered = data.filter((item) => {
    return(
      item?.name_natures.toLowerCase().includes(searchText) ||
      item?.description.toLowerCase().includes(searchText)
    );
  });

  const confirmDelete = (record_id) => {
    let url = `/api/natures/${record_id}`;
    let params = new URLSearchParams();
    params.append("id", record_id);
    deleteData(url, params)
      .then((resp) => {
        if (resp?.status === 200) {
          showAlert("success", "Data deleted", "Data berhasil terhapus");
          getDataGallery();
          form.resetFields();
          onCloseDrawer();
        } else {
          showAlert("error", "Failed", "Data gagal terhapus");
        }
      })
      .catch((err) => {
        console.log(err);
        showAlert("error", "Failed", "Data gagal terhapus");
      });
  };

  return (
    <Section topMd={100} topLg={80} topXl={60}>
      <div className="layout-content">
        {contextHolder}
        <Row gutter={[24, 0]}>
          <Col xs={24} lg={24} className="mb-24">
            <Card bordered={false} className="criclebox h-full w-full">
              <FloatButton
                type="primary"
                icon={<PlusCircleOutlined />}
                onClick={() => handleDrawer()}
                tooltip="Add gallery"
              />
              {renderDrawer()}

              <Title>BlackHex Gallery</Title>
              <Divider />

              <Input
                placeholder="Search here..."
                prefix={<SearchOutlined />}
                className="header-search"
                allowClear
                size={"large"}
                onChange={(e) => handleSearch(e.target.value)}
              />

              <Divider />

              <Title level={4}>Gallery from API</Title>
              {isLoading ? (
                <Skeleton active />
              ) : dataGalleryFiltered.length > 0 ? (
                <List
                  grid={{ gutter: 24, xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }}
                  dataSource={(dataSourceFiltered ??= [])}
                  renderItem={(item) => (
                    <List.Item>
                      <Card
                        hoverable
                        cover={<img alt="example" src={item?.url_photo} />}
                        actions={[
                          <EditOutlined
                            key="edit"
                            onClick={() => handleDrawerEdit(item)}
                          />,
                          <Popconfirm
                            key="delete"
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            onConfirm={() => confirmDelete(item?.id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <DeleteOutlined />
                          </Popconfirm>,
                        ]}
                      >
                        <Card.Meta
                          title={
                            <Text type={searchText?.length > 0 && "danger"}>
                            {item?.name_natures}
                          </Text>
                          }
                          description={
                              <Text ellipsis={ellipsGenerator(item?.description)}>{item?.description}</Text>
                          }
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              ) : (
                "No data"
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </Section>
  );
};

export default Galeri;
