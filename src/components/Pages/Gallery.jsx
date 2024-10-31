import { Col, Row, Typography, Card, List, Divider, Skeleton, FloatButton, message, notification, Drawer, Form, Input, Button, Modal } from "antd";
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, ExclamationCircleOutlined, SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import { useState, useEffect } from "react";
import { getData, sendData, deleteData, updateData } from "../../utils/api";
import Section from '../Section';

const { Title, Text } = Typography;
const { confirm } = Modal;

const Galeri = () => {
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();
    const [dataSource, setDataSource] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDrawer, setIsDrawer] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editItemId, setEditItemId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAscending, setIsAscending] = useState(false); // Default sorting order set to descending

    // Load data when component mounts
    useEffect(() => {
        getDataGaleri();
    }, []);

    // Update filtered data based on search term
    useEffect(() => {
        if (searchTerm) {
            const filtered = dataSource.filter(item =>
                (item.name_natures && item.name_natures.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            setFilteredData(filtered);
        } else {
            setFilteredData(dataSource);
        }
    }, [searchTerm, dataSource]);

    // Fetch data from API and sort by id in descending order initially
    const getDataGaleri = () => {
        setIsLoading(true);
        getData("/api/natures")
            .then(resp => {
                setIsLoading(false);
                if (resp) {
                    const sortedData = resp.sort((a, b) => b.id - a.id); // Sort by descending initially
                    setDataSource(sortedData);
                    setFilteredData(sortedData);
                }
            })
            .catch(err => {
                setIsLoading(false);
                console.log(err);
            });
    };

    // Toggle sort order between ascending and descending
    const toggleSortOrder = () => {
        const sortedData = [...dataSource].sort((a, b) =>
            isAscending ? b.id - a.id : a.id - b.id
        );
        setIsAscending(!isAscending);
        setDataSource(sortedData);
        setFilteredData(sortedData);
    };

    // Delete function to remove item by id
    const handleDelete = (id) => {
        deleteData(`/api/natures/${id}`)
            .then((resp) => {
                if (resp) {
                    message.success("Data successfully deleted");
                    setDataSource(dataSource.filter(item => item.id !== id)); // Remove item from state
                    setFilteredData(filteredData.filter(item => item.id !== id)); // Update filtered data
                } else {
                    message.error("Failed to delete data");
                }
            })
            .catch((err) => {
                console.log(err);
                message.error("Failed to delete data");
            });
    };

    // Show delete confirmation modal
    const showDeleteConfirm = (id) => {
        confirm({
            title: "Are you sure you want to delete this item?",
            icon: <ExclamationCircleOutlined />,
            content: "This action cannot be undone",
            onOk() {
                handleDelete(id);
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };

    const handleDrawer = () => {
        setIsDrawer(true);
    };

    const onCloseDrawer = () => {
        setIsDrawer(false);
        setIsEditMode(false);
        setEditItemId(null);
        form.resetFields();
    };

    const handleSubmit = () => {
        form.validateFields() // Ensures form is validated before submission
            .then(() => {
                const nameNatures = form.getFieldValue("name_natures");
                const description = form.getFieldValue("description");

                const formData = new FormData();
                formData.append("name_natures", nameNatures);
                formData.append("description", description);

                if (isEditMode && editItemId) {
                    // Update existing item
                    updateData(`/api/natures/${editItemId}`, formData)
                        .then((resp) => {
                            if (resp) {
                                message.success("Data successfully updated");
                                getDataGaleri(); // Refresh data
                                onCloseDrawer();
                            } else {
                                message.error("Failed to update data");
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            message.error("Failed to update data");
                        });
                } else {
                    // Add new item
                    sendData("/api/natures", formData)
                        .then((resp) => {
                            if (resp) {
                                message.success("Data successfully submitted");
                                getDataGaleri();
                                onCloseDrawer();
                            } else {
                                message.error("Failed to submit data");
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            message.error("Failed to submit data");
                        });
                }
            })
            .catch((errorInfo) => {
                console.log("Validation Failed:", errorInfo);
            });
    };

    const handleEdit = (item) => {
        setIsEditMode(true);
        setEditItemId(item.id);
        form.setFieldsValue({
            name_natures: item.name_natures,
            description: item.description,
        });
        setIsDrawer(true);
    };

    const renderDrawer = () => {
        return (
            <Drawer 
                title={isEditMode ? "Edit Galeri" : "Tambah Galeri"} 
                onClose={onCloseDrawer} 
                open={isDrawer}
                extra={
                    <Button htmlType="submit" type="primary" onClick={() => handleSubmit()}>
                        {isEditMode ? "Update" : "Submit"}
                    </Button>
                }
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="name_natures"
                        label="Name of Natures"
                        rules={[{ required: true, message: 'Please enter the name of the nature' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please enter a description' }]}
                    >
                        <Input.TextArea rows={3} />
                    </Form.Item>
                </Form>
            </Drawer>
        );
    };

    return (
        <Section
            topMd={200}
            topLg={150}
            topXl={110}
            bottomMd={200}
            bottomLg={150}
            bottomXl={110}
        >
            <div className="layout-content">
                {contextHolder}
                <Row gutter={[24, 0]}>
                    <Col xs={22} className="mb-24">
                        <Card bordered={false} className="criclebox h-full w-full">
                            <Title>Galeri BlackHex</Title>
                            <Text style={{ fontSize: "12pt" }}>Add content here</Text>
                            <Divider />
                            <Row gutter={[16, 16]} align="middle" style={{ marginBottom: 20 }}>
                                <Col flex="auto">
                                    <Input
                                        placeholder="Search by name or description..."
                                        style={{ width: '100%' }}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </Col>
                                <Col>
                                    <Button
                                        icon={isAscending ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
                                        onClick={toggleSortOrder}
                                    >
                                        Sort by ID
                                    </Button>
                                </Col>
                            </Row>
                            <FloatButton
                                shape="circle"
                                type="primary"
                                tooltip={<div>Add Galeri</div>}
                                icon={<PlusCircleOutlined />}
                                onClick={() => handleDrawer()}
                            />

                            {renderDrawer()}

                            {filteredData.length > 0 && !isLoading ? (
                                <List
                                    grid={{
                                        gutter: 16,
                                        column: 4,
                                        xs: 4,
                                        xl: 4,
                                        lg: 4,
                                    }}
                                    dataSource={filteredData}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <Card
                                                hoverable
                                                style={{ width: 300 }}
                                                cover={<img alt="example" src={item?.url_photo} />}
                                                actions={[
                                                    <EditOutlined key="edit" onClick={() => handleEdit(item)} />,
                                                    <DeleteOutlined key="delete" onClick={() => showDeleteConfirm(item.id)} />
                                                ]}
                                            >
                                                <Card.Meta 
                                                    title={item?.name_natures} 
                                                    description={<Text ellipsis>{item?.description}</Text>} 
                                                />
                                            </Card>
                                        </List.Item>
                                    )}
                                />
                            ) : isLoading ? (
                                <Skeleton active />
                            ) : (
                                "No Data"
                            )}
                        </Card>
                    </Col>
                </Row>
            </div>
        </Section> //tes
    );
};

export default Galeri;
