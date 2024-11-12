import React, { useEffect, useState } from "react";
import { Col, Row, Typography, Card, List, Skeleton, Divider, Input, Menu, Dropdown, Button, Modal, notification } from "antd";
import { SearchOutlined, DownOutlined, PlayCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { getData } from "../../utils/api";
import Section from "../Section";
import { ellipsGenerator } from "../../utils/ui";
import './PlaylistPage.css'; // Import the CSS file for additional styling

const { Title, Text } = Typography;

const PlaylistPage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [api, contextHolder] = notification.useNotification();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    getPlaylistData();
  }, []);

  const getPlaylistData = () => {
    setLoading(true);
    let url = "/api/playlist/12";
    getData(url)
      .then((resp) => {
        if (resp?.datas) {
          setData(resp.datas);
          setFilteredData(resp.datas);
        } else {
          showAlert("error", "Error", "Failed to fetch data");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        showAlert("error", "Error", "Failed to fetch data");
      });
  };

  const showAlert = (status, title, description) => {
    api[status]({
      message: title,
      description: description,
    });
  };

  const handleSearch = (value) => {
    setSearchText(value);
    applyFilters(value, selectedGenre);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    applyFilters(searchText, genre);
  };

  const applyFilters = (searchText, genre) => {
    const filtered = data.filter((item) => {
      const matchesGenre = genre === "All" || item.play_genre.toLowerCase() === genre.toLowerCase();
      const matchesSearchText =
        item.play_name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.play_genre.toLowerCase().includes(searchText.toLowerCase()) ||
        item.play_description.toLowerCase().includes(searchText.toLowerCase());
      return matchesGenre && matchesSearchText;
    });
    setFilteredData(filtered);
  };

  const showModal = (item) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedItem(null);
  };

  const genreMenu = (
    <Menu onClick={(e) => handleGenreChange(e.key)}>
      <Menu.Item key="All">All</Menu.Item>
      <Menu.Item key="Music">Music</Menu.Item>
      <Menu.Item key="Song">Song</Menu.Item>
      <Menu.Item key="Movie">Movie</Menu.Item>
      <Menu.Item key="Education">Education</Menu.Item>
      <Menu.Item key="Others">Others</Menu.Item>
    </Menu>
  );

  return (
    <Section topMd={100} topLg={80} topXl={60}>
      <div className="layout-content">
        {contextHolder}

        <Row gutter={[24, 0]}>
          <Col xs={24} lg={24} className="mb-24">
            <Card bordered={false} className="criclebox h-full w-full">
              <Title>Playlist</Title>
              <Divider />

              <Row gutter={[24, 0]} align="middle" style={{ marginBottom: 16 }}>
                <Col flex="auto">
                  <Input
                    placeholder="Search here..."
                    prefix={<SearchOutlined />}
                    className="header-search"
                    allowClear
                    size="large"
                    value={searchText}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </Col>
                <Col>
                  <Dropdown overlay={genreMenu} trigger={['click']}>
                    <Button size="large">
                      {selectedGenre} <DownOutlined />
                    </Button>
                  </Dropdown>
                </Col>
              </Row>

              {isLoading ? (
                <Skeleton active />
              ) : filteredData.length > 0 ? (
                <List
                  grid={{ gutter: 24, xs: 1, sm: 1, md: 2, lg: 3, xl: 3 }}
                  dataSource={filteredData}
                  renderItem={(item) => (
                    <List.Item>
                      <div className="hover-card"> {/* Wrap in a div for hover effect */}
                        <Card
                          hoverable
                          cover={
                            <div className="card-image-container">
                              <img
                                alt={item.play_name}
                                src={item.play_thumbnail}
                                className="card-image"
                              />
                              <div className="overlay-icon">
                                <PlayCircleOutlined className="play-icon" />
                              </div>
                            </div>
                          }
                          onClick={() => showModal(item)}
                        >
                          <Card.Meta
                            title={<Text>{item.play_name}</Text>}
                            description={
                              <Text ellipsis={ellipsGenerator(item.play_description)}>
                                {item.play_description}
                              </Text>
                            }
                          />
                        </Card>
                      </div>
                    </List.Item>
                  )}
                />
              ) : (
                "No data available"
              )}
            </Card>
          </Col>
        </Row>

        {selectedItem && (
          <Modal
            visible={isModalVisible}
            onCancel={handleCloseModal}
            footer={null}
            centered
            width={800}
            closeIcon={
              <CloseOutlined
                style={{
                  fontSize: '20px',
                  color: 'white',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black background
                  borderRadius: '50%',
                  padding: '5px',
                }}
              />
            } // Custom close icon style
          >
            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src={selectedItem.play_thumbnail}
                alt={selectedItem.play_name}
                style={{ width: "100%", height: "auto" }}
                onClick={() => window.open(selectedItem.play_url, "_blank")}
              />
              <div
                style={{
                  position: "absolute",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                }}
                onClick={() => window.open(selectedItem.play_url, "_blank")}
              >
                <PlayCircleOutlined
                  style={{
                    fontSize: "72px",
                    color: "rgba(255, 255, 255, 0.9)",
                    marginBottom: "8px",
                  }}
                />
                <div
                  style={{
                    fontSize: "16px",
                    color: "rgba(255, 255, 255, 0.9)",
                  }}
                >
                  Watch Now
                </div>
              </div>
            </div>
            <Title level={3} style={{ marginTop: 16, textAlign: "center" }}>
              {selectedItem.play_name}
            </Title>
            <Text style={{ textAlign: "center", display: "block" }}>{selectedItem.play_description}</Text>
          </Modal>
        )}
      </div>
    </Section>
  );
};

export default PlaylistPage;
