import React, { useEffect, useState, useRef } from "react";
import { Col, Row, Typography, Card, List, Skeleton, Input, Menu, Dropdown, Button, Modal, notification } from "antd";
import { SearchOutlined, DownOutlined, CloseOutlined } from "@ant-design/icons";
import { getData } from "../../utils/api";
import Section from "../Section";
import BannerSectionStyle3 from "../Section/BannerSection/BannerSectionStyle3";
import ReactPlayer from "react-player/youtube";
import './PlaylistPage.css';

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
  const videoRef = useRef(null);

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

  const handlePlay = () => {
    if (videoRef.current) {
      const playerElement = videoRef.current.getInternalPlayer();
      if (playerElement && playerElement.requestFullscreen) {
        playerElement.requestFullscreen();
      } else if (videoRef.current.wrapper && videoRef.current.wrapper.requestFullscreen) {
        videoRef.current.wrapper.requestFullscreen();
      }
    }
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
    <Section topMd={0} topLg={0} topXl={0}>
      <div className="layout-content">
        {contextHolder}
        <BannerSectionStyle3
          bgUrl="/images/playlist/banner_bg.svg"
          title="Welcome to <br>PlayList Video"
          subTitle="Pelajari cara mencegah dan mengatasi stunting untuk masa depan anak-anak yang lebih baik."
        />

        <Row gutter={[24, 0]} style={{ marginTop: "20px" }}>
          <Col xs={24} lg={24} className="mb-24">
            <Card bordered={false} className="criclebox h-full w-full">
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
                      <div className="hover-card">
                        <Card
                          hoverable
                          cover={
                            <div className="card-image-container">
                              <img
                                alt={item.play_name}
                                src={item.play_thumbnail}
                                className="card-image"
                              />
                            </div>
                          }
                          onClick={() => showModal(item)}
                        >
                          <Card.Meta
                            title={<Text>{item.play_name}</Text>}
                            description={<Text className="card-description">{item.play_description}</Text>}
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
            width={900}
            closeIcon={
              <CloseOutlined
                style={{
                  fontSize: '20px',
                  color: 'white',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  borderRadius: '50%',
                  padding: '5px',
                }}
              />
            }
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ReactPlayer
                ref={videoRef}
                url={selectedItem.play_url}
                controls
                width="100%"
                height="500px"
                style={{ maxHeight: '500px', maxWidth: '100%' }}
                onPlay={handlePlay}
              />
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
